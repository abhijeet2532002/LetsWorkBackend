import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  wireframes: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  projectUrl: { type: String },
  projectGithub: { type: String },
  user: { type: String, required: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  price: { type: String },
  payment: {type: String,enum: ["pending", "success", "fail", "half", "full"]},
  documents:{type:String},
  wizard: {type: Object, default: {meeting: "pending",planning: "pending",design: "pending",development: "pending",testing: "pending",SEO: "pending",production: "pending",maintains: "pending"}}
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
