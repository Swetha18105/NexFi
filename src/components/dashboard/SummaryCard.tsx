import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  className?: string;
  iconClassName?: string;
  gradientClassName?: string;
}

const SummaryCard = ({ title, value, icon: Icon, trend, className = "", iconClassName = "", gradientClassName = "" }: SummaryCardProps) => (
  <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}>
    <div className={`absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity ${gradientClassName || "gradient-primary"}`} />
    <CardContent className="relative flex items-center gap-4 p-6">
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${iconClassName}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        {trend && <p className="text-xs text-muted-foreground mt-0.5">{trend}</p>}
      </div>
    </CardContent>
  </Card>
);

export default SummaryCard;