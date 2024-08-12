import React from 'react';
import UserAvatar from '../../ui/UserAvatar/UserAvatar';

interface Props {
  avatar?: string;
  name: string;
  surname: string;
}

export default function ChatHeader({ avatar, name, surname }: Props) {
  return (
    <div className="chat-header">
      <UserAvatar src={avatar} alt={`${name} ${surname}`}  />
      <h2>{name} {surname}</h2>
    </div>
  );
}