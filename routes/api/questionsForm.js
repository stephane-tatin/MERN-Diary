const express = require("express")
const router = express.Router()

// Item Model
const QuestionsForm = require("../../models/QuestionsForm")

// @ route GET api/questions
// @desc Get All questions
// @access Public
router.get("/", (req, res) => {
    QuestionsForm.find({userId: req.header("userId")})
        .sort({date: -1})
        .then(questionsForms => {
            res.json(questionsForms)
        })
})

// @ route POST api/questions
// @post a question to Database
// @access Public
router.post("/", (req, res) => {

    if (!req.body.answer1 || !req.body.answer2 || !req.body.answer3 || !req.body.answer4 || !req.body.answer5 ) {
        return res.status(400).json({
            msg : "please fill all the fields"
        })
    }

    const newQuestionsForm = new QuestionsForm({
        question1: req.body.question1,
        answer1 : req.body.answer1,
        question2: req.body.question2,
        answer2 : req.body.answer2,
        question3: req.body.question3,
        answer3 : req.body.answer3,
        question4: req.body.question4,
        answer4 : req.body.answer4,
        question5: req.body.question5,
        answer5 : req.body.answer5,
        userId : req.body.userId


    })

    newQuestionsForm.save()
        .then((questionForm) => res.json(questionForm))
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