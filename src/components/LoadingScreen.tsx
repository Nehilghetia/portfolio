import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const finalName = "<Nehil Ghetia />";
  const [displayText, setDisplayText] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    // Simulate fast loading progress 0-100
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 1;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);
      if (currentProgress === 100) clearInterval(progressInterval);
    }, 40);

    // Scramble text effect
    const chars = "!<>-_\\\\/[]{}—=+*^?#_01";
    let iteration = 0;

    // We want the scramble to finish a bit before the progress hits 100 
    const scrambleInterval = setInterval(() => {
      setDisplayText(finalName.split("").map((char, index) => {
        if (index < iteration / 2) return finalName[index];
        if (char === " ") return " ";
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));

      iteration += 1;
      if (iteration >= finalName.length * 2) {
        clearInterval(scrambleInterval);
        setDisplayText(finalName);
      }
    }, 40);

    return () => {
      clearInterval(progressInterval);
      clearInterval(scrambleInterval);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* CyberGrid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none" />

          {/* Huge background progress number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
          >
            <span className="text-[25vw] font-bold text-white/[0.02] tracking-tighter mix-blend-screen">
              {progress}
            </span>
          </motion.div>

          {/* Central content */}
          <div className="flex flex-col items-center gap-8 relative z-10 w-full px-5">
            {/* Glowing orb behind text */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] sm:w-[400px] h-[100px] bg-primary blur-[80px] pointer-events-none rounded-full"
            />

            {/* Typography */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex py-4 px-2"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-bold select-none text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 tracking-tight text-center">
                {displayText || "\u00A0"}
              </h1>
            </motion.div>

            {/* Sub-elements */}
            <div className="flex flex-col items-center gap-6 w-full max-w-[400px] mt-4">
              {/* Actual Loading Bar progress */}
              <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 via-primary to-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>

              {/* Bottom text: System status */}
              <div className="flex justify-between w-full items-center text-[10px] sm:text-xs font-mono text-white/40 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span>System Load</span>
                </div>
                <span>{progress === 100 ? "Ready" : "Booting..."}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
