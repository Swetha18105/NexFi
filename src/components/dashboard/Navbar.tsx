import { Moon, Sun, Sparkles, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";
import { useRole } from "@/contexts/RoleContext";

const Navbar = () => {
  const { isDark, toggle } = useTheme();
  const { role, setRole, isAdmin } = useRole();

  return (
    <header className="sticky top-0 z-50 border-b glass-strong">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="NexFi logo"
            className="h-9 w-9 rounded-xl border border-primary/25 object-cover"
          />
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-[hsl(280_68%_60%)] bg-clip-text text-transparent">
            NexFi
          </h1>
          <Badge
            variant={isAdmin ? "default" : "secondary"}
            className={`ml-2 gap-1 transition-all duration-300 ${
              isAdmin
                ? "bg-primary/15 text-primary border-primary/30 hover:bg-primary/25"
                : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
            }`}
          >
            {isAdmin ? <Shield className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {isAdmin ? "Full Access" : "Read Only"}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl border bg-muted/50 p-1 text-sm backdrop-blur-sm">
            <button
              onClick={() => setRole("viewer")}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${role === "viewer" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Viewer
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${role === "admin" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Admin
            </button>
          </div>
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme" className="rounded-xl">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
