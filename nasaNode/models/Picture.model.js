const mongoose = require("mongoose");

const pictureSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    explanation: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model("Picture", pictureSchema);