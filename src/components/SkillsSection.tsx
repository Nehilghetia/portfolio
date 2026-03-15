import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code, Palette, FileCode, FileType, Atom, Wind,
  Database, Flame, Server, Cpu, Coffee, Smartphone,
  GitBranch, Terminal, Github, Monitor, Wrench, Layers,
  Globe, Zap, ShieldCheck, Box, Boxes, Braces, Binary,
  Cloud, Layout, PenTool, Radio, Settings, Share2,
  Table, Command, Search, Code2
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    icon: Monitor,
    skills: [
      { name: "HTML", icon: Code },
      { name: "CSS", icon: Palette },
      { name: "Tailwind CSS", icon: Wind },
      { name: "JavaScript", icon: FileCode },
      { name: "TypeScript", icon: FileType },
      { name: "React", icon: Atom },
      { name: "Next.js", icon: Layers },
      { name: "React Native", icon: Smartphone },
      { name: "Flutter", icon: Smartphone },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", icon: Terminal },
      { name: "Express.js", icon: Server },
      { name: "PHP", icon: FileCode },
      { name: "Java", icon: Coffee },
      { name: ".NET", icon: ShieldCheck },
      { name: "Firebase", icon: Flame },
    ],
  },
  {
    title: "Programming",
    icon: Braces,
    skills: [
      { name: "C", icon: Binary },
      { name: "C++", icon: Cpu },
      { name: "Java", icon: Coffee },
      { name: "JavaScript", icon: FileCode },
      { name: "TypeScript", icon: FileType },
      { name: "Python", icon: Zap },
      { name: "PHP", icon: FileCode },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      { name: "MongoDB", icon: Box },
      { name: "MySQL", icon: Database },
      { name: "PostgreSQL", icon: Database },
      { name: "Supabase", icon: ShieldCheck },
      { name: "Firebase", icon: Flame },
    ],
  },
  {
    title: "Tools & Others",
    icon: Wrench,
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: Github },
      { name: "Netlify", icon: Globe },
      { name: "Vercel", icon: Zap },
      { name: "Render", icon: Cloud },
      { name: "Postman", icon: Radio },
      { name: "Figma", icon: PenTool },
      { name: "Photoshop", icon: Palette },
      { name: "Arduino", icon: Cpu },
    ],
  },
];

const CyclingSkillGrid = ({ skills }: { skills: any[] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 9; // 3 rows of 3 columns

  useEffect(() => {
    if (skills.length <= itemsPerPage) return;

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + itemsPerPage) % skills.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [skills.length]);

  const displayedSkills = skills.length > itemsPerPage
    ? [...skills, ...skills].slice(startIndex, startIndex + itemsPerPage)
    : skills;

  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 gap-3 min-h-[300px] sm:min-h-[260px]">
      <AnimatePresence mode="popLayout">
        {displayedSkills.map((skill, idx) => (
          <motion.div
            key={`${skill.name}-${startIndex}-${idx}`}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-foreground/5 hover:bg-primary/5 border border-border/50 hover:border-primary/20 transition-all duration-300 group/item aspect-square sm:aspect-auto"
          >
            <div className="p-2 rounded-lg bg-background group-hover/item:text-primary transition-colors">
              <skill.icon className="w-6 h-6 sm:w-7 sm:h-7 opacity-80 group-hover/item:opacity-100" />
            </div>
            <span className="text-[10px] sm:text-[12px] font-medium text-muted-foreground group-hover/item:text-foreground text-center line-clamp-1">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".skill-header"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );

    const cards = el.querySelectorAll(".skill-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-padding relative overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px] animate-pulse delay-1000 opacity-50" />
      </div>

      <div className="container mx-auto px-4">
        <div className="skill-header text-center mb-16 relative">
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase flex items-center justify-center gap-2 font-bold">
            <Zap size={14} className="text-primary animate-pulse" /> Technical Arsenal
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Skills</span> & <span className="text-foreground">Technologies</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-neon-purple mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="skill-card group relative glass p-6 md:p-8 rounded-3xl border border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/10 via-transparent to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 w-full flex-1 flex flex-col">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-3.5 rounded-2xl bg-foreground/5 border border-border group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-500 flex-shrink-0">
                    <cat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground font-mono flex items-center gap-2 truncate uppercase tracking-tighter">
                      <span className="text-primary/50 text-xl font-light">{"//"}</span> {cat.title}
                    </h3>
                    <div className="h-0.5 w-12 bg-primary/30 mt-1 rounded-full group-hover:w-full transition-all duration-500" />
                  </div>
                </div>

                {/* Cycling Skill Grid: Max 3 columns as requested */}
                <CyclingSkillGrid skills={cat.skills} />

                {/* Auto Skill Changed Indicator */}
                <div className="mt-auto flex items-center justify-between px-2 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-[11px] text-primary/60 font-mono tracking-widest uppercase leading-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.5)]" />
                    Auto-Rotating Stack
                  </div>
                  <div className="text-[11px] text-muted-foreground/80 font-mono font-bold tracking-wider uppercase leading-none">
                    {cat.skills.length} SKILLS TOTAL
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
