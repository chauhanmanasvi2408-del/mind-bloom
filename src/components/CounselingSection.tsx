import { motion } from "framer-motion";
import { Video, MapPin, Clock, Star, Calendar } from "lucide-react";
import { Button } from "./ui/button";

const counselors = [
  {
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    speciality: "Anxiety & Depression",
    rating: 4.9,
    experience: "12 years",
    modes: ["online", "physical"],
    available: true,
  },
  {
    name: "Dr. Arjun Mehta",
    title: "Psychiatrist",
    speciality: "Stress Management",
    rating: 4.8,
    experience: "8 years",
    modes: ["online"],
    available: true,
  },
  {
    name: "Dr. Ananya Reddy",
    title: "Counseling Psychologist",
    speciality: "Relationships & Self-Esteem",
    rating: 4.9,
    experience: "10 years",
    modes: ["online", "physical"],
    available: false,
  },
];

const CounselingSection = () => {
  return (
    <section id="counseling" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional <span className="text-gradient-calm">Counseling</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Connect with licensed psychologists and doctors. Choose online video sessions
            or in-person visits — whatever feels right for you.
          </p>
        </motion.div>

        {/* Mode toggle */}
        <div className="flex justify-center gap-4 mb-10">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-sage/15 border border-sage/30">
            <Video className="h-5 w-5 text-sage-deep" />
            <div>
              <p className="text-sm font-semibold text-foreground">Online Sessions</p>
              <p className="text-xs text-muted-foreground">Video call from home</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-warm/30 border border-warm-deep/20">
            <MapPin className="h-5 w-5 text-warm-deep" />
            <div>
              <p className="text-sm font-semibold text-foreground">Physical Visit</p>
              <p className="text-xs text-muted-foreground">In-person counseling</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {counselors.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-soft transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-calm flex items-center justify-center text-primary-foreground font-bold text-lg mb-4">
                {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>

              <h3 className="font-semibold text-foreground text-lg">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.title}</p>
              <p className="text-xs text-primary font-medium mt-1">{c.speciality}</p>

              <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-accent fill-accent" /> {c.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {c.experience}
                </span>
              </div>

              <div className="flex gap-2 mt-3">
                {c.modes.includes("online") && (
                  <span className="px-2 py-1 rounded-full bg-sage/15 text-sage-deep text-xs">Online</span>
                )}
                {c.modes.includes("physical") && (
                  <span className="px-2 py-1 rounded-full bg-warm/30 text-warm-deep text-xs">In-person</span>
                )}
              </div>

              <Button
                variant={c.available ? "calm" : "outline"}
                className="w-full mt-5 rounded-xl"
                disabled={!c.available}
              >
                <Calendar className="h-4 w-4 mr-1" />
                {c.available ? "Book Session" : "Unavailable"}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounselingSection;
