const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//Create Schema

const QuotationSchema = new Schema({
    quotation: {
        type: String,
        required: true,
    },
    author : {
        type : String,
        required: true
    },
    date: {
        type:Date,
        default: Date.now
    }
})

module.exports = Quotation = mongoose.model("quotation", QuotationSchema)
