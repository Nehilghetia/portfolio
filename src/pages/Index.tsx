import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import LeetCodeSection from "@/components/LeetCodeSection";
import AchievementsSection from "@/components/AchievementsSection";
import CertificationSection from "@/components/CertificationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import MagneticCursor from "@/components/MagneticCursor";
import Chatbot from "@/components/Chatbot";
import LoadingScreen from "@/components/LoadingScreen";
import useGsapScrollReveal from "@/hooks/useGsapScrollReveal";

const Index = () => {
  const containerRef = useGsapScrollReveal();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading sequence for aesthetic purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LoadingScreen isLoading={isLoading} />
      <MagneticCursor />
      <PageTransition>
        <div ref={containerRef} className={`overflow-x-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <ScrollProgress />
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
            <LeetCodeSection />
            <CertificationSection />
            <AchievementsSection />
            <ContactSection />
          </main>
          <Footer />
          <Chatbot />
        </div>
      </PageTransition>
    </div>
  );
};

export default Index;
