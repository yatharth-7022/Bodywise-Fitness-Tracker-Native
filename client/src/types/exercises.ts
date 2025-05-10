export interface ExerciseCard {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  bodyPart: string;
  createdAt: string;
  updatedAt: string;
}
export interface ExerciseDrawerProps {
  exercise: ExerciseCard;
  onClose: () => void;
  isOpen: boolean;
}
