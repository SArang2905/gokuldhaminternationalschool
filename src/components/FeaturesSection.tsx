import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  TreePine, Building2, IndianRupee, Users, BookOpenCheck,
  Bus, Trophy, Lightbulb,
} from "lucide-react";

const featureKeys = [
  { key: "campus", icon: TreePine },
  { key: "infra", icon: Building2 },
  { key: "value", icon: IndianRupee },
  { key: "attention", icon: Users },
  { key: "foundation", icon: BookOpenCheck },
  { key: "transport", icon: Bus },
  { key: "sports", icon: Trophy },
  { key: "nep", icon: Lightbulb },
];

const FeaturesSection = () => {
  const { t } = useTranslation();
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-3">{t("features.title")}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("features.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureKeys.map((f, i) => {
            const points = t(`features.items.${f.key}.points`, { returnObjects: true }) as string[];
            return (
              <motion.div
                key={f.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-3">{t(`features.items.${f.key}.title`)}</h3>
                <ul className="space-y-1.5">
                  {points.map((p) => (
                    <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
