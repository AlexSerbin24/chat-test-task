import User from "../user";

export default interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
  }