import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Pencil, Trash2, X } from "lucide-react";

const CATEGORIES = ["General", "Design", "Engineering", "Planning", "Marketing"];

interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

function loadTasks(): Task[] {
  try { return JSON.parse(localStorage.getItem("tasks") || "[]"); } catch { return []; }
}
function saveTasks(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [newText, setNewText] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [editingCategory, setEditingCategory] = useState("General");
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");

  const update = (t: Task[]) => { setTasks(t); saveTasks(t); };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const text = newText.trim();
    if (!text) return;
    update([{ id: Date.now().toString(), text, completed: false, category: newCategory }, ...tasks]);
    setNewText("");
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  const doneCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="px-8 py-10 max-w-3xl">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-2">Your tasks</p>
        <h1 className="text-2xl font-light tracking-tight">Welcome</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your assignments and keep work moving.</p>
      </div>

      {tasks.length > 0 && (
        <div className="flex items-center gap-6 mb-10">
          <div className="text-xs text-muted-foreground"><span className="font-medium text-foreground">{tasks.length}</span> total</div>
          <span className="w-px h-3 bg-border" />
          <div className="text-xs text-muted-foreground"><span className="font-medium text-primary">{tasks.length - doneCount}</span> active</div>
          <span className="w-px h-3 bg-border" />
          <div className="text-xs text-muted-foreground"><span className="font-medium text-accent">{doneCount}</span> complete</div>
        </div>
      )}

      <form onSubmit={handleAdd} className="mb-10">
        <div className="border border-border p-4 bg-card shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <button type="submit" className="size-7 flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 transition-opacity shrink-0">
              <Plus className="size-4" />
            </button>
            <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="What needs to be done?" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50" />
          </div>
          <div className="flex items-center gap-2 pl-10">
            {CATEGORIES.map((cat) => (
              <button key={cat} type="button" onClick={() => setNewCategory(cat)} className={`px-2.5 py-1 text-[11px] tracking-wide transition-all duration-150 ${newCategory === cat ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground border border-border hover:border-primary/30"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </form>

      {tasks.length > 0 && (
        <div className="flex items-center gap-1 mb-6">
          {(["all", "active", "done"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs tracking-wide transition-all duration-200 rounded-sm ${filter === f ? "text-primary-foreground bg-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-border">
        <AnimatePresence initial={false}>
          {filteredTasks.map((task) => (
            <motion.div key={task.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
              <div className="group flex items-center gap-4 py-4 border-b border-border hover:bg-card/50 transition-colors">
                <button onClick={() => update(tasks.map((t) => t.id === task.id ? { ...t, completed: !t.completed } : t))} className={`size-4 shrink-0 border flex items-center justify-center transition-all duration-200 ${task.completed ? "border-accent bg-accent" : "border-border hover:border-primary/50"}`}>
                  {task.completed && <Check className="size-2.5 text-white" />}
                </button>
                {editingId === task.id ? (
                  <div className="flex-1 flex items-center gap-3">
                    <input autoFocus type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { update(tasks.map((t) => t.id === task.id ? { ...t, text: editingText, category: editingCategory } : t)); setEditingId(null); } if (e.key === "Escape") setEditingId(null); }} className="flex-1 bg-transparent text-sm outline-none border-b border-primary/30" />
                    <select value={editingCategory} onChange={(e) => setEditingCategory(e.target.value)} className="text-[11px] bg-card border border-border px-2 py-1 text-muted-foreground outline-none">
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button onClick={() => { update(tasks.map((t) => t.id === task.id ? { ...t, text: editingText, category: editingCategory } : t)); setEditingId(null); }} className="p-1 text-accent"><Check className="size-4" /></button>
                    <button onClick={() => setEditingId(null)} className="p-1 text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
                  </div>
                ) : (
                  <>
                    <span className={`flex-1 text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.text}</span>
                    <span className="text-[10px] text-primary/70 tracking-wide uppercase font-medium shrink-0 bg-primary/5 px-2 py-0.5">{task.category}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                      <button onClick={() => { setEditingId(task.id); setEditingText(task.text); setEditingCategory(task.category); }} className="p-1 text-muted-foreground hover:text-primary"><Pencil className="size-3.5" /></button>
                      <button onClick={() => update(tasks.filter((t) => t.id !== task.id))} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="size-3.5" /></button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {tasks.length === 0 && (
          <div className="py-24 text-center">
            <div className="inline-flex size-12 items-center justify-center bg-primary/10 mb-4"><Plus className="size-6 text-primary" /></div>
            <p className="text-sm text-foreground font-medium">Your task list is empty</p>
            <p className="text-xs text-muted-foreground mt-1">Add your first task above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}