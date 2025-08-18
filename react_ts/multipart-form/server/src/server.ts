import express from "express";
const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./config/database";

const corsOption = {
    origin: "http://localhost:5173",
    methods: ['GET','POST','PUT','DELETE','PATCH'],
    credentials: true
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOption));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

connectToDB().then(()=>{
    app.listen(PORT, () => console.log(`✅ Server is listening to port ${PORT}`))
});