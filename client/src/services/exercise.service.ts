import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Exercise } from "../redux/types/exercise.types";
import authHeader from "./auth-header";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { flattenExercises } from "../screens/main/exercises_screens/utils";

const API_URL = "http://192.168.0.16:5000/exercises";

export const fetchExercises = createAsyncThunk(
  "exercise/fetchExercises",
  async () => {
    try {
      const exercises = await AsyncStorage.getItem("exercises");
      if (exercises != null) {
        const parsedExercises = JSON.parse(exercises);
        const exerciseList: Exercise[] = Object.values(parsedExercises);
        return exerciseList;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);


export const createExercise = createAsyncThunk(
  "exercise/createExercise",
  async (exercise: Exercise) => {
    try {
      // Load exercise list and add new exercise to list
      let exercises: { [id: number]: Exercise } = {};
      const savedItems = await AsyncStorage.getItem("exercises");
      if (savedItems != null) {
        exercises = JSON.parse(savedItems);
        exercise.id = Math.max(
          ...Object.keys(exercises).map((value) => parseInt(value))
        ) + 1;
        exercise.canDelete = true;
      } else {
        exercise.id = 1;
      }
      // Overwrite exercise List
      exercises[exercise.id] = exercise;
 
      const stringifiedExercises = JSON.stringify(exercises);
      await AsyncStorage.setItem("exercises", stringifiedExercises);
      
      console.info('Exercise List Overwritten');
      return flattenExercises(exercises);

    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

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

  async createLocalExercise(exercise: Exercise) {
    try {
      let exercises: { [id: number]: Exercise } = {};
      const savedItems = await AsyncStorage.getItem("exercises");
      if (savedItems != null) {
        exercises = JSON.parse(savedItems);
        exercise.id = Math.max(
          ...Object.keys(exercises).map((value) => parseInt(value))
        );
      } else {
        exercise.id = 1;
      }
      exercises[exercise.id] = exercise;
      const stringifiedExercises = JSON.stringify(exercises);
      await AsyncStorage.setItem("exercises", stringifiedExercises);
    } catch (error) {
      return error;
    }
  }

  async getLocalExercises(): Promise<Exercise[]> {
    try {
      const exerciseList: Exercise[] = [];
      const jsonExercises = await AsyncStorage.getItem("exercises");
      if (jsonExercises != null) {
        const parsedExercises = JSON.parse(jsonExercises);
        const exerciseList: Exercise[] = Object.values(parsedExercises);
        return exerciseList;
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

// export default new ExerciseService();
