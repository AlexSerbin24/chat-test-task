import { Router } from 'express';
import userRoutes from './user-routes'
import chatRoutes from './chat-routes';
import messageRoutes from './message-routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/chats', chatRoutes);
router.use('/messages', messageRoutes);

export default router;
