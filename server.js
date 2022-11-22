const express = require("express")
const app = express()
const SERVER_PORT = 8080

app.use(express.json())
app.use(express.urlencoded())


const userModel = require("./models/users")
const empModel = require("./models/employee")


const userRoutes = require('./routes/userRoutes')
const employeeRoutes = require('./routes/empRoutes')


const mongoose = require("mongoose")

const DB_URL = "mongodb+srv://maoe1:jpgs6cnFQRW8MXkN@cluster0.mtvhcjr.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"
mongoose.connect(DB_URL,
 {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });





// routing for db 
app.use("/api/user", userRoutes)
app.use("/api/emp", employeeRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>COMP3123 - Assignment 1</h1>")
    })

app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})