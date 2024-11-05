const express = require('express')
const router = express.Router()
const Test = require('../models/Test')


router.get('/', async (req, res) => {
    try {
        const tests = await Test.find()
        res.status(200).send(tests)
    } catch (e) {
        res.statusMessage(401).send({ 'message': e.message })
    }
})
router.post('/addTest', async (req, res) => {
    const { test } = await req.body
    const isThere = await Test.findOne({ test })
    try {
        if (isThere === null) {
            const newTest = await Test({
                test: req.body.test
            })
            const addedTest = await newTest.save()
            res.status(200).send(addedTest.id)
        } else {
            res.status(201).send('Already There')
        }

    } catch (e) {
        res.statusMessage(401).send({ 'message': e.message })
    }
})

module.exports = router