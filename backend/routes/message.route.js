import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import {getUsersForsidebar,getMessages,sendMessage} from '../controllers/message.controller.js';
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.route('/users').get(checkAuth,getUsersForsidebar);

router.route('/:id').get(checkAuth,getMessages);

router.route('/send/:id').post(checkAuth,upload.array("image",10),sendMessage);

export default router;