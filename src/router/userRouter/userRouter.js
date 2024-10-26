import express from "express";
import user from '../../controller/userController/userController.js';
const {deleteUser} = user;

const router = express();

export default router;