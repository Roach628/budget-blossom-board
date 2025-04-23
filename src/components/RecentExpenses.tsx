
import { Card } from "@/components/ui/card";
import { Expense } from "@/types";

interface Props {
  expenses: Expense[];
}

const RecentExpenses = ({ expenses }: Props) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Recent Expenses</h3>
      <Card className="p-4">
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center">No recent expenses</p>
        ) : (
          <div className="space-y-4">
            {expenses.slice(0, 5).map((expense) => (
              <div
                key={expense.id}
                className="flex justify-between items-center py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{expense.name}</p>
                  <p className="text-sm text-gray-600">
                    {expense.budgetCategory}
                  </p>
                </div>
                <span className="text-red-500">
                  -${expense.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default RecentExpenses;
