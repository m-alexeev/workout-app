import { exerciseMuscleGroup, exerciseType } from "../../types/exercise";

export interface Exercise {
  id: number;
  name: string;
  category: exerciseType;
  body_part: exerciseMuscleGroup;
  canDelete: boolean,
}

export interface ExerciseState {
  status: "idle" | 'loading' | "succeeded" | "error",
  exercises: Exercise[];
  error: string,
  need_update: boolean;
}


export const exercise_list: Exercise[] = [
  // Abs
  {id: 1, name: "Ab Wheel", category: "Weighted Bodyweight", body_part: "Abs", canDelete: false},
  {id: 2, name: "Bicycle Crunch", category: "Weighted Bodyweight", body_part: "Abs", canDelete: false},
  {id: 3, name: "Cable Crunch", category: "Machine", body_part: "Abs", canDelete: false},
  {id: 4, name: "Cable Twist", category: "Machine", body_part: "Abs", canDelete: false},
  {id: 5, name: "Chair Situps", category: "Weighted Bodyweight", body_part: "Abs", canDelete: false},
  {id: 6, name: "Cross Body Crunch", category: "Weighted Bodyweight", body_part: "Abs", canDelete: false},
  
  // Arms
  {id: 7, name: "Bench Dip", category: "Weighted Bodyweight", body_part: "Arms", canDelete: false},
  {id: 8, name: "Bench Press - Close Grip", category: "Weighted Bodyweight", body_part: "Arms", canDelete: false},
  {id: 9, name: "Bicep Curl", category: "Barbell", body_part: "Arms", canDelete: false},
  {id: 10, name: "Bicep Curl", category: "Machine", body_part: "Arms", canDelete: false},
  {id: 11, name: "Bicep Curl", category: "Dumbbell", body_part: "Arms", canDelete: false},
  {id: 12, name: "Bicep Curl", category: "Cable", body_part: "Arms", canDelete: false},
  
  //Back
  {id: 13, name: "Back Extension", category: "Weighted Bodyweight", body_part: "Back", canDelete: false},
  {id: 14, name: "Back Extension", category: "Machine", body_part: "Back", canDelete: false},
  {id: 15, name: "Bent Over One Arm Row", category: "Dumbbell", body_part: "Back", canDelete: false},
  {id: 16, name: "Bent Over Row (Band)", category: "Weighted Bodyweight", body_part: "Back", canDelete: false},
  {id: 17, name: "Bent Over Row", category: "Barbell", body_part: "Back", canDelete: false},
  {id: 18, name: "Bent Over Row", category: "Dumbbell", body_part: "Back", canDelete: false},
  {id: 19, name: "Bent Over Row - Underhand", category: "Barbell", body_part: "Back", canDelete: false},

  // Chest   
  {id: 20, name: "Around the World", category: "Dumbbell", body_part: "Chest", canDelete: false},
  {id: 21, name: "Bench Press", category: "Barbell", body_part: "Chest", canDelete: false},
  {id: 22, name: "Bench Press", category: "Cable", body_part: "Chest", canDelete: false},
  {id: 23, name: "Bench Press", category: "Dumbbell", body_part: "Chest", canDelete: false},
  {id: 24, name: "Bench Press (Smith Machine)", category: "Other", body_part: "Chest", canDelete: false},
  {id: 25, name: "Bench Press - Wide Grip", category: "Barbell", body_part: "Chest", canDelete: false},
  {id: 26, name: "Cable Crossover", category: "Cable", body_part: "Chest", canDelete: false},

  {id: 27, name: "Box Jump", category: "Weighted Bodyweight", body_part: "Legs", canDelete: false},
  {id: 27, name: "Box Squat", category: "Barbell", body_part: "Legs", canDelete: false},
  {id: 27, name: "Bulgarian Split Squat", category: "Dumbbell", body_part: "Legs", canDelete: false},
  {id: 27, name: "Cable Pull Through", category: "Cable", body_part: "Legs", canDelete: false},
  {id: 27, name: "Calf Press on Leg Press", category: "Machine", body_part: "Legs", canDelete: false},
  {id: 27, name: "Calf Press on Seated Leg Press", category: "Machine", body_part: "Legs", canDelete: false},

]
