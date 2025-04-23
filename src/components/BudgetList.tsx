
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Budget } from "@/types";

interface Props {
  budgets: Budget[];
}

const BudgetList = ({ budgets }: Props) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4">Existing Budgets</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets.map((budget) => {
          const progress = (budget.spent / budget.amount) * 100;
          const remaining = budget.amount - budget.spent;
          
          return (
            <Card key={budget.id} className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-lg">{budget.name}</h4>
                <span className="text-gray-600">
                  ${budget.amount.toFixed(2)} Budgeted
                </span>
              </div>
              <Progress value={progress} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${budget.spent.toFixed(2)} spent</span>
                <span>${remaining.toFixed(2)} remaining</span>
              </div>
              <button className="mt-4 text-sm text-blue-600 hover:text-blue-700">
                View Details
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetList;
