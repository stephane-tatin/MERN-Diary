const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Anwser = require("./Answer")
const Question = require("./Question")

//Create Schema
const QuestionsFormSchema = new Schema({
    
    question1 :{
        type: String,
        required : true
    },
    answer1: {
        type:String,
        required : true
    },
    question2 :{
        type: String,
        required : true
    },
    answer2: {
        type:String,
        required : true
    },
    question3 :{
        type: String,
        required : true
    },
    answer3: {
        type:String,
        required : true
    },
    question4 :{
        type: String,
        required : true
    },
    answer4: {
        type:String,
        required : true
    },
    question5 :{
        type: String,
        required : true
    },
    answer5: {
        type:String,
        required : true
    },
    date: {
        type:Date,
        default: Date.now
    } 
})

module.exports = QuestionsForm = mongoose.model("questionsForm", QuestionsFormSchema)
