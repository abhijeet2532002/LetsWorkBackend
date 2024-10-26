import express from 'express';
import CreateSeasion from '../../../Auth/CreateSeasion.js';
const {createToken} = CreateSeasion;
const router = express.Router();
router.get("/create/session",createToken);

export default router;