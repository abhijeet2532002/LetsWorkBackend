import User from "../../schema/User/User.js";
import formidable from "formidable";


class userController{

    // for the register user
   userSignUp = async (req,res)=>{
       
   }

   varifyOTP = async (req,res)=>{

   }

   resendOTP = async (req,res)=>{

   }

   fetchAlluser = async (req,res)=>{
       try{
            return res.status(200).json(await User.find({}));
       }catch(err){
        return res.status(501).json(err);
       }
   }

   fetchUser = async (req,res)=>{

   }

   deleteUser = async (req,res)=>{

   }

   updateUser = async (req,res)=>{

   }

}

export default new userController();