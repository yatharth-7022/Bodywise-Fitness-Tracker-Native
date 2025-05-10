export interface Weight {
  value: number;
  note?: string;
  date?: Date;
}
export interface WeightResponse {
  id: number;
  value: number;
  note?: string;
  date: string;
}
