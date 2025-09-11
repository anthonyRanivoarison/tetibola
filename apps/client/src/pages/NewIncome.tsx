import React, {useState, useEffect, type ChangeEvent, type FormEvent} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "../components/ui/Button";
import {Input} from "../components/ui/Input";
import {Alert} from "../components/ui/Alert";
import Spinner from "../components/ui/Spinner";
import {api} from "../api/base.ts";
import {useFetch} from "../hooks/api";
import type {IncomeFormData} from "../types/income.ts";

const NewIncome: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const incomeID = new URLSearchParams(location.search).get("edit");

  const [form, setForm] = useState<IncomeFormData>({
    amount: "",
    date: "",
    source: "",
    description: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const {data: incomeData, error, isLoading} = useFetch({
    url: incomeID ? `../incomes/${incomeID}` : "../incomes",
    method: "GET",
    keys: ["income"],
    enable: !!incomeID,
  });

  useEffect(() => {
    if (incomeData) {
      setForm({
        amount: incomeData[0].amount,
        date: incomeData[0].date?.split("T")[0] || "",
        source: incomeData[0].source || "",
        description: incomeData[0].description || "",
      });
    }
  }, [incomeData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const endpoint = incomeID ? `../incomes/${incomeID}` : "../incomes";
      const method = incomeID ? api.put : api.post;

      await method(endpoint, {...form}, {withCredentials: true});

      setStatus("idle");
      navigate("/incomes", {replace: true});
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Failed to save income");
    }
  };

  if (isLoading) return <Spinner/>;
  if (error) return <Alert title="Error" type="error" content="Error loading income"/>;

  return (
    <div className="max-w-3xl mx-auto p-4  rounded-lg">
      {status === "error" && message && <Alert title="Error" type="error" content={message}/>}
      <h2 className="text-2xl font-bold mb-4">{incomeID ? "Edit Income" : "Add Income"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Amount"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <Input
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <Input
          label="Source"
          name="source"
          type="text"
          value={form.source}
          onChange={handleChange}
          required
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Description (optional)</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Saving..." : incomeID ? "Update Income" : "Add Income"}
        </Button>
      </form>
    </div>
  );
};

export default NewIncome;