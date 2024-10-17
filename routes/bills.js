const express = require('express')
const router = express.Router()
const axios = require('axios')
const database = require('../database')

const STAGES = require('../models/bill_stages')

router.get('/', (req, res) => {
    database.query('SELECT id, title, stage, last_is_submitted FROM bills', [], (err, results) => {
        if (err) return res.render('error', { error: err })

        const bills = []

        for (let result of results) {
            bills.push({
                id: result.id,
                title: result.title,
                stage_name: STAGES[result.stage].title,
                submitted: result.last_is_submitted
            })
        }

        return res.render('bills', { bills: bills })
    })
})

router.get('/new', (req, res) => {
    return res.render('1st_reading', { stage: STAGES['first_reading'] })
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    if (!id)
        return res.render('error', { error: 'Missing a bill ID (like B001)' })

    database.query('SELECT * FROM bills WHERE id = ?', [id], (err, results) => {
        if (err)
            return res.render('error', { error: 'A database error occurred. Please contact an admin for assistance or try again later.' })

        if (!results || results.length === 0)
            return res.render('error', { error: 'There were no bills found with the id ' + id })

        const bill = results[0]
        bill.last_is_submitted = bill.last_is_submitted === 1 // required for html attribute to render properly
        const stage = STAGES[bill.stage]
        const progress = []
        let closingDate = new Date()

        closingDate.setUTCDate(closingDate.getUTCDate() + 5)

        if (!stage.final) {
            for (let option of [...stage.options, 'withdrawn'])
                progress.push(STAGES[option])
        }

        return res.render('bill_stage', { bill: bill, stage: stage, progress: progress, closing_date: closingDate.toLocaleDateString('en-gb', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) })
    })
})

module.exports = router
