import express from "express";
import user from '../../controller/userController/userController.js';
import verifyToken from "../Auth/Verifytoken.js";
const {deleteUser,fetchAlluser,fetchUser,resendOTP,updateUser,userSignUp,varifyOTP} = user;
const router = express();
router.post("/api/register/data",userSignUp);
router.get("/api/all/data", fetchAlluser);

export default router;