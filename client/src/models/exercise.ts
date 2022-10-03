import { exerciseMuscleGroup, exerciseType } from "../types/exercise";

export class Exercise {
  private _name: string;
  private _type: exerciseType;
  private _muscleGroup: exerciseMuscleGroup;

  public constructor(name: string, type: exerciseType, muscleGroup: exerciseMuscleGroup){
    this._name = name;
    this._type = type;
    this._muscleGroup = muscleGroup;
  }

  public getName(): string {
    return this._name;
  }  

  public setName(name: string): void {
    this._name = name;
  }

  public getType(): exerciseType {
    return this._type;
  }

  public setType(type: exerciseType): void { 
    this._type = type;
  }

  public getMuscleGroup(): exerciseMuscleGroup {
    return this._muscleGroup;
  }

  public setMuscleGroup(muscleGroup: exerciseMuscleGroup): void {
    this._muscleGroup = muscleGroup
  }

}
