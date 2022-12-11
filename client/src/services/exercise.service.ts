import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Exercise } from "../redux/types/exercise.types";
import authHeader from "./auth-header";
import { createAsyncThunk } from "@reduxjs/toolkit";




const API_URL = "http://192.168.0.16:5000/exercises";


export const fetchExercises = createAsyncThunk('exercise/fetchExercises', () => {
    AsyncStorage.getItem("exercises").then((response) => {
      if (response != null){
        const parsedExercises = JSON.parse(response);
        const exerciseList: Exercise[] = Object.values(parsedExercises); 
        return exerciseList;
      }
    }).catch((error) => {
      console.log(error);
      return [];
    });
});


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

  async createLocalExercise(exercise: Exercise){
    try{
      let exercises: {[id: number] : Exercise} = {};
      const savedItems = await AsyncStorage.getItem("exercises");
      if (savedItems != null){
        exercises = JSON.parse(savedItems);
        exercise.id = Math.max(...Object.keys(exercises).map((value)=>parseInt(value)));
      }
      else{
        exercise.id = 1;
      }
      exercises[exercise.id] = exercise;
      const stringifiedExercises = JSON.stringify(exercises);
      await AsyncStorage.setItem("exercises", stringifiedExercises);
    }catch(error){
      return error;
    }
  }

  async getLocalExercises(): Promise<Exercise[]>{
    try{
      const exerciseList: Exercise[] = [];
      const jsonExercises = await AsyncStorage.getItem("exercises");
      if (jsonExercises != null){
        const parsedExercises = JSON.parse(jsonExercises);
        const exerciseList: Exercise[] = Object.values(parsedExercises); 
        return exerciseList;
      }
      return [];
    }catch(error){
      console.log(error);
      return [];
    }
  }
}

// export default new ExerciseService();
