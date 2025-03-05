import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import {getUsersForsidebar,getMessages,sendMessage} from '../controllers/message.controller.js';

const router = express.Router();

router.route('/users').get(checkAuth,getUsersForsidebar);

router.route('/:id').get(checkAuth,getMessages);

router.route('/send/:id').post(checkAuth,sendMessage);

export default router;