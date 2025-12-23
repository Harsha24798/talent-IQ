import express from 'express';
import { chatController } from '../controllers/chatController.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/token', protectRoute, chatController);

export default router;