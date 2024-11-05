const express = require('express')
const router = express.Router()
const Company = require('../models/Template')


router.post('/addCompany', async (req, res) => {
    const { company } = await req.body
    const companyCheck = await Company.findOne({ company })
    try {
        if (companyCheck === null) {
            const addingCompany = new Company({
                company: company
            })
            const newCompany = await addingCompany.save()
            res.status(200).send({ 'message': 'Company Added Successfully', id: newCompany.id, companyName: newCompany.company })
        } else {
            res.status(400).send({ 'message': 'Company Already there..!' })
        }
    }
    catch (e) {
        res.status(400).send({ 'message': e.message })
    }
})

router.get('/getCompanies', async (req, res) => {
    try {
        const companies = await Company.find()
        res.status(200).send(companies)
    } catch (e) {
        res.status(401).send({ 'message': e.message })
    }
})



module.exports = router