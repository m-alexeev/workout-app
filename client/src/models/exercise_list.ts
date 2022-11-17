import { exerciseMuscleGroup, exerciseType } from "../types/exercise";
import { Exercise } from "./exercise";

export const exercise_list: Array<Exercise> = new Array(
  // Abs 
  new Exercise("Ab Wheel", "Weighted Bodyweight", "Abs"),
  new Exercise("Bicycle Crunch", "Weighted Bodyweight", "Abs"),
  new Exercise("Cable Crunch", "Machine", "Abs"),
  new Exercise("Cable Twist", "Machine", "Abs"),
  new Exercise("Chair Situps", "Weighted Bodyweight", "Abs"),
  new Exercise("Cross Body Crunch", "Weighted Bodyweight", "Abs"),

  // Arms
  new Exercise("Bench Dip", "Weighted Bodyweight", "Arms"),
  new Exercise("Bench Press - Close Grip", "Barbell", "Arms"),
  new Exercise("Bicep Curl", "Barbell", "Arms"),
  new Exercise("Bicep Curl", "Machine", "Arms"),
  new Exercise("Bicep Curl", "Dumbbell", "Arms"),
  new Exercise("Bicep Curl", "Cable", "Arms"),

  //Back
  new Exercise("Back Extension", "Weighted Bodyweight", "Back"),
  new Exercise("Back Extension", "Machine", "Back"),
  new Exercise("Bent Over One Arm Row", "Dumbbell", "Back"),
  new Exercise("Bent Over Row (Band)", "Weighted Bodyweight", "Back"),
  new Exercise("Bent Over Row", "Barbell", "Back"),
  new Exercise("Bent Over Row", "Dumbbell", "Back"),
  new Exercise("Bent Over Row - Underhand", "Barbell", "Back"),

  // Chest 
  new Exercise("Around the World", "Dumbbell", "Chest"),
  new Exercise("Bench Press", "Barbell", "Chest"),
  new Exercise("Bench Press", "Cable", "Chest"),
  new Exercise("Bench Press", "Dumbbell", "Chest"),
  new Exercise("Bench Press (Smith Machine)", "Other", "Chest"),
  new Exercise("Bench Press - Wide Grip", "Barbell", "Chest"),
  new Exercise("Cable Crossover", "Cable", "Chest"),

  //Lets
  new Exercise("Box Jump", "Weighted Bodyweight", "Legs"),
  new Exercise("Box Squat", "Barbell", "Legs"),
  new Exercise("Bulgarian Split Squat", "Dumbbell", "Legs"),
  new Exercise("Cable Pull Through", "Cable", "Legs"),
  new Exercise("Calf Press on Leg Press", "Machine", "Legs"),
  new Exercise("Calf Press on Seated Leg Press", "Machine", "Legs"),
)


export const exercise_types: Array<exerciseType> = [
  "Barbell",
  "Dumbbell",
  "Machine",
  "Cable",
  'Cardio',
  "Other",
  "Assisted Bodyweight",
  "Weighted Bodyweight",
];

export const exercise_muscle_groups: Array<exerciseMuscleGroup> = [
  "Abs",
  "Arms",
  "Back",
  "Chest",
  "Legs",
  "Shoulders",
  "Full Body",
  "Cardio",
  "Other"
];