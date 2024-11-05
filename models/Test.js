const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    test: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Test', TestSchema)