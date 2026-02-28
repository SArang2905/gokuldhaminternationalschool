import { motion } from "framer-motion";

const TestimonialSection = () => (
  <section className="gradient-primary py-16 md:py-20">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <p className="text-2xl md:text-4xl font-bold text-primary-foreground italic leading-snug">
          "We prepare students not only for exams but for life."
        </p>
        <p className="mt-6 text-primary-foreground/80 font-medium">— Gokuldham International School</p>
      </motion.div>
    </div>
  </section>
);

export default TestimonialSection;
