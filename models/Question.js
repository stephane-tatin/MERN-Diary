const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//Create Schema

const QuestionSchema = new Schema({
    id:{
        type:Number,
        required: true
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
  