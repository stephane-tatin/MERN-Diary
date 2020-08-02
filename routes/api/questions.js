const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")
// Question Model
const Question = require("../../models/Question")

// @ route GET api/questions/all
// @desc Get All questions from the DB (standard + all private)
// @access Private
router.get("/all",auth, (req, res) => {
    Question.find()
        .sort({date: -1})
        .then(questions => {
            res.json(questions)
        })
})

// @ route GET api/questions
// @desc Get All questions (standard + private)
// @access Private
router.get("/",auth, (req, res) => {
    Question.find(
        {$or:[{userId: req.header("userId")},{userId:"genericQuestion"}]}        
    )
        .sort({date: -1})
        .then(questions => {
            res.json(questions)
        })
})

// @ route POST api/questions
// @post a private question to Database
// @access Private
router.post("/",auth, (req, res) => {
  
    const newQuestion = new Question({
        userId: req.body.userId,
        wording: req.body.wording
    })

    newQuestion.save()
        .then((question) => res.json(question))
})

// @ route POST api/questions/generic
// @post a generic question to Database
// @access Private only through Postman
router.post("/generic", (req, res) => {


    const newQuestion = new Question({
        userId: "genericQuestion",
        wording: req.body.wording
    })

    newQuestion.save()
        .then((question) => res.json(question))
})

// @ route DELETE api/questions
// @delete a question from Database
// @access Private
router.delete("/:id", auth, (req, res) => {
    Question.findById(req.params.id)
        .then(question => {
            question.remove()
        }).then(()=> res.json({success : true}))
            .catch(err => res.status(404).json({ success : false}))
})

module.exports = router