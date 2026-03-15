import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Sparkles, Code2, Layers, X, Globe, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Bill Mate",
    desc: "A modern full-stack billing & checkout platform for small businesses and online stores. BillMate allows shop owners to manage products, generate invoices, track orders, and accept online payments — all in one system.",
    longDesc: "Bill Mate is designed to simplify the complex billing process for small enterprises. It features a robust dashboard for product inventory, an automated invoice generation engine, and secure payment processing. Built with performance and security in mind, it provides a seamless bridge between commerce and finance.",
    features: ["Real-time Invoice Generation", "Inventory Management", "Secure Stripe Integration", "Customer Analytics"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe", "Supabase"],
    live: "https://bill-mate-self.vercel.app/",
    github: "https://github.com/Nehilghetia/BillMate",
    gradient: "from-cyan-500 to-blue-500",
    category: "Development"
  },
  {
    id: 2,
    title: "E-commerce Laptop Store",
    desc: "A premium e-commerce platform for high-end laptops, featuring top brands like Apple and Dell with a seamless shopping experience.",
    longDesc: "PrimeLaptops is a modern, responsive e-commerce web application designed for browsing and purchasing high-end laptops. Featuring a wide range of brands including Apple, ASUS, HP, and Dell, this platform provides a seamless shopping experience from product discovery to checkout.",
    features: ["Responsive E-Commerce Design", "Advanced Product Browsing", "Shopping Cart & Checkout System", "Smart Search Functionality"],
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://laptopstore-ygdu.onrender.com",
    github: "https://github.com/Nehilghetia/Laptop",
    gradient: "from-purple-500 to-pink-500",
    category: "Development"
  },
  {
    id: 3,
    title: "Mutual-Fund",
    desc: "A premium financial dashboard for real-time mutual fund tracking and comprehensive investment analysis.",
    longDesc: "Mutual Fund Explorer is a premium, data-driven financial dashboard designed to empower investors with real-time insights, comprehensive fund analysis, and smart investment simulation tools. Built with a modern tech stack, it provides a seamless experience for tracking wealth and making informed decisions.",
    features: [
      "Advanced Fund Explorer: Search & sort through thousands of schemes",
      "Smart Calculators: Simulations for SIP, SWP, and Lumpsum",
      "Top Rankings: Stay updated with highest-performing funds",
      "Personalized Watchlist: Save and track favorite funds",
      "Secure Architecture: Integrated with MongoDB and Auth",
      "Data Visualization: Interactive Chart.js & Recharts dashboards"
    ],
    tech: ["Next.js", "Material UI", "MongoDB", "Tailwind CSS"],
    live: "https://mutual-fund-explorer-nehil.vercel.app/",
    github: "https://github.com/Nehilghetia/mutual-fund",
    gradient: "from-orange-500 to-red-500",
    category: "Development"
  },
];

const categories = ["All", "Development", "UI/UX"];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(project => project.category === filter);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(".project-bg-shape", {
        y: -150,
        rotation: 180,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Cards animation
      const cards = sectionRef.current.querySelectorAll(".project-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            rotateX: -30,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );


      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section-padding relative overflow-hidden">

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-primary font-mono text-sm mb-2 tracking-widest uppercase flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Sparkles size={16} className="animate-pulse" />
            My Creative Work
            <Sparkles size={16} className="animate-pulse" />
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Featured</span> <span className="text-foreground">Projects</span>
          </h2>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-primary to-neon-purple mx-auto rounded-full mb-12"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="flex flex-wrap justify-center gap-2 p-1 bg-foreground/5 backdrop-blur-md rounded-2xl border border-border w-fit mx-auto shadow-sm"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${filter === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                layoutId={`project-container-${project.id}`}
                className="project-card group relative cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedProject(project)}
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  className="relative glass rounded-2xl border border-border shadow-lg shadow-foreground/5 overflow-hidden h-full"
                  whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient top bar */}
                  <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />


                  {/* Floating icons */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      animate={hoveredIndex === index ? { rotate: 360 } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Code2 className="text-primary/30" size={40} />
                    </motion.div>
                  </div>

                  <div className="p-8 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <motion.h3
                        layoutId={`project-title-${project.id}`}
                        className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
                      >
                        {project.title}
                      </motion.h3>
                      <motion.div
                        animate={hoveredIndex === index ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Layers className="text-primary" size={24} />
                      </motion.div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 min-h-[80px]">
                      {project.desc}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                      {project.tech.map((t, i) => (
                        <motion.span
                          key={`${project.id}-${t}`}
                          className="tech-tag text-xs font-mono px-3 py-1.5 rounded-full bg-secondary/50 text-primary border border-primary/20 backdrop-blur-sm inline-block"
                          whileHover={{ scale: 1.05, borderColor: "#00ffff" }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-primary font-mono text-[10px] tracking-wider uppercase opacity-60">
                      <Sparkles size={12} className="animate-pulse" /> Click to expand
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="100" cy="100" r="50" fill="currentColor" className="text-primary" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-background/90 backdrop-blur-xl z-[100] cursor-zoom-out"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
              <motion.div
                layoutId={`project-container-${selectedProject.id}`}
                className="glass w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] border border-border/50 overflow-hidden pointer-events-auto relative shadow-2xl flex flex-col"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-foreground/5 border border-border/50 text-foreground hover:bg-foreground/10 transition-all z-20"
                >
                  <X size={20} />
                </button>

                <div className={`h-3 bg-gradient-to-r ${selectedProject.gradient}`} />

                <div className="overflow-y-auto custom-scrollbar">
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono tracking-widest uppercase border border-primary/20">
                            Project Showcase
                          </span>
                        </div>
                        <motion.h3
                          layoutId={`project-title-${selectedProject.id}`}
                          className="text-4xl md:text-6xl font-bold gradient-text"
                        >
                          {selectedProject.title}
                        </motion.h3>
                      </div>

                      <div className="flex flex-shrink-0 gap-4">
                        {selectedProject.live !== "#" && (
                          <motion.a
                            href={selectedProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r ${selectedProject.gradient} text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/25 transition-all outline-none`}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Globe size={18} />
                            Live Demo
                          </motion.a>
                        )}
                        {selectedProject.github !== "#" && (
                          <motion.a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-foreground/5 border border-border/50 text-foreground font-bold hover:bg-foreground/10 transition-all outline-none"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Github size={18} />
                            GitHub
                          </motion.a>
                        )}
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-12">
                      <div className="lg:col-span-3 space-y-8">
                        <div>
                          <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                            <Layers className="text-primary" size={20} /> Overview
                          </h4>
                          <p className="text-muted-foreground text-lg leading-relaxed md:pr-4">
                            {selectedProject.longDesc}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                            <CheckCircle2 className="text-primary" size={20} /> Key Features
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {selectedProject.features.map((feature) => (
                              <div key={feature} className="flex items-center gap-3 p-3 rounded-xl bg-foreground/5 border border-border/10">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-2 space-y-8">
                        <div>
                          <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                            <Code2 className="text-primary" size={20} /> Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedProject.tech.map((t) => (
                              <motion.div
                                key={t}
                                layoutId={`project-tech-${selectedProject.id}-${t}`}
                                className="px-4 py-2 rounded-xl bg-secondary/50 text-primary border border-primary/20 font-mono text-sm backdrop-blur-sm"
                              >
                                {t}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
