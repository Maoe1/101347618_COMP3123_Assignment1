const express = require('express')
const UserModel = require("../models/users")
const helper = require('../helpers/helper.js')


const routes = express.Router()

//http://localhost:8080/api/user/signup
routes.post("/signup", async (req, res) => {
   helper.checkForEmptyContent(req.body, res)
  try {
    const newUser = new UserModel(req.body)
    const user = await newUser.save()
    res.status(201).send(user)
  }
  catch (error) {
    res.status(400).send(error)
  }
})

routes.post("/login", async (req, res) => {
    helper.checkForEmptyContent(req.body,)
    try {
      const user_name = await UserModel.findOne({ username: req.body.username, password: req.body.password }).exec()
      const email = await UserModel.findOne({ email: req.body.email, password: req.body.password }).exec()
      if (user_name != null) {
        res.status(200).send({
          status: true,
          username: req.body.username,
          message: "User logged in successfully"
        })
      }
      else if (email != null) {
        res.status(200).send({
          status: true,
          email: req.body.email,
          message: "User logged in successfully"
        })
      }
      else {
        // invalid user name and email
        res.status(400).send({
          status: false,
          message: "Such username/email and password does not exist"
        })
      }
    }
    catch (error) {
      res.status(400).send(error)
    }
  })
module.exports = routes