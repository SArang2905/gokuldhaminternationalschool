import { motion } from "framer-motion";
import {
  TreePine, Building2, IndianRupee, Users, BookOpenCheck,
  Bus, Trophy, Lightbulb,
} from "lucide-react";

const features = [
  {
    icon: TreePine,
    title: "Green & Spacious Campus",
    points: ["Lush 3-Acre Campus", "Peaceful, safe & inspiring environment", "Fully ventilated & spacious building"],
  },
  {
    icon: Building2,
    title: "Modern Infrastructure",
    points: ["24×7 CCTV Surveillance", "Science Lab, Library & Computer Lab", "Art, Craft, Music & Dance"],
  },
  {
    icon: IndianRupee,
    title: "Affordable Quality Education",
    points: ["Transparent & affordable fee structure", "Budget-friendly learning", "Best education within every family's reach"],
  },
  {
    icon: Users,
    title: "Personal Attention",
    points: ["Limited students per class", "Individual attention to every child", "Regular parent-teacher interaction"],
  },
  {
    icon: BookOpenCheck,
    title: "Strong Foundation for Future",
    points: ["Reading, writing, speaking & numeracy", "Activity-based early learning", "Strong English & communication skills"],
  },
  {
    icon: Bus,
    title: "Transport Facility",
    points: ["Safe & well-managed school transport", "Covers all major routes", "GPS-enabled vehicles"],
  },
  {
    icon: Trophy,
    title: "Sports Excellence",
    points: ["Huge playground with indoor & outdoor sports", "Specialised coaching", "Annual sports day"],
  },
  {
    icon: Lightbulb,
    title: "NEP-Aligned Curriculum",
    points: ["Concept-based learning", "Skill-oriented approach", "National Education Policy compliant"],
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-16 md:py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-3">Why Choose Gokuldham?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Everything your child needs to grow, learn and excel — all under one roof.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <f.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-foreground mb-3">{f.title}</h3>
            <ul className="space-y-1.5">
              {f.points.map((p) => (
                <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
