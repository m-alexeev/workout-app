import axios from "axios";
import { Exercise } from "../redux/types/exercise.types";
import authHeader from "./auth-header";

const API_URL = "http://192.168.0.16:5000/exercises";

class ExerciseService {
  getAllExercises() {
    return axios.get(API_URL);
  }
  async getUserExercises() {
    return axios.get(API_URL, { headers: await authHeader() });
  }

  async createUserExercise(exercise: Exercise) {
    return axios.post(API_URL, { exercise }, { headers: await authHeader() });
  }
}

export default new ExerciseService();
