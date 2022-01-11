const fs = require('fs');

function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile('./readme.txt', (err,data)=>{
            if (err){
                reject(err);
            }
            resolve(data);
        })  
    })
}

async function readFileToDo(){
    const fileData = await readFile();
    console.log(1, fileData.toString());
    const fileData2 = await readFile();
    console.log(2, fileData2.toString());
    const fileData3 = await readFile();
    console.log(3, fileData3.toString());
}

console.log('시작');
console.log('끝');
readFileToDo();