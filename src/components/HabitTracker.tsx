import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check, Flame, X } from "lucide-react";

interface Habit {
  id: number;
  name: string;
  type: "build" | "break";
  streak: number;
  completedToday: boolean;
}

const defaultHabits: Habit[] = [
  { id: 1, name: "Morning meditation", type: "build", streak: 5, completedToday: false },
  { id: 2, name: "Exercise 20 mins", type: "build", streak: 3, completedToday: false },
  { id: 3, name: "No social media before noon", type: "break", streak: 2, completedToday: false },
  { id: 4, name: "Journal before sleep", type: "build", streak: 7, completedToday: false },
];

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [newHabit, setNewHabit] = useState("");
  const [newType, setNewType] = useState<"build" | "break">("build");
  const [showAdd, setShowAdd] = useState(false);

  const toggleComplete = (id: number) => {
    setHabits(habits.map(h =>
      h.id === id ? { ...h, completedToday: !h.completedToday, streak: !h.completedToday ? h.streak + 1 : h.streak - 1 } : h
    ));
  };

  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits([...habits, { id: Date.now(), name: newHabit, type: newType, streak: 0, completedToday: false }]);
    setNewHabit("");
    setShowAdd(false);
  };

  const removeHabit = (id: number) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const completed = habits.filter(h => h.completedToday).length;
  const total = habits.length;

  return (
    <section id="habits" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Build Better <span className="text-gradient-calm">Habits</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Track habits you want to build and bad habits you want to break.
            Small daily wins lead to big life changes.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6 px-1">
            <span className="text-sm text-muted-foreground">Today's Progress</span>
            <span className="text-sm font-semibold text-foreground">{completed}/{total} done</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted mb-8">
            <motion.div
              className="h-2 rounded-full bg-gradient-calm"
              initial={{ width: 0 }}
              animate={{ width: total > 0 ? `${(completed / total) * 100}%` : "0%" }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Habits list */}
          <div className="space-y-3">
            {habits.map((habit) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                  habit.completedToday
                    ? "bg-sage/10 border-sage/30"
                    : "bg-background border-border"
                }`}
              >
                <button
                  onClick={() => toggleComplete(habit.id)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-all ${
                    habit.completedToday
                      ? "bg-gradient-calm border-transparent"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {habit.completedToday && <Check className="h-4 w-4 text-primary-foreground" />}
                </button>

                <div className="flex-1">
                  <span className={`text-sm font-medium ${habit.completedToday ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {habit.name}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      habit.type === "build" ? "bg-sage/15 text-sage-deep" : "bg-peach/30 text-accent"
                    }`}>
                      {habit.type === "build" ? "Build" : "Break"}
                    </span>
                    {habit.streak > 0 && (
                      <span className="flex items-center gap-0.5 text-xs text-accent">
                        <Flame className="h-3 w-3" /> {habit.streak} day streak
                      </span>
                    )}
                  </div>
                </div>

                <button onClick={() => removeHabit(habit.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Add habit */}
          {showAdd ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 p-4 rounded-2xl bg-background border border-border"
            >
              <input
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="New habit name..."
                className="w-full p-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring mb-3"
                onKeyDown={(e) => e.key === "Enter" && addHabit()}
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNewType("build")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    newType === "build" ? "bg-sage/20 text-sage-deep" : "bg-muted text-muted-foreground"
                  }`}
                >
                  Build
                </button>
                <button
                  onClick={() => setNewType("break")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    newType === "break" ? "bg-peach/30 text-accent" : "bg-muted text-muted-foreground"
                  }`}
                >
                  Break
                </button>
                <button onClick={addHabit} className="ml-auto px-4 py-1.5 rounded-xl bg-gradient-calm text-primary-foreground text-sm font-medium hover:opacity-90">
                  Add
                </button>
                <button onClick={() => setShowAdd(false)} className="text-muted-foreground text-sm hover:text-foreground">
                  Cancel
                </button>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setShowAdd(true)}
              className="mt-4 w-full flex items-center justify-center gap-2 p-3 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add New Habit
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HabitTracker;
