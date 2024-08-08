import { Router } from 'express';
import MessageController from '../controllers/message-controller';
import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.post('/', authMiddleware, MessageController.sendMessage);



export default router;
