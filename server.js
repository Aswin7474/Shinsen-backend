const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const cors = require("cors")


app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({"reply": ["1", "2", "3"]})
})

users = {}

app.post("/register", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        if (!users.hasOwnProperty(req.body.username)) {
            users[req.body.username] = {id: Date.now.toString, password: hashedPassword}
        }
        res.status(200).json({message: "successful"})
        console.log(users)
        console.log("----------------------------------------------------------------------")
    }
    catch {
        res.status(500).json({message: "an error occured"})
    }
})

app.get("login", async (req, res) => {
    try {
        if (users.hasOwnProperty(req.body.username)) {
            console.log("Successfully logged in")
            res.status(200).json({message: "successfully logged in"})
        }
        else {
            console.log("User not found")
            res.status(201).json({message: "user not found"})
        }
    }
    catch {
        res.status(400).json({message: "Something went wrong"})
        console.error("Something Went wrong")
    }
})


app.get("/register", (req, res) => {
    res.json({"reply": ["1", "2", "3"]})
})


app.listen(5000, () => {console.log("Server is connected in port 5000")})
