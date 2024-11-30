const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    fistName: {
        type: String,
        required: true

    },

    secondName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }


})

module.exports = mongoose.models.Form || mongoose.model('Form', formSchema);