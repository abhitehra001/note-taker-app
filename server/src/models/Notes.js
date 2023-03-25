const mongoose = require("mongoose");

const Notes = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    onTime: {
        type: String,
        trim: true,
        required: true
    },
    userId: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model("Notes", Notes);