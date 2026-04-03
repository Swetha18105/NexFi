

# Finance Dashboard Web App

## Overview
A clean, modern finance dashboard with summary cards, charts, transactions management, role-based UI, and insights — all powered by mock data and localStorage persistence.

## Pages & Layout
- **Single-page app** with a top navbar (app title, role switcher, dark mode toggle) and tabbed content sections: Dashboard, Transactions, Insights

## 1. Dashboard Tab
- **Summary Cards**: Total Balance, Total Income, Total Expenses — with icons and color-coded styling
- **Balance Trend Chart** (Recharts AreaChart): monthly balance over time
- **Spending Breakdown Chart** (Recharts PieChart): expenses grouped by category (Food, Transport, Entertainment, Bills, Shopping, Health, Other)

## 2. Transactions Tab
- **Search bar** to filter by description/category
- **Filter buttons**: All / Income / Expense
- **Sort dropdown**: by Date (newest/oldest) or Amount (high/low)
- **Transactions table** showing Date, Description, Category, Amount, Type
- **Admin controls**: Add Transaction button (opens dialog form), Edit/Delete buttons per row (only visible in Admin role)
- **Empty state** UI when no transactions match filters

## 3. Insights Tab
- **Highest spending category** card
- **Monthly expense comparison** bar chart (current vs previous month)
- **Quick insights**: average transaction size, income-to-expense ratio, number of transactions this month

## 4. Role-Based UI
- **Role switcher** in the navbar (toggle between Viewer/Admin)
- Managed via React Context
- Viewer: read-only, no add/edit/delete buttons shown
- Admin: full CRUD on transactions

## 5. State Management
- **TransactionContext**: holds transactions array, CRUD functions, persists to localStorage
- **FilterContext**: search query, type filter, sort option
- **RoleContext**: current role (viewer/admin)

## 6. UI/UX Details
- Tailwind CSS with dark mode (class-based toggle, preference saved to localStorage)
- Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop for cards)
- Smooth hover/transition effects on cards and buttons
- Recharts for all charts (already available or easily added)

## 7. Components Structure
- `DashboardLayout` — navbar + content area
- `SummaryCard` — reusable stat card
- `TransactionTable` — table with search/filter/sort
- `TransactionForm` — dialog for add/edit
- `BalanceTrendChart`, `SpendingBreakdownChart`, `MonthlyComparisonChart`
- `InsightsPanel` — insights cards
- `RoleSwitcher`, `DarkModeToggle`

## Mock Data
- ~20 sample transactions across multiple categories and months for meaningful charts and insights

