import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToDB from "./config/database";
import todosRoute from "./routes/todo.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/todos', todosRoute);
app.get('/', (req: Request, res: Response) => res.send('Todo API is Running!'));


const PORT = process.env.PORT || 8000;
connectToDB().then(() => {
    app.listen(PORT, () => console.log(`✅ Server is listening to port ${PORT}`))
});
