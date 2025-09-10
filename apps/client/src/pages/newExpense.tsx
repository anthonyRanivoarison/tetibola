import React, {useState, useEffect, type ChangeEvent, type FormEvent} from "react";
import {useLocation} from "react-router-dom";
import {Button} from "../components/ui/Button";
import {Input} from "../components/ui/Input";
import {Alert} from "../components/ui/Alert";
import Spinner from "../components/ui/Spinner";
import {UploadCloud, FileText} from "lucide-react";
import {api} from "../api/base";
import {useFetch} from "../hooks/api";
import type {ExpenseFormData} from "../types/expenses";

const NewExpense: React.FC = () => {
  const location = useLocation();
  const expenseID = new URLSearchParams(location.search).get("edit");

  const [form, setForm] = useState<ExpenseFormData>({
    amount: "",
    category: "",
    description: "",
    type: "One-time",
    receipt: null,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const {data: expenseData, error, loading} = useFetch({
    url: expenseID ? `../expenses/${expenseID}` : "../expenses",
    method: "GET",
    keys: ["expense"],
    enable: !!expenseID,
  });

  if (loading) return <Spinner />

  useEffect(() => {
    if (expenseData) {
      setForm({
        amount: expenseData.amount.toString(),
        category: expenseData.category || "",
        description: expenseData.description,
        type: expenseData.reccuring ? "Recurring" : "One-time",
        receipt: null,
        start_date: expenseData.start_date?.split("T")[0],
        end_date: expenseData.end_date?.split("T")[0],
        date: expenseData.date?.split("T")[0],
      });
    }
  }, [expenseData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value, files} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => v && formData.append(k, v as any));

      const endpoint = expenseID ? `../expenses/${expenseID}` : "../expenses";
      const method = expenseID ? api.put : api.post;

      await method(endpoint, formData, {
        headers: {"Content-Type": "multipart/form-data"},
        withCredentials: true,
      });

      setForm({amount: "", category: "", description: "", type: "One-time", receipt: null});
      setStatus("idle");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.response?.data?.message || "Failed to save expense");
    }
  };

  if (loading) return <Spinner/>;
  if (error) return <Alert title="Error" type="error" content="Error loading expense"/>;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto p-4 space-y-4 bg-gray-50 rounded-lg">
      {status === "error" && message && <Alert title="Error" type="error" content={message}/>}
      <h2 className="text-2xl font-bold text-gray-800">{expenseID ? "Edit Expense" : "Add Expense"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Amount" name="amount" type="number" value={form.amount} onChange={handleChange} required/>
        <div>
          <label className="text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="One-time">One-time</option>
            <option value="Recurring">Recurring</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {form.type === "Recurring" ? (
          <>
            <Input label="Start Date" name="start_date" type="date" value={form.start_date || ""}
                   onChange={handleChange} required/>
            <Input label="End Date" name="end_date" type="date" value={form.end_date || ""} onChange={handleChange}/>
          </>
        ) : (
          <Input label="Date" name="date" type="date" value={form.date || ""} onChange={handleChange} required/>
        )}
      </div>

      <Input label="Category" name="category" type="text" value={form.category} onChange={handleChange} required/>

      <div>
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div>
        <label className="text-sm font-medium flex items-center">
          <UploadCloud size={16} className="mr-2"/> Upload Receipt
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer">
          <input type="file" name="receipt" onChange={handleChange} accept="application/pdf,image/*" className="hidden"
                 id="receipt-upload"/>
          <label htmlFor="receipt-upload" className="text-gray-500">
            <FileText size={24} className="mx-auto mb-2"/>
            {form.receipt ? (form.receipt as File).name : "Choose or drag & drop (PDF, JPG, PNG)"}
          </label>
        </div>
      </div>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Saving..." : expenseID ? "Update Expense" : "Add Expense"}
      </Button>
    </form>
  );
};

export default NewExpense;
