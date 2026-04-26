import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const TestimonialSection = () => {
  const { t } = useTranslation();
  return (
    <section className="gradient-primary py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-2xl md:text-4xl font-bold text-primary-foreground italic leading-snug">
            {t("testimonial.quote")}
          </p>
          <p className="mt-6 text-primary-foreground/80 font-medium">{t("testimonial.author")}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
