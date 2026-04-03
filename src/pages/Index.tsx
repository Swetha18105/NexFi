import { useMemo } from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/dashboard/Navbar";
import SummaryCard from "@/components/dashboard/SummaryCard";
import BalanceTrendChart from "@/components/dashboard/BalanceTrendChart";
import SpendingBreakdownChart from "@/components/dashboard/SpendingBreakdownChart";
import TransactionTable from "@/components/dashboard/TransactionTable";
import InsightsPanel from "@/components/dashboard/InsightsPanel";
import { useTransactions } from "@/contexts/TransactionContext";

const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

const Index = () => {
  const { transactions } = useTransactions();

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExpense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
  }, [transactions]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="mb-2">
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <p className="text-sm text-muted-foreground">Track your financial health at a glance</p>
        </div>
        <div className="mt-4 mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            title="Total Balance"
            value={formatINR(balance)}
            icon={Wallet}
            iconClassName="bg-primary/10 text-primary"
            gradientClassName="gradient-primary"
            trend={`${transactions.length} transactions`}
          />
          <SummaryCard
            title="Total Income"
            value={formatINR(totalIncome)}
            icon={TrendingUp}
            iconClassName="bg-success/10 text-success"
            gradientClassName="gradient-success"
          />
          <SummaryCard
            title="Total Expenses"
            value={formatINR(totalExpense)}
            icon={TrendingDown}
            iconClassName="bg-destructive/10 text-destructive"
            gradientClassName="gradient-danger"
          />
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-muted/50 backdrop-blur-sm p-1 rounded-xl">
            <TabsTrigger value="dashboard" className="rounded-lg data-[state=active]:shadow-sm">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions" className="rounded-lg data-[state=active]:shadow-sm">Transactions</TabsTrigger>
            <TabsTrigger value="insights" className="rounded-lg data-[state=active]:shadow-sm">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid gap-5 lg:grid-cols-2">
              <BalanceTrendChart />
              <SpendingBreakdownChart />
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionTable />
          </TabsContent>

          <TabsContent value="insights">
            <InsightsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;