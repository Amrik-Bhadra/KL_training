import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import http from "http";
import compression from "compression";
import connectToDB from "config/db";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true
}))
app.use(compression());
app.use(cookieparser());

// connect to database
connectToDB();


app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
server.listen(PORT, () => { console.log(`server is running on http://localhost:8000`) })
