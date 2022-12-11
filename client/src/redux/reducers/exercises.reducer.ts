import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import { ExerciseState, exercise_list } from "../types/exercise.types";
import { fetchExercises } from "../../services/exercise.service";

const initialExerciseState = {
  exercises: exercise_list,
  status: "idle",
  error: "",
} as ExerciseState;

const exerciseSlice = createSlice({
  name: "exercise",
  initialState: initialExerciseState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ExerciseState>) => {
    builder.addCase(fetchExercises.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchExercises.fulfilled, (state) => {
      state.status = 'succeeded';
      state.exercises = exercise_list;
      state.error = '';
    })
    .addCase(fetchExercises.rejected, (state, action) => {
      state.status = 'error';
      state.exercises = exercise_list;
      state.error = action.error.message || "";
    })
  },
})


export default exerciseSlice.reducer;
