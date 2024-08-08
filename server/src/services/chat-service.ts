import Chat from '../models/chat';
import { CreateChat, UpdateChat } from '../types/chat-types';
import Message from '../models/message';

class ChatService {
  static async createChat(data: CreateChat) {
    const { firstName, lastName, userId } = data;

    const chat = new Chat({ firstName, lastName, user: userId });
    return await chat.save();
  }
  static async updateChat(chatId: string, updateData: UpdateChat) {
    return await Chat.findByIdAndUpdate(chatId, updateData, { new: true });
  }

  static async removeChat(chatId: string) {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new Error('Chat not found');
    }


    await Message.deleteMany({ chat: chatId });

    return await Chat.findByIdAndDelete(chatId);
  }

  static async getChats(userId: string) {
    return await Chat.find({ user: userId })
      .populate({
        path: 'messages',
        model: 'Message',
        select: 'text isUserMessage createdAt',
      });
  }

  static async getChatById(chatId: string) {
    return await Chat.findById(chatId);
  }
}

export default ChatService;