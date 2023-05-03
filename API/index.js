require('dotenv').config();

const express=require('express');

const cors=require('cors');
// const mongoose = require('mongoose');
const router=require('./routes/authRoutes')
const colors=require('color')
const connectDb=require('./DataBase/database');
const taskRouter = require('./routes/tasks');


const app=express();




//middle ware

app.use(express.json());

app.use('/',router);

app.use('/',taskRouter);

app.use(
    cors({
        credentials:true,
        
        origin:'http://localhost:8000'}
        )
)


//connect to the daba base
connectDb()
// const port=8000;
app.listen(8000,()=>{
    console.log(`server is running on port http://localhost:${8000}`)
})

