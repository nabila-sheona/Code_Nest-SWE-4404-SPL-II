// routes/course.route.js

import express from 'express';
import { registerCourse, checkRegistration, getUserLevel } from '../controllers/course.controller.js';

const router = express.Router();

router.post('/register-course', registerCourse);
router.get('/check-registration/:username', checkRegistration);
router.get('/user-level/:courseName/:username', getUserLevel); // This route is ready to handle requests


export default router;
