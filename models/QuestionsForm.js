const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Anwser = require("./Answer")

//Create Schema
const QuestionsFormSchema = new Schema({
    answer1: {
        type:Anwser,
        required : true
    },
    answer2: {
        type:Anwser,
        required : true
    },
    answer3: {
        type:Anwser,
        required : true
    },
    answer4: {
        type:Anwser,
        required : true
    },
    answer5: {
        type:Anwser,
        required : true
    },
    date: {
        type:Date,
        default: Date.now
    } 
})

module.exports = QuestionsForm = mongoose.model("questionsForm", QuestionsFormSchema)
