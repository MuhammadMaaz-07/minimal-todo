import { useState } from "react";
import { motion } from "framer-motion";
import { Users, LayoutList, CheckCircle, Trash2 } from "lucide-react";

function loadTasks() {
  try { return JSON.parse(localStorage.getItem("tasks") || "[]"); } catch { return []; }
}

export default function Admin() {
  const [tasks, setTasks] = useState(loadTasks());
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t: any) => t.completed).length;

  const removeTask = (id: string) => {
    const updated = tasks.filter((t: any) => t.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  return (
    <div className="px-8 py-10 max-w-4xl">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-2">Administration</p>
        <h1 className="text-2xl font-light tracking-tight">Team overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor task stats and manage activity.</p>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="border border-border p-5 bg-card">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex size-7 items-center justify-center bg-primary/10"><Users className="size-3.5 text-primary" /></span>
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">Members</span>
          </div>
          <p className="text-2xl font-light text-foreground">1</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="border border-border p-5 bg-card">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex size-7 items-center justify-center bg-primary/10"><LayoutList className="size-3.5 text-primary" /></span>
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">Tasks</span>
          </div>
          <p className="text-2xl font-light text-foreground">{totalTasks}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="border border-border p-5 bg-card">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex size-7 items-center justify-center bg-accent/10"><CheckCircle className="size-3.5 text-accent" /></span>
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">Completed</span>
          </div>
          <p className="text-2xl font-light text-foreground">{completedTasks}</p>
        </motion.div>
      </div>
      {tasks.length > 0 && (
        <section>
          <h2 className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-6">All tasks</h2>
          <div className="border border-border bg-card">
            {tasks.slice(0, 20).map((task: any) => (
              <div key={task.id} className="group flex items-center gap-4 px-5 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <div className={`size-3.5 shrink-0 border flex items-center justify-center ${task.completed ? "border-accent bg-accent" : "border-border"}`}>
                  {task.completed && <CheckCircle className="size-2 text-white" />}
                </div>
                <span className={`flex-1 text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.text}</span>
                <button onClick={() => removeTask(task.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all p-1"><Trash2 className="size-3.5" /></button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}