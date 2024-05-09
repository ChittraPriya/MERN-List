const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser') 
const app = express();
const fs = require('fs')

//database connection

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Database Connected'))
.catch(() => console.log('Database not Connected',err))

//middleware

app.use(express.json());
app.use(
    cors({ 
    origin: "http://localhost:5173",
    methods: ["GET","POST","PATCH","DELETE"],
}))
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use('/',require('./routes/authRoutes'))

app.get("users", (req,res) => {
    return res.json(users);
})

app.delete("/users/:id",(req,res) => {
    let id = Number(req.params.id);
    let filteredUsers = users.filter((user) => user.id !== id);
    fs.writeFile("./sample.json",JSON.stringify (filteredUsers), (err,data) => {
        return res.json(filteredUsers)
    })
})
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))