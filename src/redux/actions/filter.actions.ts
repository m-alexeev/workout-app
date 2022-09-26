import { ActionCreator } from "redux";
import { ExerciseFilterType } from "../types/filter.types";
import { UPDATE_FILTER, UpdateFilterAction } from "./filter.actiontypes";

const updateFilter: ActionCreator<UpdateFilterAction> = (filters: ExerciseFilterType ) => {
  return {
    type: UPDATE_FILTER, 
    payload: filters,
  }
}


export {updateFilter};