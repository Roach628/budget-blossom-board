
import { useState } from "react";
import CreateBudgetForm from "@/components/CreateBudgetForm";
import AddExpenseForm from "@/components/AddExpenseForm";
import BudgetList from "@/components/BudgetList";
import RecentExpenses from "@/components/RecentExpenses";
import { Budget, Expense } from "@/types";

const Dashboard = () => {
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: "1",
      name: "Groceries",
      amount: 1200,
      spent: 63.92,
    },
    {
      id: "2",
      name: "Personal",
      amount: 140,
      spent: 65.23,
    },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addBudget = (budget: Omit<Budget, "id" | "spent">) => {
    const newBudget = {
      ...budget,
      id: crypto.randomUUID(),
      spent: 0,
    };
    setBudgets([...budgets, newBudget]);
  };

  const addExpense = (expense: Omit<Expense, "id" | "date">) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
      date: new Date(),
    };
    setExpenses([newExpense, ...expenses]);

    // Update the corresponding budget's spent amount
    setBudgets(
      budgets.map((budget) =>
        budget.name === expense.budgetCategory
          ? { ...budget, spent: budget.spent + expense.amount }
          : budget
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          <h1 className="text-2xl font-semibold text-gray-800">HomeBudget</h1>
        </div>
        <button className="text-red-500 hover:text-red-600 text-sm">
          Delete User
        </button>
      </header>

      <h2 className="text-4xl font-bold mb-8 text-gray-900">
        Welcome back, <span className="text-teal-500">Chris</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CreateBudgetForm onSubmit={addBudget} />
        <AddExpenseForm budgets={budgets} onSubmit={addExpense} />
      </div>

      <BudgetList budgets={budgets} />
      <RecentExpenses expenses={expenses} />
    </div>
  );
};

export default Dashboard;
