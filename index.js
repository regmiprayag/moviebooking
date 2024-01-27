import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'

const app = express()
const port = 8000

app.get("/",(req,res)=>{
    res.send("hello")
})

await mongoose.connect(`mongodb+srv://regmiprayag:zk1tFdJa3DaxbHdn@cluster0.fidh2vp.mongodb.net/`)
.then(()=>{
    app.listen(port,(req,res)=>{
        console.log(`Mongodb connected succesfully and Server running at http://localhost:${port}`)
    })
})
.catch((err)=>{
    console.log("error",err)
})
