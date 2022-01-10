const fs =require('fs').promises;

console.log('시작');
//Promise
let readSeveralTimes=()=>{
    return new Promise((resolve,reject)=>{
      
        fs.readFile('readme2.txt',(err,data) => {
            if(err){
                reject("오류났어요");
                
            }
            resolve(data.toString());
        })
            
    });
}

/*
readSeveralTimes()
.then((data)=>{
    console.log("1번\n", data);
    return readSeveralTimes();
})
.then((data)=>{
    console.log("2번\n",data);
    return readSeveralTimes();
})
.then((data)=>{
    console.log("3번\n",data);
    return readSeveralTimes();
})
*/

//async, await

const readSeveralTimes_async= async() => {
    try{
        let data = await fs.readFile('readme2.txt');
        console.log("1번\n", data.toString());
        data=await fs.readFile('readme2.txt');
        console.log("2번\n", data.toString());
        data = await fs.readFile ('readme2.txt');
        console.log ("3번\n", data.toString());
    }
    catch (error)
    {console.log(error);}
}

readSeveralTimes_async();

//await 뒤에는 항상 promise가 붙어야 한다. 따라서 readSeveralTimes를 실행하려면 fs에 붙여진 promises를 떼야함