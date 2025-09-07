import {api} from "../api/base";

export interface MonthlySummary {
  monthlyIncomes: never[];
  totalMonthlyIncome: number;
  recurringExpenses: never[];
  regularExpenses: never[];
  sumRecurringExpenses: number;
  sumRegularExpenses: number;
  totalExpenses: number;
  differences: number;
}

export interface AlertMessage {
  Message: string;
}

export interface CustomRangeSummary {
  incomesQueried: never[];
  expensesQueried: never[];
}

export const getMonthlySummary = async (month: string): Promise<MonthlySummary> => {
  const response = await api.get(`../summary/monthly?month=${month}`, {
    withCredentials: true,
  });
  return response.data;
};

export const getAlert = async (): Promise<AlertMessage> => {
  const response = await api.get("../summary/alert", {withCredentials: true});
  return response.data;
};

export const getCustomRangeSummary = async (
  startDate: string,
  endDate: string
): Promise<CustomRangeSummary> => {
  const response = await api.get(
    `../summary/custom-range?startDate=${startDate}&endDate=${endDate}`,
    {withCredentials: true}
  );
  return response.data;
};
