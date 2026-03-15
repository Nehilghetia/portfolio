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
import useGsapScrollReveal from "@/hooks/useGsapScrollReveal";

const Index = () => {
  const containerRef = useGsapScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <MagneticCursor />
      <PageTransition>
        <div ref={containerRef} className="overflow-x-hidden">
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
