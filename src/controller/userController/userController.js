import User from "../../schema/User/User.js";
import formidable from "formidable";
import cloudinary from "../../config/Cloudinary/cloudinary.js";
import requestBody from "../../config/formData/formData.js";

class userController {
  // for the register user
  userSignUp = async (req, res) => {
    const { fields, files } = await requestBody(req);
    return res.json(await User.create(fields));
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
