import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MessageSquare, Send, UserCircle } from "lucide-react";

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  emoji: string;
  color: string;
}

interface CommunityMessage {
  id: number;
  user: string;
  text: string;
  time: Date;
}

const groups: CommunityGroup[] = [
  { id: "anxiety", name: "Anxiety Warriors", description: "A safe space for those dealing with anxiety. Share coping strategies and support each other.", members: 342, emoji: "🫂", color: "bg-sage/20 border-sage/40" },
  { id: "depression", name: "Light in the Dark", description: "For those battling depression. You're not alone — let's walk together.", members: 278, emoji: "🌱", color: "bg-sky/20 border-sky/40" },
  { id: "overthinking", name: "Mindful Thinkers", description: "Breaking the overthinking cycle. Share techniques that help you be present.", members: 195, emoji: "🧠", color: "bg-lavender/20 border-lavender/40" },
  { id: "relationships", name: "Heart to Heart", description: "Navigating relationship challenges — family, friends, partners. Talk it out.", members: 256, emoji: "💛", color: "bg-warm/30 border-warm-deep/20" },
  { id: "habits", name: "Habit Changers", description: "Breaking bad habits and building better ones, together.", members: 412, emoji: "🔥", color: "bg-peach/30 border-accent/20" },
  { id: "productivity", name: "Focus & Flow", description: "Boost your productivity and manage your time better. Share what works for you.", members: 188, emoji: "⚡", color: "bg-sage/15 border-sage-deep/20" },
];

const sampleMessages: Record<string, CommunityMessage[]> = {
  anxiety: [
    { id: 1, user: "Anonymous", text: "Today I tried the 4-7-8 breathing technique and it really helped during my panic attack. Highly recommend!", time: new Date(Date.now() - 1800000) },
    { id: 2, user: "HopefulSoul", text: "Has anyone tried journaling before bed? It helps me get the anxious thoughts out of my head.", time: new Date(Date.now() - 3600000) },
    { id: 3, user: "BraveFighter", text: "I went to a social gathering today for the first time in months. Small steps! 💪", time: new Date(Date.now() - 7200000) },
  ],
  depression: [
    { id: 1, user: "GentleRain", text: "Some days getting out of bed feels like climbing a mountain. Today I did it. That counts.", time: new Date(Date.now() - 2400000) },
    { id: 2, user: "SunSeeker", text: "Walking in nature for 15 minutes changed my day completely. Try it when you can.", time: new Date(Date.now() - 5000000) },
  ],
  overthinking: [
    { id: 1, user: "ClearMind", text: "I write down my worries and then ask myself 'will this matter in 5 years?' It puts things in perspective.", time: new Date(Date.now() - 1200000) },
  ],
  relationships: [
    { id: 1, user: "HeartMender", text: "Learning that boundaries aren't selfish — they're necessary. This group helped me understand that.", time: new Date(Date.now() - 4000000) },
  ],
  habits: [
    { id: 1, user: "NewMe", text: "Day 21 of no doom-scrolling! The urge is still there but it's getting easier.", time: new Date(Date.now() - 900000) },
  ],
  productivity: [
    { id: 1, user: "FocusMode", text: "The Pomodoro technique + lo-fi music = chef's kiss 🤌", time: new Date(Date.now() - 3000000) },
  ],
};

const CommunitySection = () => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, CommunityMessage[]>>(sampleMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeGroup) return;
    const msg: CommunityMessage = {
      id: Date.now(),
      user: "You",
      text: newMessage,
      time: new Date(),
    };
    setMessages(prev => ({
      ...prev,
      [activeGroup]: [msg, ...(prev[activeGroup] || [])],
    }));
    setNewMessage("");
  };

  const activeGroupData = groups.find(g => g.id === activeGroup);

  return (
    <section id="community" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/20 text-sage-deep text-sm font-medium mb-4">
            <Users className="h-4 w-4" />
            Connect with Others
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Community <span className="text-gradient-calm">Support Groups</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Join groups of people going through similar challenges. Share experiences, 
            support each other, and know that you're never alone.
          </p>
        </motion.div>

        {!activeGroup ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {groups.map((group, i) => (
              <motion.button
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveGroup(group.id)}
                className={`text-left p-6 rounded-2xl border-2 ${group.color} shadow-card hover:shadow-soft transition-all`}
              >
                <span className="text-3xl mb-3 block">{group.emoji}</span>
                <h3 className="font-semibold text-foreground text-lg mb-1">{group.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{group.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  {group.members} members
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            {/* Group header */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setActiveGroup(null)}
                className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                ← Back
              </button>
              <span className="text-2xl">{activeGroupData?.emoji}</span>
              <div>
                <h3 className="font-semibold text-foreground">{activeGroupData?.name}</h3>
                <p className="text-xs text-muted-foreground">{activeGroupData?.members} members</p>
              </div>
            </div>

            {/* Message input */}
            <div className="flex gap-3 mb-6">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your thoughts with the group..."
                className="flex-1 p-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-4 rounded-xl bg-gradient-calm text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="space-y-3">
              <AnimatePresence>
                {(messages[activeGroup] || []).map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-background border border-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <UserCircle className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{msg.user}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed pl-7">{msg.text}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CommunitySection;
