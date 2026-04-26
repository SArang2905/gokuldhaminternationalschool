import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import heroImg from "@/assets/hero-school.jpg";

const downloadBrochure = () => {
  const a = document.createElement("a");
  a.href = "/brochure/Gokuldham_International_School.pdf";
  a.download = "Gokuldham_International_School.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20">
      <img src={heroImg} alt="Gokuldham International School Campus" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
      <div className="absolute inset-0 gradient-hero-overlay" />
      <div className="container relative z-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-destructive/90 px-4 py-1.5 text-xs font-semibold text-destructive-foreground mb-6 animate-pulse-slow">
            {t("hero.badge")}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 mb-8 max-w-xl">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#admissions" className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold gradient-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity text-sm md:text-base">
              {t("hero.apply")}
            </a>
            <button onClick={downloadBrochure} className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold border-2 border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-sm md:text-base cursor-pointer">
              {t("hero.brochure")}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
