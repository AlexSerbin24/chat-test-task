import React, { createContext, useState, ReactNode } from 'react';
import SelectedChatContextType from '../../types/contexts/selectedChatContextType';
import Chat from '../../types/chat';

export const SelectedChatContext = createContext<SelectedChatContextType | undefined>(undefined);

const SelectedChatProvider = ({ children }: { children: ReactNode }) => {
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    return (
        <SelectedChatContext.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </SelectedChatContext.Provider>
    );
};

export default SelectedChatProvider;
