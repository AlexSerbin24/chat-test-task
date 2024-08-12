import Chat from "../chat";

export default interface SelectedChatContextType {
    selectedChat: Chat | null;
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  }
  