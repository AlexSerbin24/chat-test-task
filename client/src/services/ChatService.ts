import axios, { AxiosError } from 'axios';
import Chat from '../types/chat';

const API_URL = `${process.env.REACT_APP_API_URL}/api/chats`;

class ChatService {
    static async getUserChats(userId: string) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get<Chat[]>(`${API_URL}/all/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error: any) {
            console.log(error.response.data.message)
            throw new Error(error.response.data.message);
        }
    }

    static async createChat(firstName: string, lastName: string, userId: string,) {
        try {

            const token = localStorage.getItem("token");
            const chatData = { firstName, lastName, userId };
            const response = await axios.post<Chat>(`${API_URL}/`, chatData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data;
        } catch (error: any) {
            console.log(error.response.data.message)
            throw new Error(error.response.data.message);
        }

    }


    static async updateChat(chatId: string, firstName: string, lastName: string) {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.put(
                `${API_URL}/${chatId}`,
                { firstName, lastName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError;
                console.error('Error updating chat:', axiosError.message);
                throw axiosError;
            } else {
                console.log(error.response.data.message)
                throw new Error(error.response.data.message);
            }
        }
    }

    static async deleteChat(chatId: string) {
        try {
            const token = localStorage.getItem('token');

            await axios.delete(
                `${API_URL}/${chatId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return true;
        } catch (error: any) {
            console.log(error.response.data.message)
            throw new Error(error.response.data.message);
        }
    }

    static async updateChatLastRead(chatId:string, newDate:Date){
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${API_URL}/lastread/${chatId}`, {newDate},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            const {lastRead} = response.data;
            return lastRead;
        } catch (error: any) {
            console.log(error.response.data.message)
            throw new Error(error.response.data.message);
        }
    }
}

export default ChatService;
