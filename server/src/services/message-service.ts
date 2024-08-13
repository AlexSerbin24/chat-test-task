import Message from '../models/message';
import Chat from '../models/chat';
import axios from 'axios';
import ApiError from '../types/error-types';

class MessageService {

    static async getMessageById(messageId: string) {
        const message = await Message.findById(messageId).lean();
    
        if (!message) {
          throw ApiError.NotFound('Message not found');
        }
    
        return { ...message, id: message._id, _id: undefined, __v: undefined };
      }
      
      
    static async sendMessage(chatId: string, text: string, isUserMessage: boolean) {
        const message = new Message({
            text,
            chat: chatId,
            isUserMessage,
            createdAt: new Date(),
        });
        const newMessage = (await message.save()).toObject();

        await Chat.findByIdAndUpdate(chatId, {
            $push: { messages: message._id }
        });

        return { ...newMessage, id: newMessage._id, _id: undefined, __v: undefined };
    }

    static async getAutoResponse() {

        // const response = await axios.get('https://api.quotable.io/random');
        // return await response.data.content;

        const response = await axios.get("https://quote-generator-api-six.vercel.app/api/quotes/random");

        return response.data.quote;

    }


    static async updateMessage(messageId:string, newText:string){

        const updatedMessage = await Message.findByIdAndUpdate(messageId, {text:newText}, { new: true }).lean();
        
        if (!updatedMessage) {
            throw ApiError.NotFound('Message not found');
          }
    
        return { ...updatedMessage, id: updatedMessage._id, _id: undefined, __v: undefined };
    }



}

export default MessageService;
