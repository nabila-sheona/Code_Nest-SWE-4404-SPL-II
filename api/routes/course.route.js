// routes/course.route.js

import express from 'express';
import { registerCourse, checkRegistration, getUserLevel, unlockNextLevel } from '../controllers/course.controller.js';

const router = express.Router();


router.post('/register-course', registerCourse);
router.get('/check-registration/:username', checkRegistration);
router.get('/user-level/:courseName/:username', getUserLevel);
router.post('/unlock-next-level', unlockNextLevel);
export default router;
