import Chat from '../models/chat';
import { CreateChat, UpdateChat } from '../types/chat-types';
import Message from '../models/message';

class ChatService {
  static async getRandomChatId(userId: string) {
    const chats = await Chat.find({ user: userId }).select('_id').lean();



    const randomIndex = Math.floor(Math.random() * chats.length);
    return chats[randomIndex]._id.toString();
  }

  static async createChat(data: CreateChat) {
    const { firstName, lastName, userId } = data;

    const chat = new Chat({ firstName, lastName, user: userId });
    const newChat = await chat.save();

    const chatData = newChat.toObject();

    return {
      ...chatData,
      id: chatData._id,
      _id: undefined,
      __v: undefined
    };
  }


  static async updateChatLastRead(chatId: string, newDate:Date) {
    const updatedChat = await Chat.findByIdAndUpdate(chatId, { lastRead: newDate }).lean();

    if (!updatedChat) {
      throw new Error('Chat not found');
    }

    return { ...updatedChat, id: updatedChat._id, _id: undefined, __v: undefined };
  }

  static async updateChat(chatId: string, updateData: UpdateChat) {
    const updatedChat = await Chat.findByIdAndUpdate(chatId, updateData, { new: true }).lean();

    if (!updatedChat) {
      throw new Error('Chat not found');
    }

    return { ...updatedChat, id: updatedChat._id, _id: undefined, __v: undefined };
  }

  static async removeChat(chatId: string) {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new Error('Chat not found');
    }

    await Message.deleteMany({ chat: chatId });

    const removedChat = await Chat.findByIdAndDelete(chatId).lean();

    if (removedChat) {
      return { ...removedChat, id: removedChat._id, _id: undefined, __v: undefined };
    }

    return null;
  }

  static async getChats(userId: string) {
    const chats = await Chat.find({ user: userId })
      .populate({
        path: 'messages',
        model: 'Message',
      })
      .lean();

    return chats.map(chat => ({
      ...chat,
      messages: chat.messages.map((message) => ({
        ...message,
        id: message._id,
        _id: undefined,
        __v: undefined
      })),
      id: chat._id,
      _id: undefined,
      __v: undefined
    }));
  }

  static async getChatById(chatId: string) {
    const chat = await Chat.findById(chatId).lean();


    if (!chat) {
      throw new Error('Chat not found');
    }

    return { ...chat, id: chat._id, _id: undefined, __v: undefined };
  }
}

export default ChatService;
