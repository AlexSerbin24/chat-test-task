import React, { useState } from 'react';
import Modal from '../../../ui/Modal/Modal';
import ChatService from '../../../services/ChatService';

interface Props {
    isOpen: boolean;
    chatIdToRemove: string,
    removeChat: (chatId: string) => void
    onClose: () => void;
}

export default function DeleteChatModal({ isOpen, chatIdToRemove, removeChat, onClose }: Props) {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleConfirmBtnClick = async () => {
        try {
            await ChatService.deleteChat(chatIdToRemove);
            removeChat(chatIdToRemove);
            onClose();
        } catch (error: any) {
            setError(error.message);
        }
        finally{
            setIsSubmitting(false);
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
            <div className='modal-confirm'>
                <p style={{fontSize:20, textAlign:"center"}}>Are you sure you want to delete this chat?</p>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    {!isSubmitting ?
                        <>
                            <button className="red-btn" onClick={handleConfirmBtnClick}>Yes</button>
                            <button className="default-btn" onClick={onClose}>No</button>
                        </>
                        :
                        <div>Removing...</div>
                    }
                </div>
            </div>
        </Modal>
    );
}