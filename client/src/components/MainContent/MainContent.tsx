import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import Message from '../../types/message';
import useSelectedChat from '../../hooks/useSelectedChat';


type Props = {
  updateMessage: (updatedMessage: Message) => void
}

export default function MainContent({updateMessage}:Props) {

  const { selectedChat } = useSelectedChat()
  const [editMode, setEditMode] = useState(false);
  const [editMessageId, setEditMessageId] = useState("");
  const [initialMessage, setInitialMessage] = useState("")

  const handleEditMessageBtnClick = (message:Message)=>{
    setEditMode(true);
    setEditMessageId(message.id);
    setInitialMessage(message.text);
  }

  const disableEditMode = ()=>{
    setEditMode(false);
    setEditMessageId("");
    setInitialMessage("");
  }

  useEffect(() => {
    disableEditMode();
  }, [selectedChat])
  


  
  return (
    <div className="main-content">
      {selectedChat !== null &&
        <ChatHeader
          name={selectedChat.firstName}
          surname={selectedChat.lastName}
        />
      }
      <ChatMessages messages={selectedChat ? selectedChat.messages : []} handleEditMessageBtnClick={handleEditMessageBtnClick} />
      {selectedChat !== null &&
        <MessageInput  updateMessage={updateMessage} chatId={selectedChat.id} editMode={editMode} editMessageId={editMessageId} initialMessage={initialMessage} />
      }
    </div>
  );
}