import Project from '../../schema/Project/Project.js';
import User from '../../schema/User/User.js';

class projectController {

    addProject = async (req, res) => {
        const { userEmail } = req.body;
        try {
            const client = await User.findOne({userEmail});
            if (!client) {
                return res.status(404).json({Error:`user does't exist with ${userEmail}`})
            }
            const team = await User.find({ userRole: 'admin' },'_id');
            const projectModel = await Project.create(req.body);
            projectModel.teams.push(...team.map(admin => admin._id));
            projectModel.save();
            return res.status(200).json(projectModel);
            
        } catch (err) {
           return res.status(500).json(err)
        }

    }

    getAllProject = async (req, res) => {

    }

    updateProject = async (req, res) => {

    }

    deleteProject = async (req, res) => {

    }

    singleProject = async (req, res) => {

    }
}

export default new projectController();
