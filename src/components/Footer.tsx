import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { t } = useTranslation();
  const links = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.admissions"), href: "#admissions" },
    { label: t("nav.contact"), href: "#contact" },
  ];
  return (
    <footer className="bg-secondary py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
            <div className="text-secondary-foreground">
              <p className="font-bold">{t("footer.schoolName")}</p>
              <p className="text-xs text-secondary-foreground/70">{t("footer.tagline")}</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-secondary-foreground/10 text-center">
          <p className="text-xs text-secondary-foreground/60">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
