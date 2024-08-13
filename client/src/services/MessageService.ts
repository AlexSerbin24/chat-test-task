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
            console.log(error.response.data.message)
            throw new Error(error.response.data.message);

        }
    }
}

export default MessageService;