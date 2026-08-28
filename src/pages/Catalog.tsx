import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Check, X as XIcon } from "lucide-react";

function loadTasks() {
  try { return JSON.parse(localStorage.getItem("tasks") || "[]"); } catch { return []; }
}

export default function Catalog() {
  const allTasks = loadTasks();
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [...new Set(allTasks.map((t: any) => t.category).filter(Boolean))];

  const filteredTasks = allTasks.filter((t: any) => {
    const matchesSearch = !searchTerm || t.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="px-8 py-10 max-w-3xl">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-2">Task catalog</p>
        <h1 className="text-2xl font-light tracking-tight">Browse all tasks</h1>
        <p className="text-sm text-muted-foreground mt-1">Search and filter across every task on the team.</p>
      </div>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search tasks…" className="w-full bg-card border border-border pl-10 pr-4 py-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/40 transition-all" />
        {searchTerm && <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"><XIcon className="size-3.5" /></button>}
      </div>
      <p className="text-xs text-muted-foreground mb-6">{filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} found</p>
      <div className="border-t border-border">
        {filteredTasks.map((task: any, i: number) => (
          <motion.div key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-4 py-4 border-b border-border hover:bg-card/50 transition-colors">
            <div className={`size-4 shrink-0 border flex items-center justify-center ${task.completed ? "border-accent bg-accent" : "border-border"}`}>
              {task.completed && <Check className="size-2.5 text-white" />}
            </div>
            <span className={`flex-1 text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.text}</span>
            {task.category && <span className="text-[10px] text-primary/70 tracking-wide uppercase font-medium shrink-0 bg-primary/5 px-2 py-0.5">{task.category}</span>}
          </motion.div>
        ))}
        {filteredTasks.length === 0 && <div className="py-24 text-center"><p className="text-sm text-muted-foreground">No tasks found.</p></div>}
      </div>
    </div>
  );
}