const express=require('express');
const app=express();
const port=process.env.port || 3000;

app.get('/',(req,res)=>{
    res.send("hellow Travel agency")
})
 
app.listen(port,()=>{
    console.log("Port moves to",port);
})