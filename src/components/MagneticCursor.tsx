import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const MagneticCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring logic for the trailing "multi-layout" layer
    const springConfig = { damping: 25, stiffness: 200, mass: 0.8 };
    const trailX = useSpring(mouseX, springConfig);
    const trailY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth > 1024);
        checkDesktop();
        window.addEventListener("resize", checkDesktop);

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const onMouseDown = () => setIsClicked(true);
        const onMouseUp = () => setIsClicked(false);

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button'], [data-magnetic], input, textarea, select")) {
                setIsHovered(true);
            }
        };

        const onMouseOut = () => setIsHovered(false);
        const onMouseLeaveWindow = () => setIsVisible(false);
        const onMouseEnterWindow = () => setIsVisible(true);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);
        document.addEventListener("mouseleave", onMouseLeaveWindow);
        document.addEventListener("mouseenter", onMouseEnterWindow);

        return () => {
            window.removeEventListener("resize", checkDesktop);
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
            document.removeEventListener("mouseleave", onMouseLeaveWindow);
            document.removeEventListener("mouseenter", onMouseEnterWindow);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isDesktop) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference">
                {/* 1. Trailing Outer Ring (The "One" allowed Multi-Layout) */}
                <motion.div
                    className="fixed top-0 left-0 rounded-full border border-primary/40 pointer-events-none"
                    style={{
                        x: trailX,
                        y: trailY,
                        translateX: "-50%",
                        translateY: "-50%",
                        width: isHovered ? 80 : 36,
                        height: isHovered ? 80 : 36,
                    }}
                    animate={{
                        opacity: isVisible ? 1 : 0,
                        scale: isClicked ? 0.9 : 1,
                        backgroundColor: isHovered ? "rgba(var(--primary-rgb), 0.15)" : "rgba(var(--primary-rgb), 0)",
                    }}
                    transition={{
                        width: { type: "spring", stiffness: 250, damping: 25 },
                        height: { type: "spring", stiffness: 250, damping: 25 },
                        backgroundColor: { duration: 0.2 }
                    }}
                />

                {/* 2. Precision Center Dot (Core) */}
                <motion.div
                    className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none shadow-[0_0_10px_hsla(var(--primary),0.5)]"
                    style={{
                        x: mouseX,
                        y: mouseY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    animate={{
                        scale: isVisible ? (isHovered ? 0 : 1) : 0,
                        opacity: isVisible ? 1 : 0,
                    }}
                />

                {/* 3. Click Ripple Effect - Fast, smooth interaction moment */}
                {isClicked && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        className="fixed top-0 left-0 w-12 h-12 border-2 border-primary rounded-full"
                        style={{
                            x: mouseX,
                            y: mouseY,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                    />
                )}
            </div>
        </AnimatePresence>
    );
};

export default MagneticCursor;
