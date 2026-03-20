import { motion } from "framer-motion";
import { BookOpen, Phone, HeartHandshake, Brain, Leaf, Users } from "lucide-react";

const resources = [
  {
    icon: Phone,
    title: "Crisis Helpline",
    desc: "24/7 support. Call if you need immediate help.",
    color: "bg-peach/30 text-accent",
  },
  {
    icon: Brain,
    title: "Mental Health Tips",
    desc: "Daily techniques for managing anxiety and stress.",
    color: "bg-sage/20 text-sage-deep",
  },
  {
    icon: Leaf,
    title: "Mindfulness Guides",
    desc: "Breathing exercises and meditation practices.",
    color: "bg-sky/20 text-sky-deep",
  },
  {
    icon: Users,
    title: "Community Support",
    desc: "Join groups of people who understand what you're going through.",
    color: "bg-lavender/20 text-lavender-deep",
  },
  {
    icon: BookOpen,
    title: "Self-Help Library",
    desc: "Articles and books on personal growth and healing.",
    color: "bg-warm/30 text-warm-deep",
  },
  {
    icon: HeartHandshake,
    title: "Volunteer as Listener",
    desc: "Help others by being a compassionate listener.",
    color: "bg-sage/20 text-primary",
  },
];

const ResourcesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resources for <span className="text-gradient-calm">You</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Everything you need to start your healing journey, all in one place.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {resources.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-soft transition-all cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl ${r.color} flex items-center justify-center mb-4`}>
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
