import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "LeetCode", href: "#leetcode" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    // Give a small delay for menu animation to finish
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80; // Navbar height offset
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 300);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex flex-col items-start group relative z-[60]"
        >
          <span className="text-xl font-bold font-mono tracking-tight text-foreground">Nehil Ghetia</span>
          <div className="h-0.5 w-full bg-gradient-to-r from-primary to-neon-purple rounded-full" />
        </a>

        <div className="flex items-center gap-4 hidden md:flex">
          {/* Desktop */}
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm lg:text-base text-muted-foreground hover:text-primary transition-colors duration-200 font-semibold tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ModeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden relative z-[60]">
          <ModeToggle />
          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground p-2 rounded-xl bg-white/5 border border-white/5 active:scale-90 transition-transform"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/5 absolute top-full left-0 right-0 z-[55] overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-2 py-8 max-h-[70vh] overflow-y-auto px-6">
              {navLinks.map((link) => (
                <li key={link.href} className="w-full">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xl block w-full py-3 text-muted-foreground hover:text-primary transition-colors duration-200 font-semibold text-center rounded-xl hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
