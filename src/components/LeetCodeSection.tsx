import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Code2, ExternalLink, Binary, Cpu, Database, Github, LayoutGrid, Activity } from "lucide-react";
import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";

const LeetCodeSection = () => {
    const { data, loading, error } = useLeetCodeStats("ghetiyanehil");
    const [activeTab, setActiveTab] = useState<"leetcode" | "github">("leetcode");
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

    if (loading && !data) {
        return (
            <section id="leetcode" className="section-padding flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                    <Code2 className="absolute inset-0 m-auto text-primary" size={24} />
                </div>
                <p className="mt-6 text-xl font-bold gradient-text animate-pulse">Synchronizing with Coding Ecosystem...</p>
                <p className="text-muted-foreground text-sm mt-2">Fetching your latest achievements...</p>
            </section>
        );
    }

    if (!data && !loading) {
        return (
            <section id="leetcode" className="section-padding flex flex-col items-center justify-center min-h-[400px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass p-12 rounded-[2.5rem] border border-red-500/20 flex flex-col items-center text-center max-w-2xl mx-auto shadow-2xl shadow-red-500/5"
                >
                    <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center mb-8 relative">
                        <Activity className="text-red-500" size={40} />
                        <div className="absolute inset-0 bg-red-500/20 blur-2xl -z-10 rounded-full animate-pulse" />
                    </div>

                    <h3 className="text-3xl font-bold mb-4 text-foreground tracking-tight">Sync Connection Interrupted</h3>
                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                        The LeetCode API is currently rate-limited or the server is waking up.
                        Your coding stats will appear once the connection is restored.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-10 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/25"
                        >
                            Retry Connection
                        </button>
                        <a
                            href="https://leetcode.com/u/ghetiyanehil/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-foreground font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            View Manual Profile <ExternalLink size={18} />
                        </a>
                    </div>
                </motion.div>
            </section>
        );
    }

    const getDifficultyTotal = (difficulty: string) => {
        return data?.allQuestionsCount?.find(q => q.difficulty?.toLowerCase() === difficulty.toLowerCase())?.count ||
            (difficulty.toLowerCase() === "easy" ? 932 : difficulty.toLowerCase() === "medium" ? 2026 : 915);
    };

    const difficulties = [
        {
            label: "Easy",
            solved: data?.easySolved || 0,
            total: getDifficultyTotal("Easy"),
            color: "#22c55e",
            icon: Database,
            desc: "Foundation & Logic"
        },
        {
            label: "Medium",
            solved: data?.mediumSolved || 0,
            total: getDifficultyTotal("Medium"),
            color: "#eab308",
            icon: Cpu,
            desc: "Algorithms & Optimization"
        },
        {
            label: "Hard",
            solved: data?.hardSolved || 0,
            total: getDifficultyTotal("Hard"),
            color: "#ef4444",
            icon: Binary,
            desc: "Advanced Problem Solving"
        },
    ];

    return (
        <section ref={sectionRef} id="leetcode" className="section-padding relative overflow-hidden bg-background">
            <div className="container mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-16" data-gsap="fade-up">
                    <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase flex items-center gap-2">
                        <Code2 size={16} /> Coding Ecosystem
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 flex flex-wrap items-center justify-center gap-x-4">
                        <span className="gradient-text">{activeTab === "leetcode" ? "LeetCode" : "GitHub"}</span>
                        <span className="text-foreground">Insights</span>
                    </h2>
                    {error && data && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-medium flex items-center gap-2"
                        >
                            <Activity size={12} className="animate-pulse" />
                            Viewing Offline Data (API Rate Limited)
                        </motion.div>
                    )}
                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-neon-purple rounded-full" />
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Side: Navigation & Summary */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="glass p-2 rounded-2xl border border-white/10 flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab("leetcode")}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "leetcode" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-white/5 text-muted-foreground"}`}
                            >
                                <LayoutGrid size={20} />
                                <span className="font-semibold">LeetCode Stats</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("github")}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "github" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-white/5 text-muted-foreground"}`}
                            >
                                <Github size={20} />
                                <span className="font-semibold">GitHub Activity</span>
                            </button>
                        </div>

                        <div className="glass p-5 sm:p-8 rounded-3xl border border-white/10 relative group overflow-hidden">
                            <div className="relative z-10 text-center flex flex-col items-center">
                                <AnimatePresence mode="wait">
                                    {activeTab === "leetcode" ? (
                                        <motion.div
                                            key="leetcode-summary"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            <div className="mb-8 relative inline-flex items-center justify-center group">
                                                {/* Animated outer glow */}
                                                <div className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full scale-90 group-hover:scale-110 transition-transform duration-1000 animate-pulse" />

                                                <motion.svg
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                    className="w-44 h-44 relative z-10"
                                                >
                                                    <circle cx="88" cy="88" r="76" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
                                                    <motion.circle
                                                        cx="88" cy="88" r="76" stroke="currentColor" strokeWidth="10" fill="transparent"
                                                        strokeDasharray={477}
                                                        initial={{ strokeDashoffset: 477 }}
                                                        animate={{ strokeDashoffset: 477 - (477 * (data?.solvedProblem || 0)) / (data?.totalQuestions || 3290) }}
                                                        transition={{ duration: 2.5, ease: "easeOut" }}
                                                        className="text-primary"
                                                        strokeLinecap="round"
                                                        style={{ filter: "drop-shadow(0 0 8px var(--primary))" }}
                                                    />
                                                </motion.svg>

                                                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                                                    <motion.span
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="text-5xl font-black text-white tracking-tighter drop-shadow-2xl"
                                                    >
                                                        {data?.solvedProblem || 0}
                                                    </motion.span>
                                                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/80 mt-1">Problems Solved</span>
                                                </div>
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-bold mb-2">Algorithm Master</h3>
                                            <p className="text-muted-foreground text-xs sm:text-sm mb-6">Optimizing algorithms and solving complex DSA challenges.</p>
                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-semibold">Ranking</p>
                                                    <p className="text-lg font-bold text-white tracking-tight">{data?.ranking || "N/A"}</p>
                                                </div>
                                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center min-h-[100px]">
                                                    <div className="flex items-baseline leading-none mb-2">
                                                        <span className="text-4xl font-black text-white tracking-tighter">
                                                            {Math.floor((data?.acceptanceRate && data.acceptanceRate > 0) ? data.acceptanceRate : 84)}
                                                        </span>
                                                        <span className="text-xl font-bold text-white/50 tracking-tighter">
                                                            .{(((data?.acceptanceRate && data.acceptanceRate > 0) ? data.acceptanceRate : 84.03) % 1).toFixed(2).split('.')[1]}%
                                                        </span>
                                                    </div>
                                                    <p className="text-[12px] font-bold text-white/40 tracking-wide uppercase">Acceptance</p>
                                                </div>
                                            </div>
                                            <a href="https://leetcode.com/u/ghetiyanehil/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                                                Full Profile <ExternalLink size={16} />
                                            </a>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="github-summary"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            <div className="mb-6 relative inline-block p-4 rounded-full bg-white/5 border border-white/10">
                                                <Github size={64} className="text-primary animate-pulse" />
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-bold mb-2">Code Architect</h3>
                                            <p className="text-muted-foreground text-xs sm:text-sm mb-6">Building awesome projects and contributing to open source.</p>
                                            <a href="https://github.com/Nehilghetia" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground font-semibold hover:bg-white/10 transition-all">
                                                @Nehilghetia <ExternalLink size={16} />
                                            </a>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Detailed View */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {activeTab === "leetcode" ? (
                                <motion.div
                                    key="leetcode-details"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col gap-6"
                                >
                                    {difficulties.map((diff) => (
                                        <div key={diff.label} className="glass px-6 sm:px-10 py-8 rounded-3xl border border-white/10 relative group overflow-hidden transition-all duration-500 hover:bg-white/[0.02]">
                                            <div className="absolute left-0 top-0 w-1 h-full" style={{ backgroundColor: diff.color }} />
                                            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 relative z-10">
                                                <div className="flex items-center gap-5 w-full md:w-[220px] shrink-0">
                                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                                        <diff.icon size={26} style={{ color: diff.color }} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-xl tracking-tight truncate">{diff.label}</h4>
                                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{diff.desc}</p>
                                                    </div>
                                                </div>

                                                <div className="flex-1 w-full max-w-xl">
                                                    <div className="flex justify-between text-[11px] font-mono uppercase tracking-[0.15em] font-black mb-2 px-1">
                                                        <span className="text-muted-foreground/60 flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: diff.color }} />
                                                            Progress
                                                        </span>
                                                        <span className="text-foreground tracking-tight text-sm font-semibold">
                                                            {diff.solved} <span className="opacity-20 mx-1">/</span> {diff.total}
                                                        </span>
                                                    </div>
                                                    <div className="h-4 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 p-[3px] relative">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(diff.solved / diff.total) * 100}%` }}
                                                            className="h-full rounded-full relative z-10"
                                                            style={{ backgroundColor: diff.color, boxShadow: `0 0 20px ${diff.color}50` }}
                                                        >
                                                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                                        </motion.div>
                                                    </div>
                                                </div>

                                                <div className="flex items-baseline justify-end shrink-0 md:min-w-[80px]">
                                                    <div className="text-3xl md:text-4xl font-bold font-mono tracking-tighter leading-none" style={{ color: diff.color }}>
                                                        {Math.round((diff.solved / diff.total) * 100)}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="github-details"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col gap-6"
                                >
                                    <div className="glass p-8 rounded-3xl border border-white/10 overflow-hidden relative group">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                            <div className="flex items-center gap-3">
                                                <Activity className="text-primary" size={24} />
                                                <h3 className="text-lg sm:text-xl font-bold">Contribution Timeline</h3>
                                            </div>
                                            <span className="text-xs sm:text-sm font-mono text-muted-foreground">@Nehilghetia</span>
                                        </div>
                                        <div className="relative rounded-xl bg-black/20 p-4 border border-white/5 overflow-x-auto custom-scrollbar">
                                            <img src="https://ghchart.rshah.org/Nehilghetia" alt="GitHub Contributions" className="min-w-[600px] md:min-w-0 w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                                            {[{ label: "Commits", val: "500+" }, { label: "Repos", val: "20+" }, { label: "Stars", val: "50+" }, { label: "Followers", val: "25+" }].map(stat => (
                                                <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">{stat.label}</p>
                                                    <p className="text-lg font-bold text-primary">{stat.val}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="glass p-6 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                                            <img src="https://github-readme-stats.vercel.app/api?username=Nehilghetia&show_icons=true&theme=transparent&hide_border=true&title_color=00ffff&text_color=ffffff&icon_color=00ffff" alt="GitHub Stats" className="w-full" />
                                        </div>
                                        <div className="glass p-6 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                                            <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Nehilghetia&layout=compact&theme=transparent&hide_border=true&title_color=00ffff&text_color=ffffff" alt="Top Languages" className="w-full" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeetCodeSection;
