const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
// Item Model

const User = require("../../models/User")

// @ route GET api/users
// @desc Get All users
// @access Public
router.get("/", (req, res) => {
    User.find()
        .sort({
            date: -1
        })
        .then(answer => {
            res.json(answer)
        })
})

// @ route POST api/users
// @post an answer to Database
// @access Public


router.post("/", (req, res) => {
    const {
        name,
        email,
        password
    } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
            msg: "Please fill all the fields"
        })
    }

    User.findOne({
            email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    msg: "User already exists"
                })
            }
        })

    const newUser = new User({
        name,
        email,
        password
    })

    //Create salt
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash
            newUser.save()
                .then(user =>

                    jwt.sign({
                            id: user.id
                        }, config.get("jwtSecret"), {
                            expiresIn: 3600
                        },
                        (err, token) => {
                            if (err) throw err
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }),

                )
                .catch(err => console.log(err))
        })
    })
})

module.exports = router