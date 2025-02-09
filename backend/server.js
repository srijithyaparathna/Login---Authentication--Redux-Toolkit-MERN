import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);
app.get('/', (req, res) => res.send('API running'));
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
