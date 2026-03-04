export interface Goal {
  id: string;
  targetAmount: number;
  dailyAmount: number;
  currentAmount: number;
  userId: string;
  createdAt: string;
}

export interface GoalData {
  goal: Goal;
  percent: number;
}

export interface GoalResponse {
  success: boolean;
  data: GoalData;
}