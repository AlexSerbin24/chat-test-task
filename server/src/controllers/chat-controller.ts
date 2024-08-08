import { Response } from 'express';
import ChatService from '../services/chat-service';
import { AuthRequest } from '../types/request-types';
import { isUserOwner } from '../utils/access-control';

class ChatController {

  static async createChat(req: AuthRequest, res: Response) {
    try {

      if (!isUserOwner(req.userId, req.body.userId)) {
        return res.status(403).json({ message: 'Forbidden: You can only access your own chats' });
      }

      const chat = await ChatService.createChat(req.body);
      res.status(201).json(chat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  static async updateChat(req: AuthRequest, res: Response) {
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
      res.status(400).json({ message: error.message });
    }
  }

  static async removeChat(req: AuthRequest, res: Response) {
    try {

      const checkChat = await ChatService.getChatById(req.params.id);

      if (!isUserOwner(req.userId, checkChat.user.toString())) {
        return res.status(403).json({ message: 'Forbidden: You can only access your own chats' });
      }

      const chat = await ChatService.removeChat(req.params.id);
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
      res.json({ message: 'Chat removed successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  static async getChats(req: AuthRequest, res: Response) {
    try {
      if (!isUserOwner(req.userId, req.params.userId)) {
        return res.status(403).json({ message: 'Forbidden: You can only access your own chats' });
      }

      const chats = await ChatService.getChats(req.params.userId);
      res.json(chats);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getChatById(req: AuthRequest, res: Response) {
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
      res.status(400).json({ message: error.message });
    }
  }
}

export default ChatController;
