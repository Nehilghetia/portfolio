import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

type Message = {
    id: string;
    sender: "bot" | "user";
    text: string;
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [completedTyping, setCompletedTyping] = useState<Set<string>>(new Set(["1"]));

    // Typewriter Component for Bot Messages
    const Typewriter = ({ text, onType, onComplete }: { text: string, onType?: () => void, onComplete?: () => void }) => {
        const [displayText, setDisplayText] = useState("");
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            if (currentIndex < text.length) {
                const timeout = setTimeout(() => {
                    setDisplayText(prev => prev + text[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                    if (onType) onType();
                }, 15);
                return () => clearTimeout(timeout);
            } else if (onComplete) {
                onComplete();
            }
        }, [currentIndex, text]);

        return <span>{displayText}</span>;
    };

    const [messages, setMessages] = useState<Message[]>([
        { id: "1", sender: "bot", text: "Hi! I'm Nehil's AI assistant. Ask me anything about who I am, contact, tech, or projects!" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Nehil's Information for AI Context
    const SYSTEM_PROMPT = `
        You are a highly intelligent and friendly AI Assistant for Nehil Ghetia's portfolio website. 
        Answer user questions based ONLY on the following information about Nehil.
        
        Identity & Background:
        - Name: Nehil Ghetia
        - Location: Gujarat, India (Timezone: IST)
        - Current Status: B.Tech Student (Information Technology) at CodingGita × Rai University & Full-Stack Developer
        
        Professional Statistics:
        - Projects: 20+ Repositories & 3+ Featured Full-Stack Applications
        - Experience: 3+ Years of Coding Experience
        - Problem Solving: Live LeetCode stats on website (Username: ghetiyanehil), specialized in C++ and DSA.
        
        Technical Skills (Full Arsenal):
        - Frontend: React, Next.js, Framer Motion, GSAP, Three.js, Tailwind CSS, TypeScript, React Native, Flutter, HTML/CSS.
        - Backend: Node.js, Express.js, PHP, Java, .NET, Firebase.
        - Languages: JavaScript, TypeScript, Java, C, C++, Python, PHP.
        - Databases: MongoDB, MySQL, PostgreSQL, Supabase, Firebase.
        - Tools: Git, GitHub, Netlify, Vercel, Render, Postman, Figma, Photoshop, Arduino.
        
        Key Featured Projects:
        1. Bill Mate: Full-stack billing & checkout platform (Next.js, TS, Stripe, Supabase).
        2. Mutual Fund Explorer: Financial dashboard for real-time tracking (Next.js, MongoDB, Tailwind).
        3. E-commerce Laptop Store: Premium shopping experience for high-end laptops (HTML, CSS, JS).
        
        Certifications:
        - Tech Expo Winner (Parul University, Feb 2026)
        - Fundamentals of DevOps on AWS (AWS, Jan 2026)
        - Introduction to Generative AI Studio (Google Cloud, Dec 2025)
        - Completion Generative Ai Mastermind (Outskill, Nov 2025)
        
        Social & Contact:
        - Email: nehil.ghetia.cg@gmail.com
        - GitHub: https://github.com/Nehilghetia
        - LinkedIn: https://linkedin.com/in/nehilghetia
        - YouTube: https://www.youtube.com/@Nehilghetia
        
        Response Guidelines:
        - Use a friendly, professional, and slightly enthusiastic tone.
        - Format responses beautifully using bold text or lists where appropriate.
        - Direct hiring inquiries to the contact section or nehil.ghetia.cg@gmail.com.
        - Keep answers concise but informative.
    `;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen, isLoading]);

    const generateAIResponse = async (userPrompt: string) => {
        try {
            // Replace with your actual Gemini API Key or use an environment variable
            const API_KEY = "AIzaSyDA7td1ynGXFL0tMrU-21hHZjIFuUZEG0Y";

            if (!API_KEY || API_KEY.includes("YOUR_GEMINI")) {
                return "I'm ready to be connected to an AI! Please add a Google Gemini API Key in the code to enable my full intelligence.";
            }

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${userPrompt}` }]
                    }]
                })
            });

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("AI Error:", error);
            return "Oops! I'm having trouble connecting to my brain right now. Please try again or contact Nehil directly!";
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now().toString(), sender: "user", text: input };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput("");
        setIsLoading(true);

        // Simple rule-based logic for fast answers
        const lowerInput = currentInput.toLowerCase();
        let botResponse = "";

        if (lowerInput.includes("who") || lowerInput.includes("about") || lowerInput.includes("yourself")) {
            botResponse = "I'm **Nehil Ghetia**, a B.Tech IT student at CodingGita × Rai University. I'm a full-stack developer specializing in premium digital experiences using **React, Next.js, and Supabase**.";
        } else if (lowerInput.includes("skill") || lowerInput.includes("tech") || lowerInput.includes("stack") || lowerInput.includes("know")) {
            botResponse = "I specialize in **Full-Stack Development**. My tech stack includes **React, Next.js, TypeScript, Node.js, and Java**. I also work with mobile tech like **Flutter and React Native**, and cloud tools like **AWS DevOps**.";
        } else if (lowerInput.includes("project") || lowerInput.includes("work") || lowerInput.includes("build")) {
            botResponse = "I've built several premium platforms including **Bill Mate** (a billing SaaS), **Mutual Fund Explorer** (a financial dashboard), and a premium **E-commerce Laptop Store**.";
        } else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("hire") || lowerInput.includes("reach")) {
            botResponse = "You can reach me at **nehil.ghetia.cg@gmail.com** or use the contact form below. I'm always open to exciting new opportunities!";
        } else if (lowerInput.includes("certificat") || lowerInput.includes("award") || lowerInput.includes("winner")) {
            botResponse = "I've earned several certifications, including being a **Tech Expo Winner** (Parul University 2026), and certified in **AWS DevOps** and **Google Generative AI**.";
        } else if (lowerInput.includes("youtube") || lowerInput.includes("social") || lowerInput.includes("link")) {
            botResponse = "You can find my tutorials and projects on YouTube at **@Nehilghetia**, or check out my work on **GitHub (@Nehilghetia)** and **LinkedIn**.";
        }

        // Simulate "Thinking" delay (3.5 seconds)
        setTimeout(async () => {
            if (botResponse) {
                setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: "bot", text: botResponse }]);
            } else {
                const aiResponse = await generateAIResponse(currentInput);
                setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: "bot", text: aiResponse }]);
            }
            setIsLoading(false);
        }, 3500);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="absolute bottom-20 right-0 w-[340px] sm:w-[400px] h-[580px] max-h-[85vh] rounded-[2.5rem] flex flex-col overflow-hidden shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] border border-white/10 bg-[#050505]/80 backdrop-blur-2xl"
                        >
                            {/* Premium Header */}
                            <div className="relative p-6 border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative overflow-hidden group">
                                                <Bot className="text-primary w-6 h-6 animate-pulse" />
                                                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#050505] shadow-lg" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-white text-base tracking-tight">AI ARCHITECT</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em]">Neural Link Active</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/20 transition-all bg-white/[0.02]"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
                            </div>

                            {/* Chat Area with custom grid background */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative">
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

                                {messages.map((msg, index) => {
                                    const isWelcome = msg.id === "1";
                                    const hasCompleted = completedTyping.has(msg.id);

                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            key={msg.id}
                                            className={`flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                                        >
                                            <div
                                                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 ${msg.sender === "user"
                                                    ? "bg-white/5 border-white/10 text-white"
                                                    : "bg-primary/5 border-primary/20 text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]"
                                                    }`}
                                            >
                                                {msg.sender === "user" ? <User size={18} /> : <Bot size={18} />}
                                            </div>
                                            <div
                                                className={`max-w-[80%] p-4 rounded-[1.5rem] text-[15px] leading-relaxed shadow-sm transition-all duration-300 ${msg.sender === "user"
                                                    ? "bg-primary text-primary-foreground rounded-br-none font-medium"
                                                    : "bg-white/[0.03] text-foreground/90 border border-white/10 rounded-tl-none backdrop-blur-sm"
                                                    }`}
                                            >
                                                {msg.sender === "bot" && !isWelcome && !hasCompleted ? (
                                                    <Typewriter
                                                        text={msg.text}
                                                        onType={() => messagesEndRef.current?.scrollIntoView({ behavior: "auto" })}
                                                        onComplete={() => setCompletedTyping(prev => new Set(prev).add(msg.id))}
                                                    />
                                                ) : (
                                                    msg.text
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}

                                {isLoading && (
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]">
                                            <Bot size={18} className="animate-spin-slow" />
                                        </div>
                                        <div className="bg-white/[0.03] border border-white/10 p-5 rounded-[1.5rem] rounded-tl-none">
                                            <div className="flex gap-2">
                                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"></motion.span>
                                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"></motion.span>
                                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"></motion.span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Redesigned Input Area */}
                            <div className="p-6 bg-gradient-to-t from-white/[0.03] to-transparent border-t border-white/5">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSend();
                                    }}
                                    className="relative group"
                                >
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Command AI..."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-base focus:outline-none focus:border-primary/50 text-white placeholder-white/20 transition-all pr-16"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isLoading}
                                        className="absolute right-2 top-2 bottom-2 aspect-square rounded-xl bg-primary text-primary-foreground hover:scale-105 transition-all disabled:opacity-30 disabled:grayscale disabled:scale-100 flex items-center justify-center shadow-lg"
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>
                                <p className="text-[10px] text-center mt-4 font-mono font-bold text-muted-foreground uppercase tracking-widest opacity-50">
                                    Encrypted Nexus Core v2.0
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all z-50 relative pointer-events-auto neon-glow hover:brightness-110"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <MessageSquare className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Animated rings around the button */}
                    {!isOpen && (
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary pointer-events-none"
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.8, 0, 0.8]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    )}
                </motion.button>
            </div>
        </>
    );
};

export default Chatbot;
