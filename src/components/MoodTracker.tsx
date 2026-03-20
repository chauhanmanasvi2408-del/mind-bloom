import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Quote } from "lucide-react";

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-sage/30 border-sage" },
  { emoji: "😌", label: "Calm", color: "bg-sky/30 border-sky" },
  { emoji: "😐", label: "Neutral", color: "bg-muted border-border" },
  { emoji: "😟", label: "Anxious", color: "bg-warm/30 border-warm" },
  { emoji: "😢", label: "Sad", color: "bg-lavender/30 border-lavender" },
  { emoji: "😤", label: "Stressed", color: "bg-peach/30 border-peach" },
];

const moodQuotes: Record<string, { text: string; author: string }[]> = {
  Happy: [
    { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "Happiness depends upon ourselves.", author: "Aristotle" },
    { text: "Keep your face always toward the sunshine, and shadows will fall behind you.", author: "Walt Whitman" },
    { text: "The most important thing is to enjoy your life — to be happy.", author: "Audrey Hepburn" },
  ],
  Calm: [
    { text: "Almost everything will work again if you unplug it for a few minutes — including you.", author: "Anne Lamott" },
    { text: "Peace is the result of retraining your mind to process life as it is.", author: "Wayne Dyer" },
    { text: "Within you, there is a stillness and a sanctuary to which you can retreat.", author: "Hermann Hesse" },
    { text: "Calm mind brings inner strength and self-confidence.", author: "Dalai Lama" },
    { text: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James" },
  ],
  Neutral: [
    { text: "Not every day is good, but there is something good in every day.", author: "Alice Morse Earle" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  ],
  Anxious: [
    { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
    { text: "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.", author: "Charles Spurgeon" },
    { text: "Nothing diminishes anxiety faster than action.", author: "Walter Anderson" },
    { text: "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.", author: "Oprah Winfrey" },
    { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
  ],
  Sad: [
    { text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
    { text: "Tears come from the heart and not from the brain.", author: "Leonardo da Vinci" },
    { text: "The wound is the place where the Light enters you.", author: "Rumi" },
    { text: "You are allowed to feel messed up and inside out. It doesn't mean you're defective — it means you're human.", author: "David Mitchell" },
    { text: "Stars can't shine without darkness.", author: "D.H. Sidebottom" },
  ],
  Stressed: [
    { text: "It's not the load that breaks you down, it's the way you carry it.", author: "Lou Holtz" },
    { text: "You must learn to let go. Release the stress. You were never in control anyway.", author: "Steve Maraboli" },
    { text: "Take rest; a field that has rested gives a bountiful crop.", author: "Ovid" },
    { text: "Stress is caused by being 'here' but wanting to be 'there'.", author: "Eckhart Tolle" },
    { text: "Don't stress. Do your best. Forget the rest.", author: "Unknown" },
  ],
};

const getRandomQuote = (mood: string) => {
  const quotes = moodQuotes[mood] || moodQuotes["Neutral"];
  return quotes[Math.floor(Math.random() * quotes.length)];
};

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
  const [currentQuote, setCurrentQuote] = useState<{ text: string; author: string } | null>(null);
  const [quoteMood, setQuoteMood] = useState<string>("");

  const handleSave = () => {
    if (selectedMood === null) return;
    const moodLabel = moods[selectedMood].label;
    const entry: MoodEntry = {
      mood: moods[selectedMood].emoji,
      label: moodLabel,
      note,
      date: new Date(),
    };
    setEntries([entry, ...entries]);
    setCurrentQuote(getRandomQuote(moodLabel));
    setQuoteMood(moodLabel);
    setSelectedMood(null);
    setNote("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const refreshQuote = () => {
    if (quoteMood) setCurrentQuote(getRandomQuote(quoteMood));
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

          {/* Daily Quote based on mood */}
          <AnimatePresence>
            {currentQuote && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 p-6 rounded-2xl bg-gradient-calm text-primary-foreground relative overflow-hidden"
              >
                <Quote className="absolute top-3 left-3 h-8 w-8 opacity-20" />
                <div className="relative pl-6">
                  <p className="text-base md:text-lg font-medium italic leading-relaxed">
                    "{currentQuote.text}"
                  </p>
                  <p className="mt-3 text-sm opacity-80">— {currentQuote.author}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs opacity-60 uppercase tracking-wider">
                      Quote for your {quoteMood.toLowerCase()} mood
                    </span>
                    <button
                      onClick={refreshQuote}
                      className="flex items-center gap-1.5 text-xs opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <RefreshCw className="h-3 w-3" /> New quote
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
