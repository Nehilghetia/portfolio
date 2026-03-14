import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Brain, Rocket, Award, Zap, Target } from "lucide-react";

import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";

gsap.registerPlugin(ScrollTrigger);

const AchievementsSection = () => {
  const { data: leetcodeData } = useLeetCodeStats("ghetiyanehil");
  const leetcodeSolved = leetcodeData?.solvedProblem || 150;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const achievements = [
    {
      icon: Trophy,
      title: "Hackathon Participant",
      desc: "Competed and collaborated in hackathons, building innovative solutions under tight deadlines",
      value: 10,
      suffix: "+",
      color: "#FFD700",
    },
    {
      icon: Brain,
      title: "LeetCode Problem Solver",
      desc: "Actively solving algorithmic challenges in C++ on LeetCode",
      value: leetcodeSolved,
      suffix: "+",
      color: "#00ffff",
    },
    {
      icon: Rocket,
      title: "Full Stack Projects",
      desc: "Built and deployed multiple full-stack web applications",
      value: 3,
      suffix: "+",
      color: "#ff00ff",
    },
    {
      icon: Award,
      title: "Certifications",
      desc: "Completed various technical certifications and courses",
      value: 5,
      suffix: "+",
      color: "#00ff00",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Counter animation
      const counters = sectionRef.current!.querySelectorAll(".achievement-counter");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0");
        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            snap: { textContent: 1 },
            ease: "power2.out",
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
            },
          }
        );
      });

      // Card animations
      const cards = sectionRef.current!.querySelectorAll(".achievement-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.5,
            rotateY: -90,
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });

      // Icon rotation
      const icons = sectionRef.current!.querySelectorAll(".achievement-icon");
      icons.forEach((icon) => {
        gsap.to(icon, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "linear",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [leetcodeSolved]);

  return (
    <section ref={sectionRef} id="achievements" className="section-padding relative overflow-hidden">


      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase flex items-center justify-center gap-2">
            <Zap size={16} className="animate-pulse" />
            Milestones & Accomplishments
            <Zap size={16} className="animate-pulse" />
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Achievements</span> <span className="text-foreground">& Stats</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-neon-purple mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className="achievement-card group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="relative glass p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all h-full overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${achievement.color}10 0%, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div className="relative mb-6">
                  <motion.div
                    className="achievement-icon w-20 h-20 mx-auto rounded-2xl flex items-center justify-center relative"
                    style={{
                      background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}10)`,
                      border: `2px solid ${achievement.color}30`,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <achievement.icon size={40} style={{ color: achievement.color }} />

                    {/* Pulsing ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ border: `2px solid ${achievement.color}` }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Counter */}
                <div className="text-center mb-4">
                  <motion.div
                    className="text-5xl font-bold mb-2"
                    style={{ color: achievement.color }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="achievement-counter" data-target={achievement.value}>
                      0
                    </span>
                    {achievement.suffix}
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{achievement.desc}</p>
                </div>

                {/* Bottom decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default AchievementsSection;
