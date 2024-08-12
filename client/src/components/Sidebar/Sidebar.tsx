import React, { useEffect, useState } from 'react'
import UserProfile from './UserProfile/UserProfile'
import ChatList from './ChatList/ChatList'
import Chat from '../../types/chat'
import CreateOrUpdateChatModal from '../Modals/ChatModals/CreateOrUpdateChatModal'
import DeleteChatModal from '../Modals/ChatModals/DeleteChatModal'
import useChats from '../../hooks/useChats'
import Message from '../../types/message'


type Props = {
    openLoginModal: () => void,
    openRegiserModal: () => void,
}
export default function Sidebar({ openLoginModal, openRegiserModal }: Props) {
    const [isCreateOrUpdateChatModalOpen, setIsCreateOrUpdateChatModalOpen] = useState(false)
    const [isDeleteChatModalOpen, setIsDeleteChatModalOpen] = useState(false)

    const [chatToEdit, setChatToEdit] = useState<Chat | undefined>();
    const [chatIdToRemove, setChatIdToRemove] = useState<string>("")
    const [chatNameInput, setChatNameInput] = useState('');
    const { chats, setChats } = useChats();
    const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

    const filterChats = (input: string) => {
        if (!input) {
            setFilteredChats(chats);
        } else {
            const lowercasedInput = input.toLowerCase();
            console.log(lowercasedInput)
            const filtered = chats.filter(chat => {

                let chatName = chat.firstName + ' ' + chat.lastName;

                return chatName.toLowerCase().includes(lowercasedInput);
            }
            );
            setFilteredChats(filtered);
        }
    };

    const addChat = (chat: Chat) => {
        setChats((prev) => [...prev, chat]);
    }

    const updateChat = (updatedChat: Chat) => {
        setChats((prevChats) =>
            prevChats.map(chat =>
                chat.id === updatedChat.id ? updatedChat : chat
            )
        );
    };

    const removeChat = (chatId: string) => {
        setChats((prevChats) => prevChats.filter(chat => chat.id !== chatId));
    }



    const handleChatInputChange = (name: string) => {
        setChatNameInput(name);
    };

    const handleCreateChatBtnClick = () => {
        setIsCreateOrUpdateChatModalOpen(true)
    }

    const handleUpdateChatBtnClick = (selectedChat: Chat) => {
        setChatToEdit(selectedChat);
        setIsCreateOrUpdateChatModalOpen(true);
    }


    const handleDeleteChatBtnClick = (chatId: string) => {
        setChatIdToRemove(chatId);
        setIsDeleteChatModalOpen(true);
    }


    useEffect(() => {
        filterChats(chatNameInput);
    }, [chatNameInput, chats]);

    return (
        <div className='sidebar'>
            <CreateOrUpdateChatModal
                isOpen={isCreateOrUpdateChatModalOpen}
                onClose={() => {
                    setIsCreateOrUpdateChatModalOpen(false)
                    setChatToEdit(undefined);

                }}
                addChat={addChat}
                updateChat={updateChat}
                chatToEdit={chatToEdit}
            />

            <DeleteChatModal
                chatIdToRemove={chatIdToRemove}
                removeChat={removeChat}
                isOpen={isDeleteChatModalOpen}
                onClose={() => {
                    setIsDeleteChatModalOpen(false)
                    setChatIdToRemove("");
                }} />



            <UserProfile
                chatNameInput={chatNameInput}
                handleChatInputChange={handleChatInputChange}
                handleCreateChatBtnClick={handleCreateChatBtnClick}
                openLoginModal={openLoginModal}
                openRegiserModal={openRegiserModal} />
            <ChatList
                filteredChats={filteredChats}
                handleUpdateChatBtnClick={handleUpdateChatBtnClick}
                handleDeleteChatBtnClick={handleDeleteChatBtnClick}
            />
        </div>
    )
}

