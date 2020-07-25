const express = require("express")
const router = express.Router()

// Item Model
const Question = require("../../models/Question")
const Answer = require("../../models/Answer")

// @ route GET api/answer
// @desc Get All answer
// @access Public
router.get("/", (req, res) => {
    Answer.find()
        .sort({date: -1})
        .then(answer => {
            res.json(answer)
        })
})


    router.post("/", (req, res) => {
        Question.findById(req.body.idQ).
            then(question => {
                console.log(question)
                return newAnswer = new Answer({
                    question: JSON.stringify(question),
                    questionAnswer: req.body.questionAnswer
                })
            }).then((newAnswer) =>  newAnswer.save())
            .then((newAnswer) => res.json(newAnswer))
            .catch(err => {console.log(err)})
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