const express = require("express")
const router = express.Router()

// Item Model
const Quotation = require("../../models/Quotation")


// @ route GET api/quotations
// @desc Get All quotations
// @access Public
router.get("/", (req, res) => {
    Quotation.find()
        .sort({date: -1})
        .then(quotation => {
            res.json(quotation)
        })
})

// @ route POST api/quotations
// @post a quotation to Database
// @access Public


    router.post("/", (req, res) => {
        const newQuotation = new Quotation({
            quotation : req.body.quotation,
            author : req.body.author
        }) 
        newQuotation.save().then(quotation => res.json(quotation))
            .catch(err => {console.log(err)})
        })

// @ route DELETE api/questions
// @delete a question from Database
// @access Public
router.delete("/:id", (req, res) => {
    Quotation.findById(req.params.id)
        .then(quotation => {
            quotation.remove()
        }).then(()=> res.json({success : true}))
            .catch(err => res.status(404).json({ success : false}))
})

module.exports = router