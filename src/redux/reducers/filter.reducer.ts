import { FilterActionTypes, UPDATE_FILTER, CLEAR_FILTER } from "../actions/filter.actiontypes";
import { ExerciseState } from "../types/filter.types";

const initialFilterState: ExerciseState = {
  exerciseFilters : []
};

export function filterReducer(state: ExerciseState = initialFilterState, action : FilterActionTypes): ExerciseState {
  switch(action.type){
    case UPDATE_FILTER: {
      return {
        ...state, 
        exerciseFilters: action.payload
      };
    }
    case CLEAR_FILTER: {
      return {
        ...state, 
        exerciseFilters: []
      }
    }
    default: {
      return state;
    }

  }
}