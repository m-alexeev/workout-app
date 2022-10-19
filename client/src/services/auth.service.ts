import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../redux/types/auth.types';

const API_URL = 'http://localhost:5000/api/';

class AuthService{
    login(email: string, password: string){
        return axios.post(
            API_URL + "tokens", {email, password}
        )
    }

    logout(){
        AsyncStorage.removeItem('user');
    }

    register(email: string, password: string, first_name: string, last_name: string){
        return axios.post(API_URL + 'users', {
            email, 
            password,
            first_name,
            last_name
        });
    }

    async getCurrentUser(): Promise<User | null>{
        const userStr = await AsyncStorage.getItem('user');
        if (userStr){
            return JSON.parse(userStr);
        }
        return null;
    }
}

export default new AuthService();