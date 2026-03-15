import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
    {
        degree: "Bachelor of Technology (B.Tech) in Information Technology (IT)",
        institution: "CodingGita × Rai University",
        duration: "2025 – 2028",
        location: "Ahmedabad, Gujarat, India",
        details: "Currently pursuing B.Tech with a focus on Information Technology, modern web development, and software engineering. Actively building scalable systems and mastering data management.",
    },
    {
        degree: "Diploma in Computer Engineering",
        institution: "Darshan University",
        duration: "2022 – 2025",
        location: "Rajkot, Gujarat, India",
        details: "Strong foundations in Information Technology, computer networking, and system administration. Gained hands-on experience in software development and database management.",
    },
    {
        degree: "Secondary Education (SSC)",
        institution: "Mother's Pride School",
        duration: "2020 – 2022",
        location: "Upleta, Gujarat, India",
        details: "Completed secondary education with focus on foundational academic excellence and core subjects.",
    }
];

const EducationSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !timelineRef.current) return;

        const ctx = gsap.context(() => {
            // Timeline line drawing animation
            gsap.fromTo(
                ".timeline-line",
                { height: 0 },
                {
                    height: "100%",
                    duration: 1.5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top center+=100",
                        end: "bottom center",
                        scrub: true,
                    },
                }
            );

            // Timeline items staggered reveal
            const items = gsap.utils.toArray(".timeline-item");
            items.forEach((item: any, i) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="education" className="section-padding relative overflow-hidden bg-secondary/30">
            <div className="container mx-auto relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">My Academic Journey</p>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        <span className="gradient-text">Education</span> <span className="text-foreground">Timeline</span>
                    </h2>
                    <motion.div
                        className="h-1 w-20 bg-gradient-to-r from-primary to-neon-purple mx-auto rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 80 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.div>

                <div className="max-w-4xl mx-auto relative" ref={timelineRef}>
                    {/* Central Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 rounded-full overflow-hidden">
                        <div className="timeline-line absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-neon-purple origin-top" />
                    </div>

                    <div className="space-y-12">
                        {educationData.map((item, index) => (
                            <div key={index} className={`timeline-item relative flex flex-col md:flex-row items-center justify-between gap-8 ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}>

                                {/* Timeline Node */}
                                <div className="absolute left-[20px] md:left-1/2 flex items-center justify-center w-12 h-12 rounded-full glass bg-background border-2 border-primary -translate-x-1/2 z-10 shadow-lg shadow-primary/20">
                                    <GraduationCap className="w-5 h-5 text-primary" />
                                </div>

                                {/* Content Box */}
                                <div className="w-full md:w-5/12 ml-[60px] md:ml-0">
                                    <motion.div
                                        className="glass p-6 rounded-2xl border border-glass-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 relative overflow-hidden group bg-background/50"
                                    >
                                        <div className="relative z-10">
                                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                                                <BookOpen className="w-5 h-5 text-primary opacity-80" />
                                                {item.degree}
                                            </h3>
                                            <h4 className="text-lg font-medium text-muted-foreground mb-4">
                                                {item.institution}
                                            </h4>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 opacity-80 font-mono">
                                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-primary" /> {item.duration}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-neon-purple" /> {item.location}</span>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base border-t border-border/50 pt-4 mt-2">
                                                {item.details}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Empty Space for the other side */}
                                <div className="hidden md:block w-5/12" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
