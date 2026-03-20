import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Stethoscope, Brain, UserCircle, Paperclip } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  id: number;
  from: "user" | "professional";
  text: string;
  time: Date;
}

interface Professional {
  id: string;
  name: string;
  title: string;
  icon: typeof Brain;
  color: string;
  greeting: string;
}

const professionals: Professional[] = [
  {
    id: "psychologist",
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    icon: Brain,
    color: "bg-lavender/20 border-lavender/40 text-lavender-deep",
    greeting: "Hello! I'm Dr. Priya. Feel free to share what's on your mind. This is a safe and confidential space. How can I help you today?",
  },
  {
    id: "psychiatrist",
    name: "Dr. Arjun Mehta",
    title: "Psychiatrist",
    icon: Stethoscope,
    color: "bg-sage/20 border-sage/40 text-sage-deep",
    greeting: "Hi there! I'm Dr. Arjun. Whether it's about medication, symptoms, or just needing someone to talk to — I'm here. What would you like to discuss?",
  },
];

const ShareThoughtsSection = () => {
  const [selectedPro, setSelectedPro] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [newMessage, setNewMessage] = useState("");

  const handleSelectPro = (id: string) => {
    setSelectedPro(id);
    const pro = professionals.find(p => p.id === id)!;
    if (!conversations[id]) {
      setConversations(prev => ({
        ...prev,
        [id]: [{ id: 1, from: "professional", text: pro.greeting, time: new Date() }],
      }));
    }
  };

  const handleSend = () => {
    if (!newMessage.trim() || !selectedPro) return;
    const userMsg: Message = { id: Date.now(), from: "user", text: newMessage, time: new Date() };

    setConversations(prev => ({
      ...prev,
      [selectedPro]: [...(prev[selectedPro] || []), userMsg],
    }));
    setNewMessage("");

    // Simulate professional response
    setTimeout(() => {
      const responses = [
        "Thank you for sharing that with me. It takes courage to open up. Can you tell me more about how this makes you feel?",
        "I understand. That sounds really challenging. Have you noticed any patterns in when these feelings arise?",
        "You're doing the right thing by reaching out. Remember, seeking help is a sign of strength, not weakness.",
        "I hear you. Let's work through this together. What coping strategies have you tried so far?",
        "That's very insightful of you to recognize that. Self-awareness is an important step in the healing process.",
      ];
      const reply: Message = {
        id: Date.now() + 1,
        from: "professional",
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date(),
      };
      setConversations(prev => ({
        ...prev,
        [selectedPro]: [...(prev[selectedPro] || []), reply],
      }));
    }, 1500);
  };

  const activePro = professionals.find(p => p.id === selectedPro);
  const activeMessages = selectedPro ? conversations[selectedPro] || [] : [];

  return (
    <section id="talk-to-expert" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/20 text-lavender-deep text-sm font-medium mb-4">
            <Stethoscope className="h-4 w-4" />
            Confidential & Private
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Share Your Thoughts with{" "}
            <span className="text-gradient-calm">Experts</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Talk privately with licensed psychologists and doctors. Share what's troubling you
            in a safe, judgment-free space.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {!selectedPro ? (
            <div className="grid sm:grid-cols-2 gap-5">
              {professionals.map((pro, i) => (
                <motion.button
                  key={pro.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => handleSelectPro(pro.id)}
                  className={`text-left p-6 rounded-2xl border-2 ${pro.color} shadow-card hover:shadow-soft transition-all`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-calm flex items-center justify-center text-primary-foreground mb-4">
                    <pro.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{pro.name}</h3>
                  <p className="text-sm text-muted-foreground">{pro.title}</p>
                  <Button variant="calm" size="sm" className="mt-4 rounded-xl">
                    Start Conversation
                  </Button>
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 p-4 border-b border-border bg-background">
                <button
                  onClick={() => setSelectedPro(null)}
                  className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  ←
                </button>
                <div className="w-10 h-10 rounded-xl bg-gradient-calm flex items-center justify-center text-primary-foreground">
                  {activePro && <activePro.icon className="h-5 w-5" />}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{activePro?.name}</h4>
                  <p className="text-xs text-primary">Online</p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 h-80 overflow-y-auto space-y-3">
                <AnimatePresence>
                  {activeMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                          msg.from === "user"
                            ? "bg-gradient-calm text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                      >
                        {msg.from === "professional" && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <UserCircle className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">{activePro?.name}</span>
                          </div>
                        )}
                        <p>{msg.text}</p>
                        <span className={`block text-xs mt-1 ${msg.from === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border bg-background flex gap-3">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="px-4 rounded-xl bg-gradient-calm text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShareThoughtsSection;
