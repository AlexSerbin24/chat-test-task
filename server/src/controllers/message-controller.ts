import { Request, Response } from 'express';
import MessageService from '../services/message-service';
import ChatService from '../services/chat-service';
import { AuthRequest } from '../types/request-types';

class MessageController {
    static async sendMessage(req: AuthRequest, res: Response) {
        try {
            const { chatId, text } = req.body;
            const checkChat = await ChatService.getChatById(chatId);

            if (req.userId !== checkChat.user.toString()) {
                return res.status(403).json({ message: 'Forbidden: You can only access your own chats' });
            }

            const message = await MessageService.sendMessage(chatId, text, true);
            res.status(201).json(message);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}

export default MessageController;