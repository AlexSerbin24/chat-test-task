import { Router } from 'express';
import MessageController from '../controllers/message-controller';
import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.put("/:id", authMiddleware,MessageController.updateMessage)


export default router;
