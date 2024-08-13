import { NextFunction, Request, Response } from 'express';
import MessageService from '../services/message-service';
import ChatService from '../services/chat-service';
import { AuthRequest } from '../types/request-types';

class MessageController {
    static async updateMessage(req: AuthRequest, res: Response, next:NextFunction) {
        try {
            const messageId = req.params.id;


            const checkMessage = await MessageService.getMessageById(messageId);


            const checkChat = await ChatService.getChatById(checkMessage.chat.toString());

            if (req.userId !== checkChat.user.toString()) {
                return res.status(403).json({ message: 'Forbidden: You can only access your own chats' });
            }


            const updatedMessage = await MessageService.updateMessage(messageId, req.body.newText)
            res.status(201).json(updatedMessage);
        } catch (error) {
            next(error);
        }
    }
}

export default MessageController;