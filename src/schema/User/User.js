import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
    userRole: { type: String, default: "client" },
    pastProjects: [],
    currentProject: [],
    profile: {type: String,default:"https://www.flaticon.com/media/dist/min/img/stickers/nature.png"},
    userAddress: { type: String, required: true },
    userProffesion: { type: String },
    currentDocument: [],
    Contribution: { type: String },
    CurrentLink: { type: String },
    isBlocked: { type: Boolean, default: false },
    feedback: { type: String },
    Payment: {type: String,enum: ["pending", "Success", "fail", "half", "full"]},
    amount: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User",userSchema);

export default User;