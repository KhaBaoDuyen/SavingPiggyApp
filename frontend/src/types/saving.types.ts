export interface SavingHistoryItem {
  id: string;
  amount: number;
  goalId: string;
  createdAt: string;
}

export interface SavingHistoryResponse {
  success: boolean;
  data: SavingHistoryItem[];
}