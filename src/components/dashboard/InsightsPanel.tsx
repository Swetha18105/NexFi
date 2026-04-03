import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, PieChart as PieIcon } from "lucide-react";
import { useTransactions } from "@/contexts/TransactionContext";

const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

const InsightsPanel = () => {
  const { transactions } = useTransactions();

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const incomes = transactions.filter((t) => t.type === "income");

    const catMap: Record<string, number> = {};
    expenses.forEach((t) => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
    const topCategory = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0];

    const now = new Date();
    const curMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

    const curExpenses = expenses.filter((t) => t.date.startsWith(curMonth)).reduce((s, t) => s + t.amount, 0);
    const prevExpenses = expenses.filter((t) => t.date.startsWith(prevMonth)).reduce((s, t) => s + t.amount, 0);

    const totalIncome = incomes.reduce((s, t) => s + t.amount, 0);
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
    const avgTransaction = transactions.length ? (totalIncome + totalExpense) / transactions.length : 0;
    const ratio = totalExpense > 0 ? totalIncome / totalExpense : 0;
    const thisMonthCount = transactions.filter((t) => t.date.startsWith(curMonth)).length;

    const monthlyData = [
      { month: new Date(prevDate).toLocaleDateString("en-IN", { month: "short" }), expenses: Math.round(prevExpenses) },
      { month: now.toLocaleDateString("en-IN", { month: "short" }), expenses: Math.round(curExpenses) },
    ];

    return { topCategory, monthlyData, avgTransaction, ratio, thisMonthCount, curExpenses, prevExpenses };
  }, [transactions]);

  const expenseChange = insights.prevExpenses > 0
    ? ((insights.curExpenses - insights.prevExpenses) / insights.prevExpenses * 100).toFixed(1)
    : "N/A";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity gradient-danger" />
          <CardContent className="relative flex items-center gap-3 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 transition-transform duration-300 group-hover:scale-110">
              <PieIcon className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Top Spending</p>
              <p className="text-lg font-bold">{insights.topCategory?.[0] || "—"}</p>
              <p className="text-xs text-muted-foreground">{formatINR(insights.topCategory?.[1] || 0)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity gradient-primary" />
          <CardContent className="relative flex items-center gap-3 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-info/10 transition-transform duration-300 group-hover:scale-110">
              <Activity className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Transaction</p>
              <p className="text-lg font-bold">{formatINR(Math.round(insights.avgTransaction))}</p>
              <p className="text-xs text-muted-foreground">{insights.thisMonthCount} this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity gradient-success" />
          <CardContent className="relative flex items-center gap-3 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success/10 transition-transform duration-300 group-hover:scale-110">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Income/Expense</p>
              <p className="text-lg font-bold">{insights.ratio.toFixed(2)}x</p>
              <p className="text-xs text-muted-foreground">ratio</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity gradient-primary" />
          <CardContent className="relative flex items-center gap-3 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/10 transition-transform duration-300 group-hover:scale-110">
              <TrendingDown className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Monthly Change</p>
              <p className="text-lg font-bold">{expenseChange}%</p>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Monthly Expense Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insights.monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }}
                  formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Expenses"]}
                />
                <Bar dataKey="expenses" fill="hsl(0 84% 60%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsPanel;