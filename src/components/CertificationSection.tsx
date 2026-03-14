import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    Award,
    ChevronRight,
    BadgeCheck,
    ExternalLink
} from "lucide-react";

// 📝 HOW TO ADD A NEW CERTIFICATE:
// Copy the template below and paste it into the certificationData array.
/*
{
    title: "Course Name", 
    issuer: "Organization",
    date: "Month Year",
    link: "https://...",    // Use "#" if no link
    category: "Programming", // e.g., Hackathon, Programming, Design
    skills: ["Skill1", "Skill2"],
    color: "#ffffff"        // Hex code for theme
},
*/

interface Certificate {
    title: string;
    issuer: string;
    date: string;
    link: string;
    category?: string;
    skills: string[];
    color: string;
}

const certificationData: Certificate[] = [
    {
        title: "Tech Expo",
        issuer: "Parul University",
        date: "Feb 2026",
        link: "https://drive.google.com/file/d/11sNML1j0Lxs4mRNY2DoVqOzVsc44-7pa/view?usp=drive_link",
        category: "Hackathon",
        skills: ["React", "Innovation", "Problem Solving", "MVP"],
        color: "#00ffff",
    },
    {
        title: "Fundamentals of DevOps on AWS",
        issuer: "Amazon Web Services (AWS)",
        date: "Jan 2026",
        link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzNzQxIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvOTczNjQwNF85NzEzMjU4XzE3Njg4ODE5ODI5MTUucG5nIiwidXNlcm5hbWUiOiJOZWhpbCBHaGV0aWEifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F6649%2FFundamentals-of-DevOps-On-AWS%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1531308555179055561&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVj4rIiAytynEuNUyyrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDAPiZFtRBAAAA",
        category: "Programming",
        skills: ["Devops"],
        color: "#ff00ff",
    },
    {
        title: "Completion Generative Ai Mastermind",
        issuer: "Outskill",
        date: "Nov 2025",
        link: "https://drive.google.com/file/d/1DRXbQLonxewcQ_bMGo_T1L7Wsd_fAjPC/view?usp=drive_link",
        category: "Programming",
        skills: ["Generative Ai Mastermind"],
        color: "#7000ff",
    },
    {
        title: "Introduction to Generative AI Studio",
        issuer: "Google Cloud",
        date: "Dec 2025",
        link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzODE0IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvOTYzNjk2NF85NzEzMjU4XzE3NjY2NTg5NzQ2ODUucG5nIiwidXNlcm5hbWUiOiJOZWhpbCBHaGV0aWEifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F6757%2FIntroduction-to-Generative-AI-Studio%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1531308555179055561&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVd3F3LkgNSHEuNUyyrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDAPx1y2lBAAAA",
        category: "Programming",
        skills: ["Generative AI Studio"],
        color: "#00ff00",
    },
];

const CertificationSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

    return (
        <section ref={sectionRef} id="certifications" className="section-padding relative overflow-hidden bg-background">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px] -z-10 animate-pulse delay-700" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center mb-16 gap-8">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            className="text-primary font-mono text-sm mb-2 tracking-widest uppercase flex items-center justify-center gap-2 font-bold"
                        >
                            <Award size={18} className="text-primary animate-bounce" /> Verified Professional Growth
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            className="text-4xl md:text-6xl font-bold"
                        >
                            <span className="gradient-text">Certifications</span> <span className="text-foreground">& Licenses</span>
                        </motion.h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-primary to-neon-purple mx-auto rounded-full mt-4" />
                    </div>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {certificationData.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="group perspective-1000"
                            >
                                <motion.div
                                    whileHover={{
                                        rotateX: 10,
                                        rotateY: -10,
                                        z: 50,
                                        boxShadow: `0 20px 50px -10px ${cert.color}40`
                                    }}
                                    className="relative h-[420px] w-full rounded-[2rem] bg-[#080808] border border-white/5 transition-all duration-500 overflow-hidden"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* Glass Reflection Overlay */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />

                                    {/* Holographic Category Watermark */}
                                    <div className="absolute top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                                        <h4 className="text-[10rem] font-black leading-none uppercase -rotate-90 origin-center tracking-tighter">
                                            {cert.category?.slice(0, 3)}
                                        </h4>
                                    </div>

                                    {/* Main Content Layer */}
                                    <div className="relative h-full p-10 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>

                                        {/* Floating Badge Lens */}
                                        <div className="relative">
                                            <div
                                                className="w-20 h-20 rounded-full flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-500"
                                                style={{
                                                    background: `radial-gradient(circle at center, ${cert.color}40, transparent)`,
                                                    boxShadow: `0 0 30px ${cert.color}20`
                                                }}
                                            >
                                                <BadgeCheck className="w-10 h-10" style={{ color: cert.color }} />
                                                <div className="absolute inset-0 rotate-anim border border-dashed opacity-30 group-hover:opacity-100 scale-125 transition-all duration-700" style={{ borderColor: cert.color }} />
                                            </div>
                                        </div>

                                        {/* Core Information */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="h-0.5 w-6 rounded-full" style={{ backgroundColor: cert.color }} />
                                                <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground group-hover:text-white transition-colors">
                                                    {cert.category || 'Credential'}
                                                </span>
                                            </div>

                                            <h3 className="text-3xl font-black text-white leading-tight mb-4 tracking-tighter group-hover:tracking-normal transition-all duration-500">
                                                {cert.title}
                                            </h3>

                                            {/* Skills Cloud - Hidden for Hackathons */}
                                            {cert.category !== "Hackathon" && cert.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {cert.skills.slice(0, 3).map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="text-[11px] font-bold px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground group-hover:border-white/20 group-hover:text-foreground transition-all"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Minimal Tech Stamp */}
                                            <div className="flex flex-wrap gap-4 pt-5 border-t border-white/10">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase mb-1.5 tracking-wider">ISSUER</span>
                                                    <span className="text-sm font-extrabold text-foreground group-hover:text-white transition-colors">{cert.issuer}</span>
                                                </div>
                                                <div className="flex flex-col ml-auto text-right">
                                                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase mb-1.5 tracking-wider">ISSUED</span>
                                                    <span className="text-sm font-extrabold text-foreground group-hover:text-white transition-colors">{cert.date}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Interaction Footer */}
                                        <div className="flex items-center justify-between">
                                            {cert.link !== "#" ? (
                                                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-primary group-hover:text-white transition-all">
                                                    VERIFY ASSET <ExternalLink size={12} />
                                                </div>
                                            ) : (
                                                <div className="text-[10px] font-black tracking-widest text-muted-foreground italic">
                                                    INTERNAL RECORD
                                                </div>
                                            )}

                                            <div className="h-6 w-1 rounded-full opacity-20 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: cert.color }} />
                                        </div>
                                    </div>

                                    {/* Link Overlay */}
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute inset-0 z-50 cursor-pointer"
                                        aria-label={`View ${cert.title}`}
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CertificationSection;
