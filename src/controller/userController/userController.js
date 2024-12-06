import User from "../../schema/User/User.js";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import requestBody from "../../config/formData/formData.js";
import EctDct from "../../config/Encryption&Decryption/EctDct.js";
import dotenv from "dotenv";
import Mail from "../../Mail/sendMail.js";
import { LocalStorage } from "node-localstorage";
dotenv.config();

const { encrypt, isValidPassword } = EctDct;
const { sendMail } = Mail;
const localStorage = new LocalStorage("./scratch");
class userController {
  // for the register user
  userSignUp = async (req, res) => {
    const { fields, files } = await requestBody(req);
    if (!isValidPassword(fields.userPassword)) {
      return res.status(400).json({
        error:
          "Password must have at least one letter (uppercase or lowercase), one digit, and one special symbol",
      });
    }
    fields.userPassword = encrypt(fields.userPassword, process.env.KEY);
    try {
      if (files.profile) {
        fields.profile = files.profile;
      }
      const randomNumber = Math.floor(100000 + Math.random() * 900000);
      fields.OTP = randomNumber;
      fields.time = new Date().getMinutes();
      const exist = localStorage.getItem("userInfo");
      if (exist) {
        localStorage.removeItem("userInfo");
      }
      const userJsonString = JSON.stringify(fields);
      localStorage.setItem("userInfo", userJsonString);
      sendMail(fields);
      return res.json({
        User: " 6 degit OTP Send over Your Mail, Cheak and Varify before OTP Expire",
      });
    } catch (err) {
      return res.status(501).json(err);
    }
  };

  varifyOTP = async (req, res) => {
    const OTP = req.body.OTP;
    const user1 = localStorage.getItem("userInfo");
    const user = JSON.parse(user1);
    const date = new Date();
    let current = date.getMinutes();
    if (Math.abs(current - user.time) <= 5) {
      if (user.profile) {
        const img = await cloudinary.uploader.upload(files.profile[0].filepath);
        user.profileId = img.public_id;
        user.profileSecure = img.secure_url;
        user.profile = img.url;
      }

      if (user.OTP == OTP) {
        delete user.OTP;
        const userData = await User.create(user);
        return res.json({ Varify: "Account Varified", Message: userData });
      }
      return res.json({ Messgae: "OTP did't Matched" });
    } else {
      return res.json({ Message: "Sorry OTP Expires" });
    }
  };

  resendOTP = async (req, res) => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const user1 = localStorage.getItem("userInfo");
    const user = JSON.parse(user1);
    localStorage.removeItem("userInfo");
    user.OTP = randomNumber;
    localStorage.setItem("userInfo", JSON.stringify(user));
    sendMail(user);
    return res.json({
      User: " 6 degit OTP Send over Your Mail, Cheak and Varify before OTP Expire",
    });
  };

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
