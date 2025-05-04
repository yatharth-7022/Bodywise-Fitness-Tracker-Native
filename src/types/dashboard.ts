export interface DefaultRoutine {
  description: string;
  id: number;
  imageUrl: string;
  isDefault: boolean;
  name: string;
  userId: number | null;
}
export interface WorkoutCardProps {
  title: string;
  duration: string;
  calories: string;
  image: string;
  description: string;
  id: number;
}
export interface Exercise {
  id: number;
  reps: number;
  sets: number;
  exercise: ExerciseDetails;
}
export interface ExerciseDetails {
  bodyPart: string;
  description: string;
  id: number;
  imageUrl: string;
  name: string;
}
export interface Routine {
  description: string;
  id: number;
  imageUrl: string;
  isDefault: boolean;
  name: string;
  userId: number | null;
  exercises: Exercise[];
}
