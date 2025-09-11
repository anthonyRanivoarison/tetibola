import {useEffect, useState} from "react";
import PieChart from "../components/ui/PieChart";
import BarChart from "../components/ui/BarChart";
import type {Summary} from "../types/summary.ts";
import Spinner from "../components/ui/Spinner.tsx";

const Dashboard = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const [summary, setSummary] = useState<Summary>(null);
  const [month, setMonth] = useState("2025-09");

  useEffect(() => {
    fetch(`http://localhost:8080/summary/monthly?month=${month}`, {credentials: "include"})
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch(e => console.error(e));
  }, [month]);

  if (!summary) return <Spinner/>;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Incomes</h3>
          <p className="text-2xl font-bold">{summary.totalMonthlyIncome} Ar</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Expenses</h3>
          <p className="text-2xl font-bold">{summary.totalExpenses} Ar</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Difference</h3>
          <p className="text-2xl font-bold">{summary.differences} Ar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChart expenses={summary.regularExpenses}/>
        <BarChart
          expenses={summary.regularExpenses}
          incomes={summary.monthlyIncomes}
        />
      </div>

      <div className="flex gap-4 items-center">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded p-2"
        />
      </div>
    </div>
  );
};

export default Dashboard;