import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import courseRoutes from './routes/course.route.js'; // Make sure to import the course routes
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log(err);
});

const __dirname = path.resolve();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Adjust this if your frontend is on a different port
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Handle React routing, return all requests to React app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
