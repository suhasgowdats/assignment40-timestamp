const fs=require('fs');
const express=require('express')
const parth=require('path');
const { options } = require('nodemon/lib/config');
const pathDire=parth.join(__dirname,'files')
const filePath=`${pathDire}/timeStamp.txt`
const PORT= process.env.PORT||5000

const app=express();

app.get('/create', async(req, res)=>{
    setInterval(() => {
        let res = new Date();
        let date = res.toLocaleDateString('en-US', options);
        let time = res.toLocaleTimeString('it-IT', options);
        fs.writeFileSync(filePath, `Date:${date} Time:${time}`, (err) => {
            if (!err) { console.log("success"); }
        });
    }, 1500);
    res.send("file created success")
})

app.get('/files', (req,res)=>{
    fs.readFile(filePath,(err, data)=>{
        res.send(data)
    })
})


app.listen(PORT, ()=>{
    console.log(PORT)
})