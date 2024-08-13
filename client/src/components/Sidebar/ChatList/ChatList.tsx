import React, { useEffect, useState } from 'react';
import Chat from '../../../types/chat';
import { useUser } from '../../../hooks/useUser';
import ChatService from '../../../services/ChatService';
import useChats from '../../../hooks/useChats';
import ChatItem from './ChatItem'; // Импорт нового компонента

type Props = {
  filteredChats: Chat[];
  handleUpdateChatBtnClick: (selectedChat: Chat) => void;
  handleDeleteChatBtnClick: (chatId: string) => void;
};

export default function ChatList({ filteredChats, handleUpdateChatBtnClick, handleDeleteChatBtnClick }: Props) {
  const { chats, setChats } = useChats();
  const [chatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState("")
  const { user } = useUser();

  useEffect(() => {
    if (user) {
        setChatLoading(true);
        ChatService.getUserChats(user.id).then((data) => {
          setChats(data);
          setChatLoading(false);
        }).catch(error=>setError("Error while receiving chats"))

    }
  }, [user]);


  return (
    <div className="chat-list">
      {error === "" ?


        !user
          ?
          <h2>Firstly, you should login or register</h2>
          :
          chatLoading
            ?
            <h2>Please wait while chats are loading</h2>
            :
            chats.length === 0
              ?
              <h2>You haven't had chats yet</h2>
              :
              <>
                <h2>Chats</h2>
                {filteredChats.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    onUpdate={handleUpdateChatBtnClick}
                    onDelete={handleDeleteChatBtnClick}
                  />
                ))}
              </>
        :
        <div>
          <p className='error' style={{textAlign:"center"}}>
            {error}
          </p>
        </div>
      }
    </div>
  );
}
