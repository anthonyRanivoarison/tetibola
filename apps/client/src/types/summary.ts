import type {Income} from "./income.ts";
import type {Expense} from "./expenses.ts";

export type Summary = {
  monthlyIncomes: Income[];
  totalMonthlyIncome: number;

  recurringExpenses: Expense[];
  regularExpenses: Expense[];

  sumRecurringExpenses: number;
  sumRegularExpenses: number;
  totalExpenses: number;
  differences: number;
};