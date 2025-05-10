export interface ExerciseSet {
  isCompleted: boolean;
  reps: number;
  routineExerciseId: number;
  userId: number;
  weight: number;
}

export interface Exercise {
  exercise: {
    name: string;
    bodyPart: string;
    imageUrl?: string;
  };
  routineName?: string;
  exerciseSets?: ExerciseSet[];
}
