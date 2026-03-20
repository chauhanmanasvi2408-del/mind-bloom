import { useState } from "react";
import { motion } from "framer-motion";

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-sage/30 border-sage" },
  { emoji: "😌", label: "Calm", color: "bg-sky/30 border-sky" },
  { emoji: "😐", label: "Neutral", color: "bg-muted border-border" },
  { emoji: "😟", label: "Anxious", color: "bg-warm/30 border-warm" },
  { emoji: "😢", label: "Sad", color: "bg-lavender/30 border-lavender" },
  { emoji: "😤", label: "Stressed", color: "bg-peach/30 border-peach" },
];

interface MoodEntry {
  mood: string;
  label: string;
  note: string;
  date: Date;
}

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (selectedMood === null) return;
    const entry: MoodEntry = {
      mood: moods[selectedMood].emoji,
      label: moods[selectedMood].label,
      note,
      date: new Date(),
    };
    setEntries([entry, ...entries]);
    setSelectedMood(null);
    setNote("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section id="mood-tracker" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How are you feeling <span className="text-gradient-calm">today?</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Track your mood daily. Understanding your emotions is the first step to healing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
            {moods.map((mood, i) => (
              <motion.button
                key={mood.label}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(i)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  selectedMood === i
                    ? `${mood.color} shadow-soft scale-105`
                    : "border-transparent bg-card hover:bg-muted"
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-xs font-medium text-foreground">{mood.label}</span>
              </motion.button>
            ))}
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind? (optional)"
            className="w-full p-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleSave}
              disabled={selectedMood === null}
              className="px-6 py-3 rounded-xl bg-gradient-calm text-primary-foreground font-medium disabled:opacity-40 transition-opacity hover:opacity-90"
            >
              Save Mood
            </button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-primary text-sm font-medium"
              >
                ✓ Mood saved!
              </motion.span>
            )}
          </div>

          {entries.length > 0 && (
            <div className="mt-8 space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent Moods</h3>
              {entries.slice(0, 5).map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
                >
                  <span className="text-2xl">{entry.mood}</span>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{entry.label}</span>
                    {entry.note && <p className="text-xs text-muted-foreground mt-0.5">{entry.note}</p>}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {entry.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MoodTracker;
