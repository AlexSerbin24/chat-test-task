import React, { useState, useEffect } from 'react';
import Modal from '../../../ui/Modal/Modal';
import Chat from '../../../types/chat';
import ChatService from '../../../services/ChatService';
import { useUser } from '../../../hooks/useUser';
import User from '../../../types/user';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    addChat: (chat: Chat) => void;
    chatToEdit?: Chat; 
    updateChat: (chat: Chat) => void; 
}

export default function CreateOrUpdateChatModal({ isOpen, onClose, addChat, chatToEdit, updateChat }: Props) {
    const { user } = useUser();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; other?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Заполняем поля формы, если редактируем существующий чат
    useEffect(() => {
        if (chatToEdit) {
            setFirstName(chatToEdit.firstName);
            setLastName(chatToEdit.lastName);
        } else {
            setFirstName('');
            setLastName('');
        }
    }, [chatToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!firstName) {
            setErrors(prev => ({ ...prev, firstName: 'First name is required' }));
        }

        if (!lastName) {
            setErrors(prev => ({ ...prev, lastName: 'Last name is required' }));
        }

        if (!firstName || !lastName) return;

        try {
            setIsSubmitting(true);
            if (chatToEdit) {
                // Обновляем существующий чат
                const updatedChat = await ChatService.updateChat(chatToEdit.id, firstName, lastName );
                updateChat && updateChat(updatedChat); // Обновляем чат в родительском компоненте
            } else {
                // Создаем новый чат
                const newChat = await ChatService.createChat(firstName, lastName, (user as User).id);
                addChat(newChat);
            }
            onClose();
        } catch (error: any) {
            setErrors({ other: error.message }); // Обработка ошибок (можно расширить)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={chatToEdit ? 'Edit Chat' : 'Create Chat'}>
            <form className='modal-form' onSubmit={handleSubmit}>
                <div>
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    {errors.lastName && <span className='error'>{errors.lastName}</span>}
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <button type="submit">
                    {isSubmitting ? 'Processing...' : chatToEdit ? 'Update Chat' : 'Create Chat'}
                </button>
            </form>
        </Modal>
    );
}
