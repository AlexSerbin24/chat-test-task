import React, { createContext, useState } from 'react';
import ChatsContextType from '../../types/contexts/chatsContextType';
import Chat from '../../types/chat';

export const ChatsContext = createContext<ChatsContextType | undefined>(undefined);

const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  return (
    <ChatsContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsProvider;
