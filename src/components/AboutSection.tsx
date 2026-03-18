import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, GraduationCap, Heart, Sparkles } from "lucide-react";
import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const { data: leetcodeData } = useLeetCodeStats("ghetiyanehil");
  const leetcodeSolved = leetcodeData?.solvedProblem || 150;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect for background elements


      // Text reveal animation
      gsap.fromTo(
        ".about-text-reveal",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Stats counter animation
      const stats = sectionRef.current.querySelectorAll(".stat-number");
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target") || "0");
        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [leetcodeSolved]);

  const stats = [
    { icon: GraduationCap, value: 2, label: "B.Tech Student", suffix: "nd Year" },
    { icon: Code, value: 4, label: "Projects Completed", suffix: "+" },
    { icon: Heart, value: 100, label: "Learning Commitment", suffix: "%" },
    { icon: Sparkles, value: leetcodeSolved, label: "LeetCode Problems", suffix: "+" },
  ];

  return (
    <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden">


      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">Get to know me</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">About</span> <span className="text-foreground">Me</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-neon-purple rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image/Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative group max-w-md mx-auto">
              {/* Background Glows */}
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
              <div className="absolute -inset-4 bg-neon-purple/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700 delay-100" />

              {/* Photo Frame with Gradient Corner */}
              <div className="relative p-1 rounded-[2rem] bg-gradient-to-br from-primary/40 via-transparent to-neon-purple/40 border border-border shadow-2xl shadow-foreground/5 group-hover:border-primary/30 transition-all duration-500">
                <div className="relative glass rounded-[1.8rem] overflow-hidden aspect-[4/5]">
                  <img
                    src="/nehil.jpg"
                    alt="Nehil Ghetia"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-40" />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary/50 rounded-tl-xl" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-neon-purple/50 rounded-br-xl" />

              {/* Tiny Float Card */}
              <motion.div
                className="absolute -bottom-2 -left-2 glass px-4 py-2 rounded-lg border border-border/50 shadow-xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary tracking-tighter uppercase">Based in India</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <motion.p
              className="about-text-reveal text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I'm a passionate <span className="text-primary font-semibold">Information Technology (IT) student</span> with
              a deep love for creating innovative web applications and solving complex problems.
            </motion.p>

            <motion.p
              className="about-text-reveal text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              My journey in tech is driven by curiosity and a commitment to excellence. I specialize in{" "}
              <span className="text-primary font-semibold">full-stack development</span>, with expertise in modern
              frameworks and technologies.
            </motion.p>

            <motion.p
              className="about-text-reveal text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
              or solving algorithmic challenges on <a href="https://leetcode.com/u/ghetiyanehil/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-all">LeetCode</a>.
            </motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="group relative glass p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative z-10">
                    <stat.icon className="w-8 h-8 text-primary mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">
                      <span className="stat-number" data-target={stat.value}>
                        0
                      </span>
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
