import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';

dotenv.config();

await connectDb();

const app=express();

//importing routes
import userRoutes from './routes/user.js';

//using routes
app.use('/api/v1',userRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})