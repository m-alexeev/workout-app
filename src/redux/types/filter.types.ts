
export interface ExerciseType {
  name: string 
  toggled?: boolean
};

export interface ExerciseMuscleGroup {
  name: string
  toggled?: boolean
};

export interface Exercise { 
  name: string 
  type: ExerciseType
  muscleGroup: ExerciseMuscleGroup
}

export type ExerciseFilterType = ExerciseMuscleGroup[] | ExerciseType []

export interface ExerciseState { 
  exerciseFilters: ExerciseFilterType;
}