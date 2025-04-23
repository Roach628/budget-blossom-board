
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  onSubmit: (budget: { name: string; amount: number }) => void;
}

const CreateBudgetForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) {
      toast({
        variant: "destructive",
        title: "Please fill in all fields",
      });
      return;
    }

    onSubmit({
      name,
      amount: parseFloat(amount),
    });

    setName("");
    setAmount("");
    
    toast({
      title: "Budget created successfully",
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Create budget</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Budget Name</label>
          <Input
            type="text"
            placeholder="e.g., Groceries"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <Input
            type="number"
            placeholder="e.g., 350"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full bg-black hover:bg-gray-800">
          Create budget
        </Button>
      </form>
    </Card>
  );
};

export default CreateBudgetForm;
