import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://192.168.0.16:5000';

class UserService {
    getAllExercises(){
        return axios.get(API_URL + "exercises")
    }

    async getUserExercises(){
        return axios.get(API_URL + "exercises", {headers: await authHeader()})
    }

}

export default new UserService();