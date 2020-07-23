const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Question = require("./Question")

//Create Schema

const AnswerSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    questionAnswer: {
        type: String,
        required: true,
    },
    date: {
        type:Date,
        default: Date.now
    }
})

module.exports = Answer = mongoose.model("answer", AnswerSchema)
