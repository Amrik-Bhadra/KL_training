import express, { Request, Response  } from "express";
const app = express();

app.use(express.json());

app.get('/hello', (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello World!" });
});

export default app;