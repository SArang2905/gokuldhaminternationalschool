import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
];

const LanguageSelector = ({ className = "" }: { className?: string }) => {
  const [lang, setLang] = useState("en");
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <Globe size={16} className="text-foreground/70" />
      <Select value={lang} onValueChange={setLang}>
        <SelectTrigger className="h-9 w-[110px] text-xs font-medium border-border/60">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-background z-50">
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="hi">हिन्दी</SelectItem>
          <SelectItem value="mr">मराठी</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2">
          <img src={logo} alt="Gokuldham International School" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover" />
          <div className="leading-tight">
            <span className="font-bold text-sm md:text-base text-primary">Gokuldham</span>
            <span className="block text-[10px] md:text-xs text-secondary font-medium">International School</span>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#admissions" className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold gradient-primary text-primary-foreground shadow hover:opacity-90 transition-opacity">
            Apply Now
          </a>
          <LanguageSelector />
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSelector />
          <button className="p-2 text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b"
          >
            <div className="container py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium py-2 text-foreground/80 hover:text-primary transition-colors">
                  {l.label}
                </a>
              ))}
              <a href="#admissions" onClick={() => setOpen(false)} className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold gradient-primary text-primary-foreground shadow mt-2">
                Apply Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
