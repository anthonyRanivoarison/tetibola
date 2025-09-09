export type Income = {
  id: string;
  amount: number;
  source: string;
  description?: string;
  date: string;
}

export type IncomeFormData = {
  amount: string;
  date: string;
  source: string;
  description?: string;
};