 export interface Goal {
  id: string;
  targetAmount: number;
  currentAmount: number;
  userId: string;
  createdAt: string;
}

export interface GoalsResponse {
  data: Goal[];
}
