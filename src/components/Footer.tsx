import { Github, Linkedin, Mail, Youtube, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const links = [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

const socials = [
    { icon: Github, href: "https://github.com/Nehilghetia" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/nehil-ghetia-1705a42a1/" },
    { icon: Youtube, href: "https://www.youtube.com/@Nehilghetia" },
    { icon: Twitter, href: "https://x.com/GhetiaNehil" },
    { icon: Mail, href: "mailto:nehil.ghetia.cg@gmail.com" },
];

const Footer = () => (
    <footer data-gsap="fade-up" className="relative border-t border-border pt-20 pb-10 px-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                {/* Brand Column */}
                <div className="md:col-span-5 space-y-6">
                    <a href="#home" className="flex flex-col items-start group inline-block">
                        <span className="text-2xl font-bold font-mono">Nehil Ghetia</span>
                        <div className="h-1 w-24 bg-gradient-to-r from-primary to-neon-purple rounded-full" />
                    </a>
                    <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                        A passionate Information Technology (IT) student focused on building beautiful,
                        functional, and user-centric digital experiences. Always learning,
                        always building.
                    </p>
                    <div className="flex items-center gap-4">
                        {socials.map((s, i) => (
                            <motion.a
                                key={i}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 rounded-xl glass border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-sm"
                            >
                                <s.icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Links Columns */}
                <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                    <div className="space-y-6">
                        <h4 className="text-foreground font-bold uppercase tracking-widest text-sm">Navigation</h4>
                        <ul className="space-y-4">
                            {links.map((l) => (
                                <li key={l.href}>
                                    <a href={l.href} className="text-muted-foreground hover:text-primary transition-colors text-base font-medium flex items-center group">
                                        <span className="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-foreground font-bold uppercase tracking-widest text-sm">Resources</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="#leetcode" className="text-muted-foreground hover:text-primary transition-colors text-base font-medium flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                                    LeetCode Profile
                                </a>
                            </li>
                            <li>
                                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors text-base font-medium flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                                    Project Gallery
                                </a>
                            </li>
                            <li>
                                <a href="mailto:nehil.ghetia.cg@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-base font-medium flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                                    Direct Email
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6 col-span-2 sm:col-span-1">
                        <h4 className="text-foreground font-bold uppercase tracking-widest text-sm">Services</h4>
                        <ul className="space-y-4 text-muted-foreground text-sm">
                            <li>Web Development</li>
                            <li>UI/UX Design</li>
                            <li>DSA Tutoring</li>
                            <li>Technical Writing</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    © {new Date().getFullYear()} <span className="text-foreground font-semibold">Nehil Ghetia</span>.
                    <span className="hidden sm:inline">All rights reserved.</span>
                </div>
                <div className="flex items-center gap-1 font-medium bg-secondary/30 px-4 py-2 rounded-full border border-border/10">
                    Built with passion in India
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
