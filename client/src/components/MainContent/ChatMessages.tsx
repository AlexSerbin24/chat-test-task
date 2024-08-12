import React from 'react';
import Message from '../../types/message';
import ChatMessage from './ChatMessage';


interface Props {
  messages: Message[],
  handleEditMessageBtnClick: (message: Message) => void
}

export default function ChatMessages({ messages, handleEditMessageBtnClick }: Props) {
  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <ChatMessage message={message} key={message.id} handleEditMessageBtnClick={handleEditMessageBtnClick} />
      ))}
    </div>
  );
}