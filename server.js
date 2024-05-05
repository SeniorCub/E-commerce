import express from 'express';
import path from 'path';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import connectDB from './dB/connect.js';
import color from 'colors';
import morgan from 'morgan';
import usermodels from './models/usermodels.js';
import productmodels from './models/productmodels.js';
import authroute from './routes/authroute.js';
import productroute from './routes/productroute.js';
const app = express();
dotenv.config();

connectDB()

app.use(express.json());
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(process.cwd(), "/Public")))
app.use("/uploads", express.static(path.join(process.cwd(), "/uploads")))

// Middleware for handling 404 errors
app.use((req, res, next) => {
     res.status(404).sendFile(path.join(process.cwd(), "/View/404.html"));
   });


app.use('/api/v1/auth', authroute);
app.use('/api/v1/products', productroute);

const PORT = (process.env.PORT || 2020 );
app.listen(PORT, ()=>{
     console.log(`Server running on http://localhost:${PORT}`.bgBlue.red);
})