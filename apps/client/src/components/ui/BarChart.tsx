import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import type {Expense} from "../../types/expenses";
import type {Income} from "../../types/income";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ExpenseBarChartProps {
  expenses: Expense[];
  incomes: Income[];
}

const BarChart = ({expenses, incomes}: ExpenseBarChartProps) => {
  const monthlyExpenses: Record<string, number> = {};
  expenses.forEach((exp) => {
    const month = new Date(exp.date).toLocaleString("default", {month: "short"});
    monthlyExpenses[month] = (monthlyExpenses[month] || 0) + exp.amount;
  });

  const monthlyIncomes: Record<string, number> = {};
  incomes.forEach((inc) => {
    const month = new Date(inc.creation_date).toLocaleString("default", {month: "short"});
    monthlyIncomes[month] = (monthlyIncomes[month] || 0) + inc.amount;
  });

  const allMonths = Array.from(new Set([...Object.keys(monthlyExpenses), ...Object.keys(monthlyIncomes)]));

  const data = {
    labels: allMonths,
    datasets: [
      {
        label: "Expenses",
        data: allMonths.map((m) => monthlyExpenses[m] || 0),
        backgroundColor: "rgba(239, 68, 68, 0.7)",
      },
      {
        label: "Incomes",
        data: allMonths.map((m) => monthlyIncomes[m] || 0),
        backgroundColor: "rgba(16, 185, 129, 0.7)",
      },
    ],
  };

  return (
    <div className="w-full max-w-3xl h-96">
      <Bar data={data}
           options={{responsive: true, maintainAspectRatio: false, plugins: {legend: {position: "bottom"}}}}/>
    </div>
  );
};

export default BarChart;
