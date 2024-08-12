import React, { useEffect, useState } from 'react';
import './style.css';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import LoginModal from './components/Modals/UserForms/LoginModal';
import RegisterModal from './components/Modals/UserForms/RegisterModal';
import useSelectedChat from './hooks/useSelectedChat';
import Message from './types/message';
import useChats from './hooks/useChats';
import { connectSocket, getSocket } from './sockets/socket';
import ChatService from './services/ChatService';

function App() {
  const { setChats } = useChats()
  const { selectedChat, setSelectedChat } = useSelectedChat()
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    connectSocket();
    const socket = getSocket();

    socket.on('newMessage', (data: { message: Message }) => {



      const { message } = data;


      addMessage(message);

      const chatId = message.chat;

      setTimeout(async () => {
        socket.emit('getResponse', chatId);
      }, 3000);
    });


    socket.on("getResponse", (data: { message: Message }) => {
      const { message } = data;
      addMessage(message);


      if (message.chat === selectedChat?.id) {
        const newDate = new Date();
        ChatService.updateChatLastRead(message.chat, newDate).then(() => {
          setChats((prevState) => prevState.map(chat => {
            if (chat.id === message.chat) return { ...chat, lastRead: newDate }

            return chat;
          }));

          setSelectedChat((prevState:any)=>({ ...prevState, lastRead: newDate }))
        })
      }
    })

    return () => {
      socket.off('newMessage');
      socket.off("getResponse");
    };
  }, [selectedChat]);

  const addMessage = (message: Message) => {
    setChats((prevState) => prevState.map((chat) => {
      if (chat.id === message.chat) {
        return { ...chat, messages: [...chat.messages, message] };
      }
      return chat;
    }));

    setSelectedChat((prevChat) => {
      if (prevChat && prevChat.id === message.chat) {
        return { ...prevChat, messages: [...prevChat.messages, message] };
      }
      return prevChat;
    });
  };

  const updateMessage = (updatedMessage: Message) => {
    setChats((prevState) => prevState.map((chat) => {
      if (chat.id === updatedMessage.chat) {
        return {
          ...chat,
          messages: chat.messages.map((msg) => msg.id === updatedMessage.id ? updatedMessage : msg),
        };
      }
      return chat;
    }));

    setSelectedChat((prevChat) => {
      if (prevChat && prevChat.id === updatedMessage.chat) {
        return {
          ...prevChat,
          messages: prevChat.messages.map((msg) => msg.id === updatedMessage.id ? updatedMessage : msg),
        };
      }
      return prevChat;
    });
  };



  return (
    <div className="app">
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)} />
      <Sidebar openLoginModal={() => setLoginOpen(true)} openRegiserModal={() => setRegisterOpen(true)} />
      <MainContent updateMessage={updateMessage} />
    </div>
  );
}

export default App;
