import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import { notFound, errorHandler } from './middlewares/error.middleware';
import rateLimit from 'express-rate-limit';

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,    // limit to 100 request for given window time (here 15min)
    message: "Too many requests, please try again later",
    standardHeaders: true,  // Return rate limit info in headers
    legacyHeaders: false,  // disables the X-RateLimit-* headers
});



app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(limiter);
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
