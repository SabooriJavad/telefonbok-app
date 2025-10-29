import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './src/routes/userRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/User', userRouter);







app.get('/', (req, res) => {
    res.send('Server  is running')
});


(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const port = process.env.PORT || 8000;
  

        app.listen(port, () => {
            console.log(`Server running on the http://localhost:${port}`)
        });
    } catch (err) {
      
        console.error('Failed to start server', err.message);
    }
   
})();

