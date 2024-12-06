import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    projectDescription: { type: String, required: true },
    wireframes: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    projectUrl: { type: String },
    projectGithub: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    prise: { type: String },
    Payment: { type: String, enum: ["pending", "Success", "fail", "half", "full"] },
    wizard: { meeting: 'pending', planning: 'pending', design: 'pending', development: 'pending', testing: 'pending', SEO: 'pending', production: 'pending', maintains: 'pending' }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;