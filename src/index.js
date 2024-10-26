import express from 'express';
import dotenv from 'dotenv';
import DB from './config/DB_Config/MongoDBConfig.js';
import MainRouter from './router/mainRouter.js';
dotenv.config();
const PORT = process.env.PORT || 5000;

import MainRouter from './router/mainRouter.js'
const app = express();
app.use(express.json());

app.use('/letswork', MainRouter);

app.listen(PORT, () => {
    console.log(`Server Started At Port ${PORT}`);
})