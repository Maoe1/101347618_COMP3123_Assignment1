const express = require('express')
const employeeModel = require("../models/employee")
const helper = require('../helpers/helper.js')


const routes = express.Router()

routes.get("/employees", async (req, res) => {
  try {
    const employee = await employeeModel.find()
    res.status(200).send(employee)
  }
  catch (error) {
    res.status(400).send({ message: "No employees exist in database!" })
  }
})


routes.post("/employees", async (req, res) => {
  
  helper.checkForEmptyContent(req.body, res);
  try {
    const newEmployee = new employeeModel(req.body)
    const employee = await newEmployee.save()
    res.status(201).send(employee)
  }
  catch (error) {
    res.status(400).send(error)
  }
})

routes.get("/employees/:eid", async (req, res) => {
  try {
    const employee = await employeeModel.findById(req.params.eid)

    if (!employee) {
      res.status(404).send({ message: "employee id not found in database!" })
    }
    else {
      res.status(200).send(employee)
    }
  }
  catch (error) {
    res.status(400).send(error)
  }
})

routes.put("/employees/:eid", async (req, res) => {
 helper.checkForEmptyContent(req.body);
  try {
    const updatedEmp = await employeeModel.findByIdAndUpdate(req.params.eid, req.body)
    if (!updatedEmp) {
      res.status(400).send({ message: "employee id not found in database!" })
    }
    else {
      const newEmp = await updatedEmp.save()
      res.status(200).send(newEmp)
    }
  }
  catch (error) {
    res.status(401).send(error)
  }
});

routes.delete("/employees?:eid", async (req, res) => {
  try {
    const selectedEmp = await employeeModel.findByIdAndDelete(req.query.eid)
    if (!selectedEmp) {
      res.status(400).send({ message: "employee id not found in database!" })
    }
    else {
      
      res.status(204).send(selectedEmp)
    }
  }
  catch (error) {
    res.status(401).send(error)
  }
})

module.exports = routes