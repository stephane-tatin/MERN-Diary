const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const auth = require("../../middleware/auth")
// Item Model

const User = require("../../models/User")

// @ route GET api/auth/user
// @desc Get user data
// @Private
router.get("/user",auth, (req, res) => {
    User.findById(req.user.id)
       .select("-password")
    .then((user) => {
        res.json(user)
    })
})

// @ route POST api/auth
// @Authenticated user
// @access Public


router.post("/", (req, res) => {
    const {
        email,
        password
    } = req.body

    if (!email || !password) {
        return res.status(400).json({
            msg: "Please fill all the fields"
        })
    }

    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    msg: "User does not exist"
                })
            }
            
             //Validate password 
        bcrypt.compare(password, user.password)
        .then(isMatched => {
            if(!isMatched) return res.status(400).json({ msg: "invalid credentials"})
        
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
            })

        })

       
        })

       })


// @ route DELETE api/questions
// @delete a question from Database
// @access Public
router.delete("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.remove()
        }).then(() => res.json({
            success: true
        }))
        .catch(err => res.status(404).json({
            success: false
        }))
})

module.exports = router