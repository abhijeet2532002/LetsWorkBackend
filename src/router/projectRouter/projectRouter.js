import express from 'express';
import projectController from '../../controller/projectController/projectController.js';
const {addProject,deleteProject,getAllProject,singleProject,updateProject} = projectController;

const router = express.Router();
router.post('/add/data',addProject);
router.get('/getAll/data',getAllProject);
router.delete('/delete/data',deleteProject);
router.get('/fetch/data/:id',singleProject);
router.patch('/update/:id',updateProject);

export default router;

