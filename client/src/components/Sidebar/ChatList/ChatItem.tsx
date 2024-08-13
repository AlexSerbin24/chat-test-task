import React, { useEffect, useState } from 'react';
import UserAvatar from '../../../ui/UserAvatar/UserAvatar';
import Chat from '../../../types/chat';
import Message from '../../../types/message';
import useSelectedChat from '../../../hooks/useSelectedChat';
import ChatService from '../../../services/ChatService';
import useChats from '../../../hooks/useChats';

type Props = {
    chat: Chat;
    onUpdate: (chat: Chat) => void;
    onDelete: (chatId: string) => void;
};


function countUnreadMessages(messages: Message[], lastRead: Date): number {
    let result = 0;
    const lastReadDate = new Date(lastRead);

    for (let index = messages.length - 1; index >= 0; index--) {
        const message = messages[index];

        if (!message.isUserMessage) {
            if (lastReadDate >= new Date(message.createdAt)) {
                return result;
            }
            result++;
        }
    }

    return result;
}

const ChatItem: React.FC<Props> = ({ chat, onUpdate, onDelete }) => {

    const { setChats } = useChats()
    const { setSelectedChat } = useSelectedChat();
    const [notificationCount, setNotificationCount] = useState(0)



    useEffect(() => {
        setNotificationCount(countUnreadMessages(chat.messages, chat.lastRead));
    }, [chat])

    const handleChatSelected = async (chat: Chat) => {
        const newDate = new Date();
        await ChatService.updateChatLastRead(chat.id, newDate);

        setChats((prevChats) => prevChats.map(prevChat => {
            if (prevChat.id === chat.id) {
                return { ...prevChat, lastRead: newDate };
            }
            return prevChat;
        }));

        setSelectedChat({ ...chat, lastRead: newDate });
    };


    return (
        <div
            key={chat.id}
            className="chat-item"
            onClick={() => handleChatSelected(chat)}
        >
            <UserAvatar />
            <div className="chat-info">
                <h3>{chat.firstName} {chat.lastName}</h3>
                <p>
                    {chat.messages.length > 0 && chat.messages[chat.messages.length - 1].text.substring(0, 30)}
                    {chat.messages.length > 0 && chat.messages[chat.messages.length - 1].text.length > 30 ? "..." : ""}
                </p>

                <div style={{ display: "flex", gap: 5 }}>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        onUpdate(chat);
                    }}
                        className='default-btn'>Update</button>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        onDelete(chat.id);
                    }} className='red-btn'>Remove</button>
                </div>
            </div>
            {
                notificationCount !== 0 &&
                <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
                    <div className='notification'>{notificationCount}</div>
                </div>
            }

            {chat.messages.length > 0 &&
                <span className="last-message-date">{new Date(chat.messages[chat.messages.length - 1].createdAt).toLocaleString()}</span>
            }

        </div>
    );
};

export default ChatItem;
