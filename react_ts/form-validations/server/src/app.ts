import type { Request, Response } from 'express';
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOption = {
    origin: 'http://localhost:5173',
    methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
    credentials: true,
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Express with TypeScript!");
});

export default app;
