import React, { useEffect, useState } from 'react';
import UserAvatar from '../../../ui/UserAvatar/UserAvatar';
import { useUser } from '../../../hooks/useUser';
import { getSocket } from '../../../sockets/socket';


type Props = {
    chatNameInput: string,
    handleChatInputChange: (name: string) => void,
    openLoginModal: () => void,
    openRegiserModal: () => void,
    handleCreateChatBtnClick: () => void
}



export default function UserProfile({ chatNameInput, handleChatInputChange, openLoginModal, openRegiserModal, handleCreateChatBtnClick }: Props) {
    const { user } = useUser();
    const [isRandomMessagesActive, setIsRandomMessagesActive] = useState(false);

    useEffect(() => {
        if (isRandomMessagesActive) {
            const interval = setInterval(() => {
                const socket = getSocket();
                socket.emit('sendRandomMessage', user?.id);
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [isRandomMessagesActive]);





    const handleToogleRandomMessagesBtn = () => {
        setIsRandomMessagesActive(prevState => !prevState);
    }


    return (
        <div className="user-profile">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
                <UserAvatar src={''} alt={''} />
                <div className='login-btn-container'>
                    {!user ?
                        <>
                            <button className='default-btn' onClick={() => { openLoginModal() }}>Log in</button>
                            <button className='default-btn' onClick={() => { openRegiserModal() }}>Register</button>
                        </>
                        :
                        <>
                            <button className='default-btn' onClick={handleCreateChatBtnClick}>Add chat</button>
                            <button className={isRandomMessagesActive ? "red-btn" : "default-btn"} onClick={handleToogleRandomMessagesBtn}>
                                {isRandomMessagesActive ? 'Stop random messages' : 'Start random messages'}
                            </button>
                        </>
                    }
                </div>
            </div>
            <div className="search-container">
                <svg id="search-icon" className="search-icon" viewBox="0 0 24 24" width="17" height="17">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
                <input
                    type="text"
                    placeholder={user ? "Search or start new chat" : "Please register to start new chats"}
                    value={chatNameInput}
                    onChange={(e) => handleChatInputChange(e.target.value)}
                    disabled={!user}
                />
            </div>
        </div>
    );
}