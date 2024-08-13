import { Server, Socket } from 'socket.io';
import MessageService from '../services/message-service';
import ChatService from '../services/chat-service';

async function handleSendMessage(socket: Socket, text: string, chatId: string) {
  try {
    const newMessage = await MessageService.sendMessage(chatId, text, true);
    socket.emit('newMessage', { message: newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
  }
}


async function handleSendRandomMessage(socket: Socket, userId: string) {
  try {
    const randomChatId = await ChatService.getRandomChatId(userId);
    const newMessage = await MessageService.sendMessage(randomChatId, "Random message sample", true);
    socket.emit('newMessage', { message: newMessage });
  } catch (error) {
    console.error('Error sending random message:', error);
  }
}


async function handleGetResponse(socket: Socket, chatId: string) {
  try {
    const quotation = await MessageService.getAutoResponse();
    const botMessage = await MessageService.sendMessage(chatId, quotation, false);
    socket.emit('getResponse', { message: botMessage });
  } catch (error) {
    console.error('Error getting response message:', error);
  }
}


export function setupSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('sendMessage', (text: string, chatId: string) => handleSendMessage(socket, text, chatId));
    socket.on('sendRandomMessage', (userId: string) => handleSendRandomMessage(socket, userId));
    socket.on('getResponse', (chatId: string) => handleGetResponse(socket, chatId));

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}
