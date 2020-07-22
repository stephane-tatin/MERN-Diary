const express = require("express")
const router = express.Router()

// Item Model
const Question = require("../../models/Question")

// @ route GET api/questions
// @desc Get All questions
// @access Public
router.get("/", (req, res) => {
    Question.find()
        .sort({date: -1})
        .then(questions => {
            res.json(questions)
        })
})

// @ route POST api/questions
// @post a question to Database
// @access Public
router.post("/", (req, res) => {
    const newQuestion = new Question({
        id: req.body.id,
        wording: req.body.wording
    })

    newQuestion.save()
        .then((question) => res.json(question))
})

// @ route DELETE api/questions
// @delete a question from Database
// @access Public
router.delete("/:id", (req, res) => {
    Question.findById(req.params.id)
        .then(question => {
            question.remove()
        }).then(()=> res.json({success : true}))
            .catch(err => res.status(404).json({ success : false}))
})

module.exports = router