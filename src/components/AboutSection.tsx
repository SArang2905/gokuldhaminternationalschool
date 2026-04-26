import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, Quote } from "lucide-react";

const AboutSection = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-16 md:py-24 section-soft-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-6">
            {t("about.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {t("about.body")}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{t("about.address")}</span>
          </div>

          <div className="relative bg-card rounded-xl p-8 shadow-md border">
            <Quote className="w-8 h-8 text-accent absolute top-4 left-4 opacity-60" />
            <blockquote className="text-lg md:text-xl font-medium italic text-secondary">
              {t("about.quote")}
            </blockquote>
            <p className="mt-4 text-sm text-primary font-semibold">{t("about.quoteAuthor")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
