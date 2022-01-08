const fs = require('fs');

function readFile(i) {
    fs.readFile('./readme.txt', (err,data)=>{
        if (err){
            throw err;
        }
        console.log(i, data.toString());
    })
}

async function readFileToDo(){
    for (i=1; i<4; i++){
        await readFile(i);
    } 
}

console.log('시작');
readFileToDo();
console.log('끝');