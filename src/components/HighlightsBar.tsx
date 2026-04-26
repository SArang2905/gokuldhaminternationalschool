import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { School, BookOpen, GraduationCap, IndianRupee } from "lucide-react";

const HighlightsBar = () => {
  const { t } = useTranslation();
  const highlights = [
    { icon: School, label: t("highlights.campus") },
    { icon: BookOpen, label: t("highlights.nep") },
    { icon: GraduationCap, label: t("highlights.faculty") },
    { icon: IndianRupee, label: t("highlights.value") },
  ];
  return (
    <section className="gradient-primary py-6 md:py-8">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 justify-center text-primary-foreground"
            >
              <h.icon className="w-7 h-7 flex-shrink-0" />
              <span className="text-sm md:text-base font-semibold">{h.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsBar;
