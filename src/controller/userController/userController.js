import User from "../../schema/User/User.js";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import requestBody from "../../config/formData/formData.js";
import EctDct from "../../config/Encryption&Decryption/EctDct.js";
import dotenv from "dotenv";
dotenv.config();

const {encrypt } = EctDct;
class userController {
  // for the register user
  userSignUp = async (req, res) => {
    const { fields, files } = await requestBody(req);
    fields.userPassword = encrypt(fields.userPassword, process.env.KEY);
    try {
      if (files.profile) {
        const img = await cloudinary.uploader.upload(files.profile[0].filepath);
        fields.profileId = img.public_id;
        fields.profileSecure = img.secure_url;
        fields.profile = img.url;
      }
      return res.status(201).json(await User.create(fields));
    } catch (err) {
      return res.status(501).json(err);
    }
  };

  varifyOTP = async (req, res) => {};

  resendOTP = async (req, res) => {};

  fetchAlluser = async (req, res) => {
    try {
      return res.status(200).json(await User.find({}));
    } catch (err) {
      return res.status(501).json(err);
    }
  };

  fetchUser = async (req, res) => {};

  deleteUser = async (req, res) => {};

  updateUser = async (req, res) => {};
}

export default new userController();
