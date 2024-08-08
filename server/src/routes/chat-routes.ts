import { Router } from 'express';
import ChatController from '../controllers/chat-controller';
import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.post('/', authMiddleware, ChatController.createChat);

router.get('/all/:userId', authMiddleware, ChatController.getChats);

router.put('/:id', authMiddleware, ChatController.updateChat);

router.get('/:id', authMiddleware, ChatController.getChatById);

router.delete('/:id', authMiddleware, ChatController.removeChat);

export default router;
