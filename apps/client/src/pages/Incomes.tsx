import React, {useState, useEffect} from "react";
import {Input} from "../components/ui/Input";
import {Alert, type AlertType} from "../components/ui/Alert";
import Spinner from "../components/ui/Spinner";
import {api} from "../api/base";
import type {Income} from "../types/income.ts";
import {Link} from "react-router-dom";
import {Edit, Plus, Trash2} from "lucide-react";

const Incomes: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const theads = ["Date", "Source", "Description", "Amount", "Actions"];
  const [alert, setAlert] = useState<{ title: string; content: string; type: AlertType } | null>(
    null
  );

  const fetchIncomes = async () => {
    setLoading(true);
    setError(null);
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const startDate = new Date(year, month, 1).toISOString().split("T")[0];
      const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

      const res = await api.get("../incomes", {
        params: {startDate, endDate},
        withCredentials: true,
      });
      setIncomes(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch incomes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const filteredIncomes = incomes.filter(
    (income) =>
      income.source.toLowerCase().includes(search.toLowerCase()) ||
      (income.description && income.description.toLowerCase().includes(search.toLowerCase()))
  );

  const deleteIncome = async (id: string) => {
    try {
      const response = await api.delete(`../incomes/${id}`, { withCredentials: true });

      if (response.status === 200) {
        setIncomes(incomes.filter((income) => income.id !== id));

        setAlert({
          title: "Success",
          content: "Income deleted successfully!",
          type: "success",
        });

      }
    } catch (e) {
      console.error("Error deleting income:", e);

      setAlert({
        title: "Error",
        content: "Failed to delete income",
        type: "error",
      });
    }
  };


  return (
    <div className="p-4 max-w-7xl mx-auto">
      {alert && <Alert title={alert.title} content={alert.content} type={alert.type}/>}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">Incomes</h2>
        <Link to="/incomes/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none">
          <Plus /> Add Income
        </Link>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search by source or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <Spinner/>}
      {error && <Alert title="Error" type="error" content={error}/>}

      {!loading && !error && (
        <div className="max-h-[470px] overflow-auto rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200 overflow-y-visible">
            <thead className="bg-gray-100 sticky top-0">
            <tr>
              {theads.map((thead) => (
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700" key={thead}>
                  {thead}
                </th>
              ))}
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            {filteredIncomes.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                  No incomes found
                </td>
              </tr>
            )}
            {filteredIncomes.map((income) => (
              <tr key={income.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2">
                  {income.date ? new Date(income.date).toLocaleDateString() : "-"}
                </td>
                <td className="px-4 py-2">{income.source}</td>
                <td className="px-4 py-2">{income.description || "-"}</td>
                <td className="px-4 py-2">{income.amount.toLocaleString()}</td>
                <td className="flex gap-2 px-4 py-2">
                  <Link
                    className="inline-flex items-center cursor-pointer rounded-full p-2 text-blue-600 hover:bg-gray-50 hover:text-blue-800"
                    title="Edit"
                    to={`/incomes/new?edit=${income.id}`}
                  >
                    <Edit size={16}/>
                  </Link>
                  <button
                    className="inline-flex items-center cursor-pointer rounded-full p-2 text-red-600 hover:bg-red-50 hover:text-red-800"
                    title="Delete"
                    onClick={() => deleteIncome(income.id)}
                  >
                    <Trash2 size={16}/>
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Incomes;
