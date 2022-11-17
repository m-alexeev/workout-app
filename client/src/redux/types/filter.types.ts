
export interface ExerciseType {
  name: string 
};

export interface ExerciseMuscleGroup {
  name: string
};

export interface Exercise { 
  name: string 
  type: ExerciseType
  muscleGroup: ExerciseMuscleGroup
}

export type ExerciseFilterType = ExerciseMuscleGroup[] | ExerciseType []

export interface ExerciseState { 
  exercises: Exercise [],
  exerciseFilters: ExerciseFilterType;
}