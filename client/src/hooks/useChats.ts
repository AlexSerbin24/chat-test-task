import { useContext } from 'react';
import { ChatsContext } from '../components/contexts/chatsContext';

const useChats = () => {
  const context = useContext(ChatsContext);
  if (!context) {
    throw new Error('Must be used in ChatProvider');
  }
  return context;
};


export default useChats;