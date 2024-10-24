import express from 'express';
import dotenv from 'dotenv';
import DB from './configuration/DB_Config/MongoDBConfig.js';
import MainRouter from './router/mainRouter.js'

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 8000;

app.use('/letswork', MainRouter);

app.listen(port, () => {
    console.log(`app is successfully running on PORT Number is ${port}`);
})