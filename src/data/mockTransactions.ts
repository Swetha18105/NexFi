export type TransactionType = "income" | "expense";
export type Category = "Food" | "Transport" | "Entertainment" | "Bills" | "Shopping" | "Health" | "Salary" | "Freelance" | "Other";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export const EXPENSE_CATEGORIES: Category[] = ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Health", "Other"];
export const INCOME_CATEGORIES: Category[] = ["Salary", "Freelance", "Other"];

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2026-04-01", description: "Monthly Salary", amount: 85000, category: "Salary", type: "income" },
  { id: "2", date: "2026-04-01", description: "Grocery Shopping", amount: 2450, category: "Food", type: "expense" },
  { id: "3", date: "2026-03-30", description: "Electricity Bill", amount: 3200, category: "Bills", type: "expense" },
  { id: "4", date: "2026-03-28", description: "Ola Ride", amount: 380, category: "Transport", type: "expense" },
  { id: "5", date: "2026-03-27", description: "Hotstar Subscription", amount: 299, category: "Entertainment", type: "expense" },
  { id: "6", date: "2026-03-25", description: "Freelance Project", amount: 25000, category: "Freelance", type: "income" },
  { id: "7", date: "2026-03-22", description: "New Sneakers", amount: 4999, category: "Shopping", type: "expense" },
  { id: "8", date: "2026-03-20", description: "Gym Membership", amount: 1500, category: "Health", type: "expense" },
  { id: "9", date: "2026-03-18", description: "Restaurant Dinner", amount: 1850, category: "Food", type: "expense" },
  { id: "10", date: "2026-03-15", description: "Petrol", amount: 2500, category: "Transport", type: "expense" },
  { id: "11", date: "2026-03-12", description: "Internet Bill", amount: 999, category: "Bills", type: "expense" },
  { id: "12", date: "2026-03-10", description: "Movie Tickets", amount: 650, category: "Entertainment", type: "expense" },
  { id: "13", date: "2026-03-08", description: "Myntra Shopping", amount: 3200, category: "Shopping", type: "expense" },
  { id: "14", date: "2026-03-05", description: "Doctor Visit", amount: 1200, category: "Health", type: "expense" },
  { id: "15", date: "2026-03-01", description: "Monthly Salary", amount: 85000, category: "Salary", type: "income" },
  { id: "16", date: "2026-02-28", description: "Chai & Snacks", amount: 350, category: "Food", type: "expense" },
  { id: "17", date: "2026-02-25", description: "Phone Recharge", amount: 799, category: "Bills", type: "expense" },
  { id: "18", date: "2026-02-20", description: "Freelance Work", amount: 18000, category: "Freelance", type: "income" },
  { id: "19", date: "2026-02-15", description: "Book Purchase", amount: 450, category: "Shopping", type: "expense" },
  { id: "20", date: "2026-02-01", description: "Monthly Salary", amount: 85000, category: "Salary", type: "income" },
];