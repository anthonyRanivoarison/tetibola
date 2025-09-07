export interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string | null;
  reccuring: boolean;
  receipt?: string;
  startDate?: string;
  endDate?: string;
  user_id: string;
}

export interface ExpenseFormData {
  amount: string;
  date?: string | null;
  category: string;
  description: string;
  type: "One-time" | "Recurring";
  receipt?: File | null;
  start_date?: string;
  end_date?: string;
}