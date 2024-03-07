import express from 'express';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.join(process.cwd(), "/Public")))


const PORT = (process.env.PORT || 9090 );
app.listen(PORT, ()=>{
     console.log(`Server running on http://localhost:${PORT}`);
})