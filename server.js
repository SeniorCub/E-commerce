import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(process.cwd(), "/Public")))


const PORT = (process.env.PORT || 9998 );
app.listen(PORT, ()=>{
     console.log(`Server running on http://localhost:${PORT}`);
})