import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.listen(dotenv.PORT, ()=>{

    console.log("SERVER IS RUNNING");
})

