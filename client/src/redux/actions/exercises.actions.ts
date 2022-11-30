import { Dispatch } from "redux";
import { exercise_list } from "../../models/exercise_list";
import exerciseService from "../../services/exercise.service";
import { Exercise } from "../types/exercise.types";
import { ExerciseActionType, EXERCISE_FETCH } from "./exercises.actiontypes";
import { UpdateMessageAction } from "./messages.actiontypes";

export const getExercises = () => (dispatch: Dispatch<ExerciseActionType>) => {
  return exerciseService.getLocalExercises().then(
    (response) => {

      const mergedExercises: Exercise[] = response.concat(exercise_list);

      dispatch({
        type: EXERCISE_FETCH,
        payload: mergedExercises
      })
    }, (error) => {

    }
  )
}