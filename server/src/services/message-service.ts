import Message from '../models/message';
import Chat from '../models/chat';

class MessageService {
    static async sendMessage(chatId: string, text: string, isUserMessage: boolean) {
        const message = new Message({
            text,
            chat: chatId,
            isUserMessage,
            createdAt: new Date(),
        });
        await message.save();
    
        await Chat.findByIdAndUpdate(chatId, {
            $push: { messages: message._id }
        });
    
        return message;
    }
    
}

export default MessageService;
