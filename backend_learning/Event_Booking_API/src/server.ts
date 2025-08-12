import express, {Request, Response} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./config/database";
import userRoutes from "./routes/user.routes";

import dotenv from "dotenv";
dotenv.config();

const app = express();

// to parse form data (json data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle incoming request for other source
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','PUT','DELETE','PATCH'],
    credentials: true,
}));

//
app.use(cookieParser());

// routes
app.use('/api/v1/users', userRoutes);

// inital route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});


const port = process.env.PORT || 5000;

// return a promise (then means if success, then listen to the port)
connectToDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`✅ Server running on port ${port}`);
    });
});