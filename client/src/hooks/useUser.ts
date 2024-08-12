import { useContext } from "react";
import { UserContext } from "../components/contexts/userContext";

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('Must be in UserProvider');
    }
    return context;
  };