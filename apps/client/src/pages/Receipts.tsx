import {useEffect, useState} from "react";
import {Download} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Summary = {
  totalMonthlyIncome: number;
  totalExpenses: number;
  differences: number;
  monthlyIncomes: { description: string; amount: number }[];
  regularExpenses: { description: string; amount: number }[];
};

export default function ReceiptPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [month, setMonth] = useState("2025-09");

  useEffect(() => {
    fetch(`http://localhost:8080/summary/monthly?month=${month}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error(err));
  }, [month]);

  const downloadPDF = () => {
    if (!summary) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(`Monthly Report - ${month}`, doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    autoTable(doc, {
      startY: 30,
      theme: "grid",
      head: [["Category", "Amount"]],
      body: [
        ["Total Incomes", `${summary.totalMonthlyIncome} Ar`],
        ["Total Expenses", `${summary.totalExpenses} Ar`],
        ["Difference", `${summary.differences} Ar`],
      ],
      headStyles: { fillColor: [41, 128, 185], textColor: 255, halign: "center" },
      bodyStyles: { halign: "center" },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable?.finalY + 10 || 60,
      head: [["Income Description", "Amount"]],
      body: summary.monthlyIncomes.map((i) => [i.description, `${i.amount} Ar`]),
      headStyles: { fillColor: [39, 174, 96], textColor: 255 },
      bodyStyles: { halign: "left" },
      styles: { cellPadding: 3 },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable?.finalY + 10,
      head: [["Expense Description", "Amount"]],
      body: summary.regularExpenses.map((e) => [e.description, `${e.amount} Ar`]),
      headStyles: { fillColor: [192, 57, 43], textColor: 255 },
      bodyStyles: { halign: "left" },
      styles: { cellPadding: 3 },
    });

    doc.save(`report-${month}.pdf`);
  };


  if (!summary)
    return <p className="p-6 text-gray-500 animate-pulse">Loading...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
        <h1 className="text-2xl font-bold">Report</h1>
        <span className="text-lg font-medium bg-white/20 px-4 py-1 rounded-full">
          {month}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-green-700">Incomes</h3>
          <p className="text-3xl font-bold text-green-800 mt-2">
            {summary.totalMonthlyIncome} Ar
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-red-700">Expenses</h3>
          <p className="text-3xl font-bold text-red-800 mt-2">
            {summary.totalExpenses} Ar
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-blue-700">Difference</h3>
          <p
            className={`text-3xl font-bold mt-2 ${
              summary.differences >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {summary.differences} Ar
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Incomes</h3>
          <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {summary.monthlyIncomes.map((inc, i) => (
              <li
                key={i}
                className="flex justify-between border-b py-2 text-gray-600"
              >
                <span>{inc.description}</span>
                <span className="font-semibold">{inc.amount} Ar</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow p-6 max-h-[30vh]">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Expenses</h3>
          <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {summary.regularExpenses.map((exp, i) => (
              <li
                key={i}
                className="flex justify-between border-b py-2 text-gray-600"
              >
                <span>{exp.description}</span>
                <span className="font-semibold">{exp.amount} Ar</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={downloadPDF}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow"
        >
          <Download size={18}/>
          Download PDF
        </button>
      </div>
    </div>
  );
}
