const filename = 'C://Users//mfles//OneDrive//Documents//FullStack//101347618_COMP3123_Assignment1//data//employees.json'
let employees = require(filename)

const helper = require('../helpers/helper.js')
const fs = require("fs")


function getEmployees(){
    return new Promise((resolve, reject) => {
        if (employees.length === 0) {
            reject({
                message: 'no employyes available',
                status: 201
            })
        }
        resolve(employees)
    })
    /*
    fs.readFile(filename,
        {encoding:'utf8', flag:'r'},
        function(err, data) {
    if(err)
        console.log(err);
    else
        console.log(data);
});
*/
}


function addEmployee(newEmp) {
    return new Promise((resolve, reject) => {
       
    
        const id = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16); 
        
        var __FOUND = -1;
        for(var i=0; i<employees.length; i++) {
            if(employees[i].email == newEmp.email.replace(/\s/g, "")) {
                // __FOUND is set to the index of the element
                __FOUND = i;
                break;
            }
        }
        if(__FOUND >= 0) {
            reject({
                message: 'email is taken',
                status: 404
            })
        }else{

            if(newEmp.first_name.replace(/\s/g, "") === "" || newEmp.last_name.replace(/\s/g, "") === "" ){
               reject({
                 message: 'First / Last name Required!',
                 status: 404
                })
            }else{
               const first_name = newEmp.first_name.replace(/\s/g, "");
               const last_name = newEmp.last_name.replace(/\s/g, "")
               const email = newEmp.email.replace(/\s/g, "")
               const gender = newEmp.gender.replace(/\s/g, "")

            
               if( isNaN(newEmp.salary.replace(/\s/g, "").replaceAll(',', ''))|| newEmp.salary.replace(/\s/g, "") == "" ){
                reject({
                    message: 'salary is not a valid number!',
                    status: 404
                   })
               }else{
                    const salary = newEmp.salary.replace(/\s/g, "").replaceAll(',', '')
                    newEmp = { id, first_name, last_name, email, gender, salary}
                    employees.push(newEmp)
                    helper.writeJSONFile(filename, employees)
                    resolve(newEmp)
               }
            }
        }
    });
}

function getEmployee(id) {
    return new Promise((resolve, reject) => {
        let emp = helper.mustBeInArray(employees, id)
        .then(emp => resolve(employees[emp]))
        .catch(err => reject(err))
    })
}

function deleteEmployee(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(employees, id)
        .then(() => {
            employees = employees.filter(emp => emp.id !== id)
            helper.writeJSONFile(filename, employees)
            resolve()
        })
        .catch(err => reject(err))
    })
}

function updateEmployee(id, newEmp) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(employees, id)
        .then(employee => {
            const index = employees.findIndex(emp => emp.id == emp.id)
            id =  employees[index].id 
           
            let __FOUND = -1 
            for(var i=0; i<employees.length; i++) {
                if(employees[i].email == newEmp.email.replace(/\s/g, "")) {
                    // __FOUND is set to the index of the element
                    __FOUND = i;
                    break;
                }

            }
            if(__FOUND >= 0) {
                reject({
                    message: 'email is taken',
                    status: 404
                })
            }else{
    
                if(newEmp.first_name.replace(/\s/g, "") === "" || newEmp.last_name.replace(/\s/g, "") === "" ){
                   reject({
                     message: 'First / Last name Required!',
                     status: 404
                    })
                }else{
                   const first_name = newEmp.first_name.replace(/\s/g, "");
                   const last_name = newEmp.last_name.replace(/\s/g, "")
                   const email = newEmp.email.replace(/\s/g, "")
                   const gender = newEmp.gender.replace(/\s/g, "")

                   if( isNaN(newEmp.salary.replace(/\s/g, "").replaceAll(',', ''))|| newEmp.salary.replace(/\s/g, "") == "" ){
                    reject({
                        message: 'salary is not a valid number!',
                        status: 404
                       })
                   }else{
                        const salary = newEmp.salary.replace(/\s/g, "").replaceAll(',', '')
                        employees[index] = { id, first_name, last_name, email, gender, salary }
                        helper.writeJSONFile(filename, employees)
                        resolve(employees[index])
                   }
                }
            }
            
            
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    getEmployees,
    addEmployee,
    getEmployee,
    deleteEmployee,
    updateEmployee
}