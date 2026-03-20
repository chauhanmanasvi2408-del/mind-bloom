import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  IndianRupee,
  CheckCircle2,
  Calendar,
  Users,
  Brain,
  Heart,
  Sparkles,
  Shield,
  X,
} from "lucide-react";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  icon: React.ReactNode;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 1,
    name: "Individual Counseling",
    description: "One-on-one session with a licensed psychologist for personal issues, anxiety, or depression.",
    price: 499,
    originalPrice: 999,
    duration: "45 min",
    icon: <Brain className="h-6 w-6" />,
    popular: true,
  },
  {
    id: 2,
    name: "Group Therapy",
    description: "Join a supportive group of people facing similar challenges. Share, listen, and heal together.",
    price: 199,
    originalPrice: 499,
    duration: "60 min",
    icon: <Users className="h-6 w-6" />,
  },
  {
    id: 3,
    name: "Relationship Counseling",
    description: "Work through relationship difficulties with a trained couples therapist.",
    price: 699,
    originalPrice: 1299,
    duration: "60 min",
    icon: <Heart className="h-6 w-6" />,
  },
  {
    id: 4,
    name: "Stress & Anxiety Workshop",
    description: "Learn practical techniques for managing stress, breathing exercises, and mindfulness.",
    price: 149,
    originalPrice: 399,
    duration: "90 min",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    id: 5,
    name: "Career & Decision Making",
    description: "Get guidance on career confusion, life decisions, and finding your purpose.",
    price: 399,
    originalPrice: 799,
    duration: "45 min",
    icon: <Shield className="h-6 w-6" />,
  },
];

const PhysicalCentre = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleBook = () => {
    if (!bookingName.trim() || !bookingPhone.trim() || !bookingDate) return;
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setSelectedService(null);
      setBookingName("");
      setBookingPhone("");
      setBookingDate("");
    }, 3000);
  };

  return (
    <section id="centre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Visit Our <span className="text-gradient-calm">Centre</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Get affordable in-person counseling and therapy at our physical centre. Professional help at prices everyone can afford.
          </p>
        </motion.div>

        {/* Centre Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-14 grid md:grid-cols-2 gap-6"
        >
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">📍 Location & Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Sithirtha Wellness Centre</p>
                  <p className="text-xs text-muted-foreground">123 Peace Avenue, Wellness District, Colombo 07, Sri Lanka</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground">Mon - Sat: 9:00 AM – 7:00 PM</p>
                  <p className="text-xs text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-foreground">+94 11 234 5678</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-foreground">hello@sithirtha.lk</p>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl overflow-hidden border border-border bg-muted flex items-center justify-center min-h-[220px]">
            <iframe
              title="Sithirtha Centre Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.81538628952!2d79.82118565!3d6.9218379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596d3cb8e401%3A0xc6cf5c3c4b2d33e7!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 220 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </motion.div>

        {/* Services & Pricing */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">
            Our Services — <span className="text-accent">Affordable Prices</span>
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative p-5 rounded-2xl border transition-all hover:shadow-soft cursor-pointer ${
                  service.popular
                    ? "bg-gradient-calm text-primary-foreground border-transparent"
                    : "bg-card border-border"
                }`}
                onClick={() => {
                  setSelectedService(service);
                  setBookingSubmitted(false);
                }}
              >
                {service.popular && (
                  <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground rounded-full">
                    Most Popular
                  </span>
                )}
                <div className={`mb-3 ${service.popular ? "text-primary-foreground" : "text-primary"}`}>
                  {service.icon}
                </div>
                <h4 className="font-semibold text-sm mb-1">{service.name}</h4>
                <p className={`text-xs mb-3 leading-relaxed ${service.popular ? "opacity-80" : "text-muted-foreground"}`}>
                  {service.description}
                </p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="flex items-center text-lg font-bold">
                    <IndianRupee className="h-4 w-4" />{service.price}
                  </span>
                  <span className={`text-xs line-through ${service.popular ? "opacity-50" : "text-muted-foreground"}`}>
                    ₹{service.originalPrice}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${service.popular ? "opacity-70" : "text-muted-foreground"}`}>
                    {service.duration} session
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    service.popular ? "bg-primary-foreground/20" : "bg-sage/15 text-sage-deep"
                  }`}>
                    {Math.round((1 - service.price / service.originalPrice) * 100)}% OFF
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Booking Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background rounded-2xl border border-border p-6 max-w-md w-full shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">Book Appointment</h3>
                  <button onClick={() => setSelectedService(null)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {bookingSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-3" />
                    <p className="text-foreground font-semibold">Booking Confirmed!</p>
                    <p className="text-sm text-muted-foreground mt-1">We'll contact you shortly to confirm your appointment.</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="p-3 rounded-xl bg-card border border-border mb-4">
                      <p className="text-sm font-medium text-foreground">{selectedService.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedService.duration} · ₹{selectedService.price}</p>
                    </div>

                    <div className="space-y-3">
                      <input
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full p-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <input
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        placeholder="Phone number"
                        className="w-full p-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="flex-1 p-3 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleBook}
                      disabled={!bookingName.trim() || !bookingPhone.trim() || !bookingDate}
                      className="mt-4 w-full py-3 rounded-xl bg-gradient-calm text-primary-foreground font-medium text-sm disabled:opacity-40 hover:opacity-90 transition-opacity"
                    >
                      Confirm Booking — ₹{selectedService.price}
                    </button>
                    <p className="text-[10px] text-muted-foreground text-center mt-2">
                      Pay at the centre. No advance payment required.
                    </p>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PhysicalCentre;
