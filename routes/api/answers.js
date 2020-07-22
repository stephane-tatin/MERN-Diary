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

// @ route POST api/answer
// @post an answer to Database
// @access Public
router.post("/", (req, res) => {
    Question.findById(req.body.idQ).
        then(question => {
            return newAnswer = new Answer({
                question: question.wording,
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