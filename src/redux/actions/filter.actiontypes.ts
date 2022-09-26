import { ExerciseFilterType } from "../types/filter.types";

export const UPDATE_FILTER = "UPDATE_FILTER";
export const CLEAR_FILTER = "CLEAR_FILTER"


export interface UpdateFilterAction { 
  type: typeof UPDATE_FILTER 
  payload: ExerciseFilterType
}


export interface ClearFilterAction { 
  type: typeof CLEAR_FILTER 
  payload: ExerciseFilterType
}

export type FilterActionTypes =  UpdateFilterAction | ClearFilterAction;
