const mongoose = require('mongoose')

const Companyschema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Company', Companyschema)