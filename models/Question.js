const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//Create Schema

const QuestionSchema = new Schema({
    userId: {
        type:String,
        required:true,
    },
    wording: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Question = mongoose.model("question", QuestionSchema)
  