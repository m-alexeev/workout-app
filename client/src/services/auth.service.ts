import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api/';

class AuthService{
    login(email: string, password: string){
        return axios.post(
            API_URL + "tokens", {email, password}
        ).then((response) => {
            if (response.data.access_token){
                AsyncStorage.setItem('user', JSON.stringify(response.data));
            }
        })
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

    async getCurrentUser(){
        const userStr = await AsyncStorage.getItem('user');
        if (userStr){
            return JSON.parse(userStr);
        }
        return null;
    }
}

export default new AuthService();