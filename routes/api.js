const express = require('express')
const router = express.Router()
const axios = require('axios')
const snoowrap = require('snoowrap')
const database = require('../database')
const CREDENTIALS = require('../credentials.json')

const STAGES = require('../models/bill_stages')

function renderText(format, template) {
    const templateValues = ['bill_title', 'bill_text', 'closing_date', 'timezone', 'amendment_text', 'opening_speech']
    
    let progress = format
    
    for (let placeholder of templateValues) {
        const target = template[placeholder]

        if (!target) {
            progress = progress.replace(`{{ ${placeholder} }}`, '')
            continue
        }

        progress = progress.replace(`{{ ${placeholder} }}`, target ?? '')
    }

    return progress
}

const WIKI_POST_FORMAT = `
# {{ bill_title }}

{{ bill_text }}

***

{{ opening_speech }}`

const WIKI_INDEX_FORMAT = `
* 1st Reading (as introduced)
* 2nd Reading
* Committee
* Amendment Reading
* 3rd Reading`

router.post('/bill/submit', (req, res) => {
    const id = req.body['bill-num']
    const title = req.body['bill-title']
    const stage = STAGES[req.body['bill-stage']]
    const amendments = req.body['amendment-text'] ?? false
    const text = req.body['bill-text']
    const opening_speech = req.body['opening-speech']
    const closing_date = req.body['closing-date']
    const posting_disabled = req.body['disable-post']

    const wiki_post_at = ['first_reading', 'second_reading', 'committee', 'amendment_reading', 'third_reading']

    if (stage.key === STAGES['first_reading'].key) {
        database.query('INSERT INTO bills (id, title, stage, text, opening_speech, last_is_submitted) VALUES (?, ?, ?, ?, ?, ?)',
        [id, title, stage.key, text, opening_speech, true],
        (err, results) => {
            if (err)
                return res.render('error', { error: err })
            if (posting_disabled)
                return res.redirect('/bills')

            const r = new snoowrap({
                userAgent: CREDENTIALS.REDDIT.userAgent,
                accessToken: req.user.token
            })

            Promise.all([
                r.getSubreddit('lilyirl').getWikiPage(`bills/term_${CREDENTIALS.TERM}/${id}`).edit({ text: WIKI_INDEX_FORMAT.replace('1st Reading', `[1st Reading](https://reddit.com/r/lilyirl/wiki/bills/term_${CREDENTIALS.TERM}/${id}/first_reading)`) }),
                r.getSubreddit('lilyirl').getWikiPage(`bills/term_${CREDENTIALS.TERM}/${id}/first_reading`).edit({ text: renderText(WIKI_POST_FORMAT, { bill_title: title, bill_text: text, opening_speech: opening_speech }) })
            ]).then(success => {
                return res.redirect('/bills')
            }).catch(error => {
                return res.render('error', { error: error })
            })
        })
    } else {
        let queryString, placeholders

        if (amendments) {
            queryString = 'UPDATE bills SET title = ?, text = ?, opening_speech = ?, closing_date = ?, amendment_text = ?, last_is_submitted = ? WHERE id = ?'
            placeholders = [title, text, opening_speech, closing_date, amendments, true, id]
        } else {
            queryString = 'UPDATE bills SET title = ?, text = ?, opening_speech = ?, closing_date = ?, last_is_submitted = ? WHERE id = ?'
            placeholders = [title, text, opening_speech, closing_date, true, id]
        }

        database.query(queryString, placeholders, (err, results) => {
            if (err)
                return res.render('error', { error: err })
            if (posting_disabled || !stage.post_to)
                return res.redirect('/bills')

            const r = new snoowrap({
                userAgent: CREDENTIALS.REDDIT.userAgent,
                accessToken: req.user.token
            })

            const post_title = `${id} - ${title} - ${stage.title}`
            const post_body = renderText(stage.format, { bill_title: title, bill_text: text, closing_date: closing_date, timezone: 'BST', amendment_text: amendments, opening_speech: opening_speech })

            r.getSubreddit(stage.post_to).submitSelfpost({ title: post_title, text: post_body })

            if (wiki_post_at.includes(stage.key)) {
                r.getSubreddit('lilyirl').getWikiPage(`bills/term_${CREDENTIALS.TERM}/${id}`).edit({ text: WIKI_INDEX_FORMAT.replace(stage.title, `[${stage.title}](https://reddit.com/r/lilyirl/wiki/bills/term_${CREDENTIALS.TERM}/${id}/${stage.key})`) }),
                r.getSubreddit('lilyirl').getWikiPage(`bills/term_${CREDENTIALS.TERM}/${id}/${stage.key}`).edit({ text: renderText(WIKI_POST_FORMAT, { bill_title: title, bill_text: text, opening_speech: opening_speech }) })
            }

            if (stage.final) {
                database.query('DELETE FROM bills WHERE id = ?', [id], (error, success) => {
                    if (error) return res.render('error', { error: error })
                    return res.redirect('/bills')
                })
            } else {
                return res.redirect('/bills')
            }
        })
    }
})

router.post('/bill/progress', (req, res) => {
    const id = req.body['bill-num']
    const stage = req.body['next-stage']

    database.query('UPDATE bills SET stage = ?, last_is_submitted = FALSE where id = ?', [stage, id], (err, results) => {
        if (err) return res.render('error', { error: err })
        return res.redirect('/bills')
    })
})

module.exports = router
