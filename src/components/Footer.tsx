import logo from "@/assets/logo.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => (
  <footer className="bg-secondary py-12">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
          <div className="text-secondary-foreground">
            <p className="font-bold">Gokuldham International School</p>
            <p className="text-xs text-secondary-foreground/70">Shaping Bright Minds for a Brighter Tomorrow</p>
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
        <p className="text-xs text-secondary-foreground/60">
          © 2026 Gokuldham International School. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
