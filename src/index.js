import express from 'express';
import dotenv from 'dotenv';
import DB from './config/DB_Config/MongoDBConfig.js';
import MainRouter from './router/mainRouter.js'

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());``

app.use('/letswork', MainRouter);

app.listen(port, () => {
    console.log(`app is successfully running on PORT Number is ${port}`);
})