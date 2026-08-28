import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { LayoutList, Search, Settings, LogOut, Sun, Moon, Sparkles, Check } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutList },
  { label: "Catalog", path: "/catalog", icon: Search },
  { label: "Admin", path: "/admin", icon: Settings },
];

function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Create your first task", desc: "Type what needs to be done, pick a category, and hit enter." },
    { title: "Manage your workflow", desc: "Check off tasks as you complete them. Edit or delete by hovering." },
    { title: "Browse the catalog", desc: "Search and filter across all your tasks from the Catalog page." },
    { title: "Admin controls", desc: "View task stats and manage everything from the Admin page." },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-4 bg-card border border-border shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">Getting started</span>
          </div>
          <button onClick={onDone} className="text-xs text-muted-foreground hover:text-foreground">Skip</button>
        </div>
        <div className="flex gap-1.5 mb-2">
          {steps.map((_, i) => <div key={i} className={`h-0.5 flex-1 transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />)}
        </div>
        <p className="text-[10px] text-muted-foreground mb-4">Step {step + 1} of {steps.length}</p>
        <h2 className="text-base font-medium mb-2">{steps[step].title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{steps[step].desc}</p>
        <div className="flex items-center justify-between">
          <button onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0} className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30">Back</button>
          <div className="flex gap-3">
            <button onClick={onDone} className="text-sm text-muted-foreground hover:text-foreground">Skip</button>
            <button onClick={() => step === 3 ? onDone() : setStep(step + 1)} className="bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90">{step === 3 ? "Get started" : "Next"}</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const [showTutorial, setShowTutorial] = useState(() => !localStorage.getItem("tutorialDone"));
  const done = () => { localStorage.setItem("tutorialDone", "true"); setShowTutorial(false); };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-56 shrink-0 border-r border-border flex flex-col">
        <div className="px-6 py-6">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Minimal To-Do</span>
        </div>
        <nav className="flex-1 px-3">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button key={item.path} onClick={() => navigate(item.path)} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-200 mb-0.5 ${active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}>
                <item.icon className="size-4" />
                {item.label}
                {active && <motion.div layoutId="nav" className="ml-auto size-1.5 rounded-full bg-primary" />}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-border px-4 py-4 space-y-3">
          <button onClick={toggle} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium truncate">Team member</p>
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground p-1"><LogOut className="size-3.5" /></button>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto"><Outlet /></main>
      <AnimatePresence>{showTutorial && <Onboarding onDone={done} />}</AnimatePresence>
    </div>
  );
}