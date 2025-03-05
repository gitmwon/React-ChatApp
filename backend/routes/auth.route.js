import express from 'express'
import {signup,login,logout,updateProfile,checkuser,updateUserData} from '../controllers/auth.controller.js'
import { checkAuth } from '../middleware/checkAuth.js';
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.route('/signup').post(signup)

router.route('/login').post(login)

router.route('/logout').post(logout)

router.route('/update-profile').put(checkAuth,upload.single("profilePic"),updateProfile);

router.route('/checkuser').get(checkAuth,checkuser);

router.route('/update-data').put(checkAuth,updateUserData);

export default router;