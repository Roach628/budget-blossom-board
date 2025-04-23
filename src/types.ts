
export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  budgetCategory: string;
  date: Date;
}
