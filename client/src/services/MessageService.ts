import axios, { AxiosError } from 'axios';
import Message from '../types/message';

const API_URL = 'http://localhost:5000/api/messages';


class MessageService {
    static async updateMessage(newText:string, messageId:string) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put<Message>(`${API_URL}/${messageId}`, { newText}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError;
                console.error('Error updating message:', axiosError.message);
                throw axiosError;
            } else {
                console.error('Unexpected error:', error);
                throw error;
            }

        }
    }
}

export default MessageService;