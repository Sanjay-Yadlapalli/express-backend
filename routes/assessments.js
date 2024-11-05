const express = require('express')
const router = express.Router()
const Assessment = require('../models/Asessment')

router.get('/getAssessments', async (req, res) => {
    try {
        const assessments = await Assessment.find()
        res.status(200).send(assessments)
    } catch (e) {
        res.statusMessage(401).send({ 'message': e.message })
    }
})

router.get('/getAssessment', async (req, res) => {
    const { company } = await req.query
    const companyAssessment = await Assessment.findOne({ company })
    try {
        if (companyAssessment !== null) {
            res.status(200).send(companyAssessment)
        } else {
            res.status(401).send({ 'message': 'Company no there' })
        }
    } catch (e) {
        res.status(401).send({ 'message': e.message })
    }
})

router.post('/addAssessment', async (req, res) => {
    const { company, assessments } = await req.body
    const AssessmentDb = await Assessment.findOne({ company })
    try {
        if (AssessmentDb === null) {
            const addingAssessment = await Assessment({
                company: company,
                assessments: assessments
            })
            const newAssessment = await addingAssessment.save()
            res.status(200).send(newAssessment.id)
        } else {
            res.status(401).send({ 'message': 'Assessment Already there..!' })
        }
    } catch (e) {
        res.status(401).send({ 'message': e.mesage })
    }
})

module.exports = router