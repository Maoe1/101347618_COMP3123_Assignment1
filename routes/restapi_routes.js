const express = require("express")
const user = require('../models/user.model')
const emp = require('../models/emp.model')
const path = require('path');


const routes = express.Router()



routes.post('/user/signup', async (req, res) => {
   
    await user.addUser(req.body)
    .then(user => res.status(201).json({
        message: `The user: ${user.user_name} has been created`,
        content: user
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

routes.post('/login', async(req,res) => {
  await user.login(req.body, res)
});


routes.get("/emp/employees", async(req, res) => {
   await emp.getEmployees().then(emp => res.status(201).json({
    message: `employees list `,
    content: user
}))
.catch(err => res.status(500).json({ message: err.message }))
});

routes.post('/emp/employees', async(req, res) => {
    await emp.addEmployee(req.body).then(emp => res.status(201).json({
        message: `The employee: ${emp.first_name} has been added`,
        content: emp
 }))
 .catch(err => res.status(500).json({ message: err.message }))
 });

routes.get('/emp/employees/:eid', async(req, res) => {
    
   await emp.getEmployee(req.params.eid).then(emp => res.status(200).json({
        message: `The employee: ${emp.first_name} has been found`,
        content: emp
    }))
 });

 routes.put('/emp/employees/:eid', async (req, res) => {
    const id = req.params.eid
    await emp.updateEmployee(id, req.body)
    .then(emp => res.json({
        message: `The Employee: # has been updated`,
        content: emp
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
    })
})


 routes.delete('/emp/employees?:eid', async(req, res) => {
    await emp.deleteEmployee(req.query.eid).then(emp => res.status(204).json({
         message: `Employee has been deleted`,

     }))
  });

module.exports = routes