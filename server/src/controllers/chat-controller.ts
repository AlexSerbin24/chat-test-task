import { NextFunction, Response } from 'express';
import ChatService from '../services/chat-service';
import { AuthRequest } from '../types/request-types';
import { isUserOwner } from '../utils/access-control';
import ApiError from '../types/error-types';

class ChatController {

  static async createChat(req: AuthRequest, res: Response, next:NextFunction) {
    try {

      if (!isUserOwner(req.userId, req.body.userId)) {
        return res.status(403).json({ message: 'Forbidden: You can only access your own chats' });
      }

      const chat = await ChatService.createChat(req.body);
      res.status(201).json(chat);
    } catch (error) {
      next(error)
    }
  }


  static async updateChat(req: AuthRequest, res: Response, next:NextFunction) {
    try {
      const checkChat = await ChatService.getChatById(req.params.id);

      if (!isUserOwner(req.userId, checkChat.user.toString())) {
        return res.status(403).json({ message: 'Forbidden: You can only access your own chats' });
      }



      const chat = await ChatService.updateChat(req.params.id, req.body);
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
      res.json(chat);
    } catch (error) {
      next(error);
    }
  }

  static async updateChatLastRead(req: AuthRequest, res: Response, next:NextFunction) {
    try {
      const checkChat = await ChatService.getChatById(req.params.id);

      console.log(req.body)
      
      if (!isUserOwner(req.userId, checkChat.user.toString())) {
        return res.status(403).json({ message: 'Forbidden: You can only access your own chats' });
      }

      await ChatService.updateChatLastRead(req.params.id, new Date());

      res.sendStatus(204);
    } catch (error) {
      next(error)
    }
  }

  static async removeChat(req: AuthRequest, res: Response, next:NextFunction) {
    try {

      const checkChat = await ChatService.getChatById(req.params.id);

      if (!isUserOwner(req.userId, checkChat.user.toString())) {
        return res.status(403).json({ message: 'Forbidden: You can only access your own chats' });
      }

      await ChatService.removeChat(req.params.id);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }


  static async getChats(req: AuthRequest, res: Response, next:NextFunction) {
    try {
      if (!isUserOwner(req.userId, req.params.userId)) {
        return res.status(403).json({ message: 'Forbidden: You can only access your own chats' });
      }

      const chats = await ChatService.getChats(req.params.userId);
      res.json(chats);
    } catch (error) {
      next(error)
    }
  }

  static async getChatById(req: AuthRequest, res: Response, next:NextFunction) {
    try {
      const chat = await ChatService.getChatById(req.params.id);
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }

      if (!isUserOwner(req.userId, chat.user._id.toString())) {
        return res.status(403).json({ message: 'Forbidden: You can only access your own chats' });
      }


      res.json(chat);
    } catch (error) {
      next(error);
    }
  }
}

export default ChatController;
