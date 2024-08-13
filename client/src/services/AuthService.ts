import axios from 'axios';
import { AuthResponse, LoginData, RegisterData } from '../types/userData';



const API_URL = `${process.env.REACT_APP_API_URL}/api/users`;

class AuthService {
    static async login(data: LoginData) {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/login`, data);
            const { token, id } = response.data;
            localStorage.setItem("token", token)
            return { id };
        } catch (error: any) {
            console.log(error.response.data.message)
            throw new Error(error.response.data.message);
        }
    }

    static async register(data: RegisterData) {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/register`, data);
            const { token, id } = response.data;
            localStorage.setItem("token", token)
            return { id };
        } catch (error: any) {
            console.log(error.response.data.message)
            throw new Error(error.response.data.message);
        }
    }

    static async loginWithGoogle(tokenId: string): Promise<any> {
        try {
            const response = await axios.post(`${API_URL}/google`, { token:tokenId });
            const { token, id } = response.data;
            localStorage.setItem("token", token)
            return { id };
        } catch (error:any) {
            console.log(error.response.data.message)
            throw new Error(error.response.data.message);
        }
    }
}

export default AuthService;
