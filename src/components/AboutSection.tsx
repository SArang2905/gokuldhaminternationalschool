import { motion } from "framer-motion";
import { MapPin, Quote } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="py-16 md:py-24 section-soft-bg">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-6">
          A Fresh Start Under New Management — A Promise of Stability &amp; Excellence
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Gokuldham International School is committed to building a trusted, stable
          and future-ready institution for your child. We prepare students not only
          for exams but for life.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Gokuldham Nagari, Malegao Road, Kasarkheda, Tq. Dist. Nanded – 431605</span>
        </div>

        <div className="relative bg-card rounded-xl p-8 shadow-md border">
          <Quote className="w-8 h-8 text-accent absolute top-4 left-4 opacity-60" />
          <blockquote className="text-lg md:text-xl font-medium italic text-secondary">
            "Our vision is to nurture every child into a confident, compassionate
            and capable individual ready to contribute to society."
          </blockquote>
          <p className="mt-4 text-sm text-primary font-semibold">— Gokuldham International School</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
