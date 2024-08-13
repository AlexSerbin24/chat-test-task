import React, { useState, KeyboardEvent, useEffect } from 'react';
import MessageService from '../../services/MessageService';
import Message from '../../types/message';
import { getSocket } from '../../sockets/socket';

interface Props {
  updateMessage: (updatedMessage: Message) => void,
  chatId: string;
  editMode?: boolean;
  editMessageId?: string;
  initialMessage?: string;
}

export default function MessageInput({ updateMessage, chatId, editMode = false, editMessageId, initialMessage = '' }: Props) {

  const [error, setError] = useState("")
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    setMessage(initialMessage);
  }, [initialMessage]);



  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setError('')
      if (!message) return

      if (editMode && editMessageId) {
        try {
          const updatedMessage = await MessageService.updateMessage(message, editMessageId);
          updateMessage(updatedMessage);
          setMessage('');
        } catch (error) {
          setError("Error while updating message")
        }
      } else {
        const socket = getSocket();
        socket.emit("sendMessage", message, chatId)
        setMessage('');
      }

    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
      />
         {error && <p className='error'>{error}</p>}
    </div>
  );
}
