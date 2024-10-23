import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js"
import passport from "./controllers/googleController.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());


const corsOptions = {
    origin: true, // Change to your frontend URL in production
    credentials: true,
};
app.use(cors(corsOptions));

app.use(passport.initialize())


//api route
app.use('/auth', authRoute)
app.use('/users', postRoute)
app.use('/users', userRoute)


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server listening on port ${PORT}`);
});
