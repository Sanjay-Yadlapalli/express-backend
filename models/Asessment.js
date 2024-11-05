const mongoose = require('mongoose')

const Assessmentschema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    assessments: [String]
})

module.exports = mongoose.model('Assessment', Assessmentschema)