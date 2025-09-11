import {Edit, Trash2, Search, Plus} from "lucide-react";
import {useFetch} from "../hooks/api.tsx";
import {api} from "../api/base.ts";
import {Link} from "react-router-dom";
import Spinner from "../components/ui/Spinner.tsx";
import type {Expense} from "../types/expenses.ts";
import {useEffect, useState} from "react";
import {Alert, type AlertType} from "../components/ui/Alert.tsx";

const Expenses = () => {
  const theads = ["Date", "Description", "Amount", "Type", "Category", "Actions"];
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState<{ title: string; content: string; type: AlertType } | null>(
    null
  );

  const {data: expenses = [], error, isLoading} = useFetch<Expense[]>({
    method: "GET",
    url: "../expenses",
    keys: ["expenses"],
    enable: true,
  });

  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    if (!expenses) return;

    const filtered = expenses.filter(
      (expense) =>
        expense.description &&
        expense.description.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredExpenses(filtered);
  }, [expenses, search]);

  const deleteExpense = async (id: number) => {
    try {
      const response = await api.delete(`../expenses/${id}`, {withCredentials: true});
      setAlert({
        title: "Success",
        content: "Expense deleted successfully!",
        type: "success",
      });

      setFilteredExpenses((prev) => prev.filter((e) => e.id !== id));
      return response.data;
    } catch (e) {
      console.error("Error deleting expense:", e);
      setAlert({
        title: "Error",
        content: "Failed to delete expense",
        type: "error",
      });
    }
  };


  return (
    <div className="p-6">
      {alert && <Alert title={alert.title} content={alert.content} type={alert.type}/>}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">Expenses</h2>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center mb-8">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm text-gray-800 shadow-sm transition focus:border-blue-500 focus:ring focus:ring-blue-100"
          />
        </div>

        <a
          href="/expenses/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          <Plus size={16}/>
          Add New
        </a>
      </div>

      {isLoading && <Spinner/>}

      {error && <p className="text-center text-red-500 py-4">Error fetching expenses.</p>}

      {!isLoading && !error && (
        <div className="max-h-[470px] overflow-auto rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200 overflow-y-visible">
            <thead className="bg-gray-50 sticky top-0">
            <tr>
              {theads.map((thead, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                >
                  {thead}
                </th>
              ))}
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {expense.reccuring ? (
                    <div className="flex flex-col">
                      <span>{expense.startDate?.split("T")[0]}</span>
                      <span className="text-xs text-gray-500">→ {expense.endDate?.split("T")[0]}</span>
                    </div>
                  ) : (
                    <span>{expense.date?.split("T")[0] || "-"}</span>
                  )}
                </td>


                <td className="px-4 py-2 text-sm text-gray-700">{expense.description}</td>

                <td className="px-4 py-2 text-sm font-bold text-red-500">
                  ${expense.amount}
                </td>

                <td className="px-4 py-2 text-sm text-gray-700">{expense.reccuring ? "Recurring" : "One time"}</td>

                <td className="px-4 py-2 text-sm text-gray-700">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                    {expense.category || "Uncategorized"}
                  </span>
                </td>

                <td className="flex gap-2 px-4 py-2">
                  <Link
                    className="inline-flex items-center cursor-pointer rounded-full p-2 text-blue-600 hover:bg-gray-50 hover:text-blue-800"
                    title="Edit"
                    to={`/expenses/new?edit=${expense.id}`}
                  >
                    <Edit size={16}/>
                  </Link>
                  <button
                    className="inline-flex items-center cursor-pointer rounded-full p-2 text-red-600 hover:bg-red-50 hover:text-red-800"
                    title="Delete"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    <Trash2 size={16}/>
                  </button>
                </td>
              </tr>
            ))}

            {expenses.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No expenses found.
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Expenses;
