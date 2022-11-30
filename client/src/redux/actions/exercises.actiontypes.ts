import { Exercise } from "../types/exercise.types";

export const EXERCISE_FETCH = "EXERCISE_FETCH";
export const EXERCISE_FETCH_FAIL = "EXERCISE_FETCH_FAIL";

export interface ExercisePayloadAction {
  type: typeof EXERCISE_FETCH | typeof EXERCISE_FETCH_FAIL;
  payload: Exercise[];
}

export type ExerciseActionType = ExercisePayloadAction;
