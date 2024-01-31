import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from "body-parser"
import routes from "./routes/indexroutes.js"

dotenv.config()

const app = express()
const port = 8000
app.use(cors())
app.use(bodyParser.json());

app.use(routes)

await mongoose.connect(`mongodb://localhost:27017/bigmovies`)
.then(()=>{
    app.listen(port,(req,res)=>{
        console.log(`Mongodb connected succesfully and Server running at http://localhost:${port}`)
    })
})
.catch((err)=>{
    console.log("error",err)
})
