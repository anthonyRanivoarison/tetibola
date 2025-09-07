import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, Title} from "chart.js";
import type {Expense} from "../../types/expenses";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface ExpensePieChartProps {
  expenses: Expense[];
}

const PieChart = ({expenses}: ExpensePieChartProps) => {
  const categories = expenses.reduce((acc: Record<string, number>, exp) => {
    const cat = exp.category || "Other";
    acc[cat] = (acc[cat] || 0) + exp.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categories),
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(107, 114, 128, 0.7)",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Pie data={data} options={{responsive: true, plugins: {legend: {position: "right"}}}}/>
    </div>
  );
};

export default PieChart;
