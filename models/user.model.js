const filename = 'C://Users//mfles//OneDrive//Documents//FullStack//101347618_COMP3123_Assignment1//data//users.json'
let users = require(filename)
const helper = require('../helpers/helper.js')

function addUser(newUser) {
    return new Promise((resolve, reject) => {
        const id = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16); 
        var __FOUND = -1;
        for(var i=0; i<users.length; i++) {
            if(users[i].email == newUser.email.replace(/\s/g, "")  || users[i].user_name == newUser.user_name.replace(/\s/g, "")) {
                // __FOUND is set to the index of the element
                __FOUND = i;
                break;
            }
        }
        if (__FOUND >= 0) {
            reject({
                message: 'email or username is taken',
                status: 404
            })
        }else{
        const email = newUser.email.replace(/\s/g, "")
        const user_name = newUser.user_name.replace(/\s/g, "")
        const password = newUser.password.replace(/\s/g, "")
        newUser = { id, user_name, email, password}
        users.push(newUser)
        helper.writeJSONFile(filename, users)
        resolve(newUser)
        }
    })
}

function login(user, res){
    for(x=0; x< users.length; x++){
    if(user.email === users[x].email && user.password === users[x].password){
        res.status(200).json({
    
        status: true,
        message: `User ${users[x].user_name} has logged in`
    
        });
      }else if (user.email.replace(/\s/g, "") === users[x].email){
    
       res.status(500).json({
      
       status: false,
      
       message: "Password is invalid"
      
       });
      }else{
    
      res.status(500).json({
      
      status: false,
      
      message: "email is invalid"
      
       });
     }
    }
}

module.exports = {
    addUser,
    login
   
}