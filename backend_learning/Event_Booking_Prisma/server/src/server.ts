import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Backend With PosgtreSQL + Prisma');
});

const PORT = process.env.PORT || 8000;
app.listen(()=>console.log(`✅ Server listening to port ${PORT}`))