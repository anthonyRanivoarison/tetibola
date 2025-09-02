import {useState, useMemo} from "react"
import {Helmet} from "react-helmet-async"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card} from "@/components/ui/card"
import AppLayout from "@/pages/layouts/AppLayout"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Clock,
} from "lucide-react"

type Expense = {
  id: number
  title: string
  description: string
  category: string[]
  amount: number
  date: string
}

type Props = {
  user: { name: string }
  expenses: Expense[]
  onDelete?: (id: number) => void
}

export default function ExpensesPage({user, expenses, onDelete}: Props) {
  const [search, setSearch] = useState("")

  const filteredExpenses = useMemo(() => {
    if (!search) return expenses
    return expenses.filter(
      (e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, expenses])

  const totalAmount = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  )

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
              <BreadcrumbLink href="/expenses">Expenses</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <Helmet>
        <title>Your Expenses</title>
      </Helmet>

      <div className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold text-gray-800">
              {user.name}&apos;s Expenses
            </h1>
            <div className="mx-auto mt-2 h-0.5 w-24 rounded bg-blue-500"></div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search expenses…"
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>
            </div>

            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/expenses/newExpense">
                <Plus className="mr-1 h-4 w-4"/>
                Add New
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-4 text-gray-600">
          <span className="font-medium">Total: </span>
          <span className={totalAmount < 0 ? "text-red-500" : "text-green-600"}>
            ${totalAmount.toFixed(2)}
          </span>
        </div>

        <div className="mt-4">
          {filteredExpenses.length ? (
            <div className="overflow-x-auto rounded-xl shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  {["Title", "Description", "Category", "Amount", "Date", "Actions"].map(
                    (th, i) => (
                      <th
                        key={i}
                        className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                      >
                        {th}
                      </th>
                    )
                  )}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {filteredExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 text-sm">{expense.title}</td>
                    <td className="px-4 py-2 text-sm">{expense.description}</td>
                    <td className="px-4 py-2 text-sm">
                      {expense.category.map((cat, idx) => (
                        <span
                          key={idx}
                          className="mr-1 inline-block rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800"
                        >
                            {cat}
                          </span>
                      ))}
                    </td>
                    <td
                      className={`px-4 py-2 text-sm font-bold ${
                        expense.amount < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {expense.amount < 0 ? "-" : "+"}${Math.abs(expense.amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="flex justify-center gap-2 px-4 py-2">
                      <a
                        href={`/expenses/newExpense?edit=${expense.id}`}
                        className="rounded-full p-2 text-blue-600 hover:bg-gray-50"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4"/>
                      </a>
                      <button
                        onClick={() => onDelete?.(expense.id)}
                        className="rounded-full p-2 text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4"/>
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Card className="mt-8 p-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <Clock className="h-6 w-6 text-gray-400"/>
                <p className="mt-2 text-lg font-semibold text-gray-700">
                  No expenses yet!
                </p>
                <p className="text-sm text-gray-500">
                  Start tracking your spending by adding your first expense.
                </p>
                <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <a href="/expenses/newExpense">Add Expense</a>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
