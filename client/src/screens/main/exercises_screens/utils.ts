import { Exercise } from "../../../redux/types/exercise.types";


const get_sections = (list: Array<Exercise>) => {
  return Object.values(
    list.reduce((acc, obj) => {
      const firstLet = obj.name[0].toUpperCase();
      if (!acc[firstLet]) {
        acc[firstLet] = { title: firstLet, data: [obj] };
      } else {
        acc[firstLet].data.push(obj);
      }
      return acc;
    }, {} as { [letter: string]: { title: string; data: Array<Exercise> } })
  );
};


const flattenExercises = (exercisesObj: {[id: number]: Exercise}): Exercise[] => {
  const list: Exercise[] = []; 
  for (const exercise of Object.values(exercisesObj)){
    if (exercise.canDelete){
      list.push(exercise);
    }
  }
  return list;
} 

export {get_sections, flattenExercises}