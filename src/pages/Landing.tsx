import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Search,
  Settings,
  LayoutList,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "@/hooks/use-theme";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

function TaskPreview() {
  const tasks = [
    { text: "Finalize brand guidelines", done: true, cat: "Design" },
    { text: "Set up CI/CD pipeline", done: false, cat: "Engineering" },
    { text: "Draft launch email copy", done: false, cat: "Marketing" },
    { text: "Review Q3 OKRs", done: true, cat: "Planning" },
  ];
  return (
    <div className="border border-border bg-card p-5 shadow-lg shadow-primary/5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary">
          My tasks
        </span>
        <div className="flex gap-3 text-[10px] text-muted-foreground">
          <span><span className="text-primary font-medium">2</span> active</span>
          <span><span className="text-accent font-medium">2</span> done</span>
        </div>
      </div>
      <div className="space-y-0 border-t border-border">
        {tasks.map((t, i) => (
          <div key={i} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
            <div className={`size-4 shrink-0 border flex items-center justify-center ${t.done ? "border-accent bg-accent" : "border-border"}`}>
              {t.done && <Check className="size-2.5 text-white" />}
            </div>
            <span className={`flex-1 text-sm ${t.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
              {t.text}
            </span>
            <span className="text-[9px] text-primary/60 tracking-wide uppercase font-medium">{t.cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="mx-auto max-w-5xl flex items-center justify-between px-6 py-6">
        <span className="text-sm font-bold tracking-[0.15em] uppercase text-primary">Minimal To-Do</span>
        <div className="flex items-center gap-5">
          <button onClick={toggle} className="text-muted-foreground hover:text-primary transition-colors p-1" title="Toggle theme">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button onClick={() => navigate("/auth")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Sign in</button>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5">
              <Sparkles className="size-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide">Internship project</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.15]">
              Your team's tasks,<br /><span className="text-primary">nothing extra.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              A to-do app built for teams that move fast. Add work, check it off, search across everything.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex gap-3 pt-1">
              <button onClick={() => navigate("/auth")} className="group flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity shadow-md shadow-primary/20">
                Get started <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => navigate("/auth")} className="px-6 py-3 text-sm font-medium text-muted-foreground border border-border hover:border-primary/40 hover:text-primary transition-all">
                Try as guest
              </button>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="hidden lg:block relative">
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary/8 rounded-full blur-3xl" />
            <TaskPreview />
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              { icon: LayoutList, title: "Create and own", desc: "Type a task, pick a category, done. Your list updates in real time." },
              { icon: Search, title: "Find anything", desc: "Search the full catalog or filter by category. Every task is one query away." },
              { icon: Settings, title: "Run the show", desc: "Admins manage roles, members, and task stats. One dashboard, full visibility." },
            ].map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.45 }} className="group">
                <span className="flex size-10 items-center justify-center bg-primary/10 mb-4 group-hover:bg-primary/15 transition-colors">
                  <c.icon className="size-5 text-primary" />
                </span>
                <h3 className="text-sm font-semibold mb-1.5">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-lg font-semibold">Ready to try it?</p>
            <p className="text-sm text-muted-foreground mt-1">Sign in and start organizing in under a minute.</p>
          </div>
          <button onClick={() => navigate("/auth")} className="group flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity shadow-md shadow-primary/20">
            Start now <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-6 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">© 2026 Minimal To-Do</span>
          <span className="text-xs text-muted-foreground">Built by Muhammad Maaz</span>
        </div>
      </footer>
    </div>
  );
}