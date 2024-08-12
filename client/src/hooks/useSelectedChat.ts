import { useContext } from 'react';
import {SelectedChatContext} from '../components/contexts/selectedChatContext';

const useSelectedChat = () => {
    const context = useContext(SelectedChatContext);
    if (context === undefined) {
        throw new Error('Must be in SelectedChatProvider');
    }
    return context;
};

export default useSelectedChat;
