import { Exercise } from "../../../redux/types/exercise.types";




const get_sections = (list: Array<Exercise>) => {
  const sections =  Object.values(
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
  
  // Sort the entries Alphabetically by name
  for (const entries of Object.values(sections)){
    entries.data.sort((a,b) => {
      const x = a.name.toUpperCase();
      const y = b.name.toUpperCase();
      return x < y ? - 1 : x > y ? 1 : 0;
    });
  }
  return sections;
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