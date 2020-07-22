const express = require("express")
const router = express.Router()

// Item Model
const QuestionsForm = require("../../models/QuestionsForm")

// @ route GET api/questions
// @desc Get All questions
// @access Public
router.get("/", (req, res) => {
    QuestionsForm.find()
        .sort({date: -1})
        .then(questionsForms => {
            res.json(questionsForms)
        })
})

// @ route POST api/questions
// @post a question to Database
// @access Public
router.post("/", (req, res) => {
    const newQuestionsForm = new QuestionsForm({
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