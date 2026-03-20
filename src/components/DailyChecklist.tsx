import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Trash2, CalendarDays, Sparkles } from "lucide-react";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

const defaultTasks: Task[] = [
  { id: 1, text: "Drink 8 glasses of water", done: false },
  { id: 2, text: "Study for 1 hour", done: false },
  { id: 3, text: "Go for a walk", done: false },
  { id: 4, text: "Read 10 pages", done: false },
  { id: 5, text: "No junk food today", done: false },
];

const DailyChecklist = () => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [newTask, setNewTask] = useState("");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const toggle = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask.trim(), done: false }]);
    setNewTask("");
  };

  const remove = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const allDone = total > 0 && done === total;

  return (
    <section id="daily-checklist" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Daily <span className="text-gradient-calm">Checklist</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Plan your day, check things off, and feel the satisfaction of getting things done.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          {/* Date & Stats */}
          <div className="flex items-center justify-between mb-6 px-1">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" /> {today}
            </span>
            <span className="text-sm font-semibold text-foreground">{done}/{total}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-muted mb-2">
            <motion.div
              className="h-2 rounded-full bg-gradient-calm"
              animate={{ width: total > 0 ? `${(done / total) * 100}%` : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <AnimatePresence>
            {allDone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-accent mb-4 mt-2"
              >
                <Sparkles className="h-4 w-4" /> All done for today! Amazing work!
              </motion.p>
            )}
          </AnimatePresence>

          {/* Task list */}
          <div className="space-y-2 mt-6">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${
                  task.done ? "bg-sage/10 border-sage/30" : "bg-card border-border"
                }`}
              >
                <button
                  onClick={() => toggle(task.id)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center border-2 transition-all flex-shrink-0 ${
                    task.done
                      ? "bg-gradient-calm border-transparent"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {task.done && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
                </button>

                <span
                  className={`flex-1 text-sm ${
                    task.done ? "line-through text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {task.text}
                </span>

                <button
                  onClick={() => remove(task.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Add new task */}
          <div className="mt-4 flex gap-2">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a task for today..."
              className="flex-1 p-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={addTask}
              className="px-4 rounded-xl bg-gradient-calm text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyChecklist;
