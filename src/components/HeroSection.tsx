import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Mail, Youtube, Twitter, Download, FolderOpen, Sparkles, Zap, Code, ArrowDown } from "lucide-react";
import Magnetic from "./ui/Magnetic";


gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Github, href: "https://github.com/Nehilghetia", label: "GitHub", color: "#00ffff" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/nehil-ghetia-1705a42a1/", label: "LinkedIn", color: "#ff00ff" },
  { icon: Youtube, href: "https://www.youtube.com/@Nehilghetia", label: "YouTube", color: "#ff0000" },
  { icon: Twitter, href: "https://x.com/GhetiaNehil", label: "Twitter", color: "#1DA1F2" },
  { icon: Mail, href: "mailto:nehil.ghetia.cg@gmail.com", label: "Email", color: "#ffff00" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const springConfig = { stiffness: 150, damping: 15 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }
    };

    sectionRef.current?.addEventListener("mousemove", handleMouseMove);
    return () => sectionRef.current?.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!titleRef.current) return;

    // Split text animation
    const text = titleRef.current.textContent || "";
    titleRef.current.innerHTML = text
      .split("")
      .map((char, i) => `<span class="inline-block" style="animation-delay: ${i * 0.05}s">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    gsap.fromTo(
      titleRef.current.querySelectorAll("span"),
      { opacity: 0, y: 50, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }
    );

    // Floating elements animation
    gsap.to(".floating-element", {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      rotation: "random(-15, 15)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 1,
        from: "random",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-start lg:items-center justify-center overflow-hidden pt-24 sm:pt-32 pb-12 lg:pt-20"
    >
      <div className="container mx-auto relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-left mt-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-wider uppercase">Available for work</span>
            </motion.div>

            <p className="text-primary font-mono text-[10px] sm:text-xs tracking-[0.3em] mb-2 uppercase font-bold drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]">
              Hello, I'm
            </p>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1] tracking-tight whitespace-nowrap md:whitespace-normal"
            >
              Nehil Ghetia
            </h1>

            <div className="text-2xl md:text-3xl font-bold mb-8 text-primary h-12">
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2000,
                  "Problem Solver",
                  2000,
                  "UI/UX Enthusiast",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text"
              />
            </div>

            <motion.p
              className="text-muted-foreground text-lg max-w-xl mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Passionate about building efficient and scalable web applications. I
              specialize in <span className="text-primary font-semibold">React, Node.js, and Modern Web Tech</span>, turning ideas into real-world
              solutions with clean code.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Magnetic strength={0.3}>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://drive.google.com/file/d/1-4LJ5-4LZhA_ey-3MJjiV94nqbYNtqeS/view?usp=drive_link"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-neon-purple text-primary-foreground font-bold shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-shadow hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]"
                >
                  <Download size={20} />
                  Download Resume
                </motion.a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border/50 hover:border-primary/50 text-foreground font-bold glass transition-all"
                >
                  View Projects <span>→</span>
                </motion.a>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="space-y-4"
            >
              <p className="text-xs text-primary font-mono font-bold flex items-center gap-3 tracking-widest">
                CONNECT WITH ME
                <span className="w-12 h-px bg-primary/30" />
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((s, i) => (
                  <Magnetic key={s.label} strength={0.4}>
                    <motion.a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      whileHover={{ scale: 1.2, y: -2 }}
                      className="w-10 h-10 rounded-lg glass border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
                    >
                      <s.icon size={20} />
                    </motion.a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Photo with Orbiting Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Main Outer Glow */}
            <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-neon-purple/20 rounded-full blur-[120px] animate-pulse" />

            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px]">
              {/* Spinning Orbit Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-15%] border border-dashed border-primary/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-25%] border border-dashed border-border/50 rounded-full"
              />

              {/* Orbiting Tech Icons */}
              {[Sparkles, Zap, Code, Github, Linkedin, Twitter].map((Icon, i) => (
                <motion.div
                  key={i}
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(var(--orbit-radius, -140px))`,
                  }}
                  className="absolute [--orbit-radius:-140px] md:[--orbit-radius:-240px]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    className="p-3 rounded-xl glass border border-border/50 text-primary shadow-lg"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon size={20} />
                  </motion.div>
                </motion.div>
              ))}

              {/* Central Photo Container - Circular */}
              <div className="relative w-full h-full p-1 rounded-full bg-gradient-to-b from-primary/50 to-neon-purple/50 shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)]">
                <div className="w-full h-full glass !rounded-full overflow-hidden relative border-2 border-border/50 aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent z-10" />
                  <img
                    src="/nehil.jpg"
                    alt="Nehil Ghetia"
                    className="w-full h-full object-cover transition-all duration-700 transform hover:scale-110 !rounded-full"
                  />
                </div>
              </div>

              {/* Decorative Glows */}
              <div className="absolute -top-5 -right-5 w-16 h-16 bg-primary/30 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-neon-purple/30 rounded-full blur-xl animate-pulse delay-500" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="relative">
          <div className="w-8 h-14 rounded-full border-2 border-primary/60 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 20, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowDown size={14} className="text-primary" />
            </motion.div>
          </div>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
