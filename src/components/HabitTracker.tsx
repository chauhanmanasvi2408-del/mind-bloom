import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Flame, X, Trophy, Star, Zap, Target, Award } from "lucide-react";

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

const XP_PER_HABIT = 25;
const STREAK_BONUS = 10;

const getLevelInfo = (xp: number) => {
  const levels = [
    { level: 1, title: "Seedling", min: 0 },
    { level: 2, title: "Sprout", min: 100 },
    { level: 3, title: "Grower", min: 300 },
    { level: 4, title: "Bloomer", min: 600 },
    { level: 5, title: "Thriver", min: 1000 },
    { level: 6, title: "Champion", min: 1500 },
    { level: 7, title: "Legend", min: 2500 },
  ];
  let current = levels[0];
  let next = levels[1];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].min) {
      current = levels[i];
      next = levels[i + 1] || levels[i];
      break;
    }
  }
  const progressToNext = next.min > current.min
    ? ((xp - current.min) / (next.min - current.min)) * 100
    : 100;
  return { ...current, next, progressToNext, xp };
};

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [newHabit, setNewHabit] = useState("");
  const [newType, setNewType] = useState<"build" | "break">("build");
  const [showAdd, setShowAdd] = useState(false);
  const [totalXP, setTotalXP] = useState(150);
  const [xpPopup, setXpPopup] = useState<{ amount: number; id: number } | null>(null);

  const rewards = [
    { id: 1, name: "First Step", icon: <Star className="h-5 w-5" />, xpRequired: 0, unlocked: totalXP >= 0 },
    { id: 2, name: "Consistency King", icon: <Flame className="h-5 w-5" />, xpRequired: 100, unlocked: totalXP >= 100 },
    { id: 3, name: "Habit Hero", icon: <Target className="h-5 w-5" />, xpRequired: 300, unlocked: totalXP >= 300 },
    { id: 4, name: "Mind Master", icon: <Zap className="h-5 w-5" />, xpRequired: 600, unlocked: totalXP >= 600 },
    { id: 5, name: "Life Changer", icon: <Trophy className="h-5 w-5" />, xpRequired: 1000, unlocked: totalXP >= 1000 },
    { id: 6, name: "Legendary", icon: <Award className="h-5 w-5" />, xpRequired: 2500, unlocked: totalXP >= 2500 },
  ];

  const levelInfo = getLevelInfo(totalXP);

  const toggleComplete = (id: number) => {
    setHabits(habits.map(h => {
      if (h.id !== id) return h;
      const completing = !h.completedToday;
      if (completing) {
        const earned = XP_PER_HABIT + (h.streak > 0 ? STREAK_BONUS : 0);
        setTotalXP(prev => prev + earned);
        setXpPopup({ amount: earned, id });
        setTimeout(() => setXpPopup(null), 1500);
      }
      return {
        ...h,
        completedToday: completing,
        streak: completing ? h.streak + 1 : Math.max(0, h.streak - 1),
      };
    }));
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
            Track habits, earn XP, unlock rewards. Small daily wins lead to big life changes.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          {/* XP & Level Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8 p-5 rounded-2xl bg-gradient-calm text-primary-foreground relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvc3ZnPg==')] opacity-50" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs opacity-80 uppercase tracking-wider">Level {levelInfo.level}</p>
                  <p className="text-xl font-bold">{levelInfo.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{totalXP}</p>
                  <p className="text-xs opacity-80">Total XP</p>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-primary-foreground/20">
                <motion.div
                  className="h-2 rounded-full bg-primary-foreground/80"
                  initial={{ width: 0 }}
                  animate={{ width: `${levelInfo.progressToNext}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs opacity-70 mt-1.5">
                {levelInfo.next.min > levelInfo.xp
                  ? `${levelInfo.next.min - totalXP} XP to ${levelInfo.next.title}`
                  : "Max level reached! 🎉"}
              </p>
            </div>
          </motion.div>

          {/* Rewards */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Rewards</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {rewards.map((r) => (
                <motion.div
                  key={r.id}
                  whileHover={{ scale: 1.05 }}
                  className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-xl border min-w-[80px] transition-all ${
                    r.unlocked
                      ? "bg-sage/10 border-sage/30 text-foreground"
                      : "bg-muted/50 border-border text-muted-foreground opacity-50"
                  }`}
                >
                  <div className={`${r.unlocked ? "text-accent" : "text-muted-foreground"}`}>
                    {r.icon}
                  </div>
                  <span className="text-[10px] font-medium text-center leading-tight">{r.name}</span>
                  <span className="text-[9px] opacity-60">{r.xpRequired} XP</span>
                </motion.div>
              ))}
            </div>
          </div>

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
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all relative ${
                  habit.completedToday
                    ? "bg-sage/10 border-sage/30"
                    : "bg-background border-border"
                }`}
              >
                <AnimatePresence>
                  {xpPopup && xpPopup.id === habit.id && (
                    <motion.span
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 0, y: -30 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2 }}
                      className="absolute -top-2 right-4 text-sm font-bold text-accent"
                    >
                      +{xpPopup.amount} XP
                    </motion.span>
                  )}
                </AnimatePresence>

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
