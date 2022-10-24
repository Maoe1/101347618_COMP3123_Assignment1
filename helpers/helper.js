const fs = require('fs')
function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        var __FOUND = -1;
        for(var i=0; i<array.length; i++) {
            if(array[i].id == id) {
                // __FOUND is set to the index of the element
                __FOUND = i;
                break;
            }
        }
        if (__FOUND == - 1) {
            reject({
                message: 'ID is not good',
                status: 404
            })
        }
        resolve(__FOUND)
    })
}

function checkForEmptyContent(data, res){
    if (Object.keys(data).length === 0) {
        return res.status(400).send({
          message: "Cannot pass an empty object"
        })
      }
}



module.exports = {
 
    writeJSONFile,
    mustBeInArray,
    checkForEmptyContent
}