const express = require("express")
const mongoose = require("mongoose")

const questions = require("./routes/api/questions")
const answers = require("./routes/api/answers")
const questionsForm = require("./routes/api/questionsForm")
const users = require("./routes/api/users")
const auth = require("./routes/api/auth") 
const path = require ("path")

const config = require ("config")


const app = express();
app.use(express.json())

//DB Config
const DB = config.get("mongoURI")

// const DB = require("./config/key").mongoURI

//Connect to Mongoo
const DBOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.set('useCreateIndex', true);

mongoose.connect(DB, DBOptions)
    .then(()=> {
        console.log("MongoDB connected")
    }).catch(err=> console.log(err))

//Use Routes
app.use("/api/questions", questions)
app.use("/api/answers", answers)
app.use("/api/questionsForms", questionsForm)
app.use("/api/users", users)
app.use("/api/auth", auth)

// Serve static assets if production
if(process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))

