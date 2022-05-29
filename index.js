const express=require("express")
const dotenv=require('dotenv')
const app=express()
const cors=require("cors")
const mongoose=require("mongoose")
const authRoute=require("./routes/auth")
const upp=require("./routes/upload")
const path = require('path');

dotenv.config();

mongoose
.connect(process.env.MONGO_URL).then(()=>console.log("DB Connection Successfull"))
.catch((err)=>{
    console.log(err);
})


app.use(express.static('files'));  

app.use('/images', express.static('files')); 

app.use(cors())
app.use(express.json())
app.use("/auth",authRoute)
app.use("/file",upp)



app.listen(process.env.PORT||5000,()=>{
    console.log("Backend server running on 5000")
})