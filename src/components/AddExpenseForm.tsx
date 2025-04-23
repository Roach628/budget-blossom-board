
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Budget } from "@/types";

interface Props {
  budgets: Budget[];
  onSubmit: (expense: {
    name: string;
    amount: number;
    budgetCategory: string;
  }) => void;
}

const AddExpenseForm = ({ budgets, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || !category) {
      toast({
        variant: "destructive",
        title: "Please fill in all fields",
      });
      return;
    }

    onSubmit({
      name,
      amount: parseFloat(amount),
      budgetCategory: category,
    });

    setName("");
    setAmount("");
    setCategory("");
    
    toast({
      title: "Expense added successfully",
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Add New Expense</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Expense Name</label>
          <Input
            type="text"
            placeholder="e.g., Coffee"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <Input
            type="number"
            placeholder="e.g., 3.50"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Budget Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a budget" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((budget) => (
                <SelectItem key={budget.id} value={budget.name}>
                  {budget.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full bg-black hover:bg-gray-800">
          Add Expense
        </Button>
      </form>
    </Card>
  );
};

export default AddExpenseForm;
