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
}

const WIKI_FORMAT = `
# {{ bill_title }}

{{ bill_text }}

***

{{ opening_speech }}`

router.post('/bill/submit', (req, res) => {
    console.log(req.body)
    const id = req.body['bill-num']
    const title = req.body['bill-title']
    const stage = req.body['bill-stage']
    const amendments = req.body['amendment-text'] ?? false
    const text = req.body['bill-text']
    const opening_speech = req.body['opening-speech']
    const closing_date = req.body['closing-date']
    const posting_disabled = req.body['disable-post']

    if (stage === STAGES['first_reading'].key) {
        database.query('INSERT INTO bills VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id, title, stage, text, opening_speech, null, null, true],
        (err, results) => {
            if (err)
                return res.render('error', { error: err })
            if (posting_disabled)
                return res.redirect('/')

            const r = new snoowrap({
                userAgent: CREDENTIALS.REDDIT.userAgent,
                accessToken: req.user.token
            })

            r.getSubreddit('lilyirl').getWikiPage(`bills/term_1/${id}/1st_reading`).edit({ text: formatText(WIKI_FORMAT, { bill_title: title, bill_text: text, opening_speech: opening_speech }) })
        })
    }
})

module.exports = router
