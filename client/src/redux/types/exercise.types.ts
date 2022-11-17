import { exerciseMuscleGroup, exerciseType } from "../../types/exercise";

export interface Exercise {
  id?: string;
  name: string;
  category: exerciseType;
  body_part: exerciseMuscleGroup;
}

export interface ExerciseState {
  isLoading: false;
  exercises: Exercise[];
  filter: Exercise[];
}
