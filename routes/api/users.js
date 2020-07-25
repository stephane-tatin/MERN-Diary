const express = require("express")
const router = express.Router()

// Item Model

const User = require("../../models/User")

// @ route GET api/users
// @desc Get All users
// @access Public
router.get("/", (req, res) => {
    console.log("get request")
    User.find()
        .sort({date: -1})
        .then(answer => {
            res.json(answer)
        })
})

// @ route POST api/user
// @post an answer to Database
// @access Public


    router.post("/", (req, res) => {
        console.log("post request")
        const {name, email, password } = req.body
      const newUser = new User({
          name,
          email,
          password
      })
      newUser.save()
      
        })

// @ route DELETE api/questions
// @delete a question from Database
// @access Public
router.delete("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.remove()
        }).then(()=> res.json({success : true}))
            .catch(err => res.status(404).json({ success : false}))
})

module.exports = router