import express from 'express';
import connectDB from "./db"
import routes from './routes/routes'; // Импорт всех маршрутов
import dotenv from 'dotenv';


dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
