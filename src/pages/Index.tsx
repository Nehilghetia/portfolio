import { useState, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import LoadingScreen from "@/components/LoadingScreen";
import useGsapScrollReveal from "@/hooks/useGsapScrollReveal";

// Lazy-load off-screen components to optimize bundle size and speed up first paint
const AboutSection = lazy(() => import("@/components/AboutSection"));
const EducationSection = lazy(() => import("@/components/EducationSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const LeetCodeSection = lazy(() => import("@/components/LeetCodeSection"));
const CertificationSection = lazy(() => import("@/components/CertificationSection"));
const AchievementsSection = lazy(() => import("@/components/AchievementsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const Chatbot = lazy(() => import("@/components/Chatbot"));
const MagneticCursor = lazy(() => import("@/components/MagneticCursor"));

const Index = () => {
  const containerRef = useGsapScrollReveal();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LoadingScreen isLoading={isLoading} onComplete={() => setIsLoading(false)} />
      <Suspense fallback={null}>
        {!isLoading && <MagneticCursor />}
      </Suspense>
      <PageTransition>
        <div ref={containerRef} className={`overflow-x-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <ScrollProgress />
          <Navbar />
          <main>
            <HeroSection />
            <Suspense fallback={<div className="h-[400px] w-full" />}>
              <AboutSection />
            </Suspense>
            <Suspense fallback={<div className="h-[400px] w-full" />}>
              <EducationSection />
            </Suspense>
            <Suspense fallback={<div className="h-[400px] w-full" />}>
              <SkillsSection />
            </Suspense>
            <Suspense fallback={<div className="h-[600px] w-full" />}>
              <ProjectsSection />
            </Suspense>
            <Suspense fallback={<div className="h-[500px] w-full" />}>
              <LeetCodeSection />
            </Suspense>
            <Suspense fallback={<div className="h-[400px] w-full" />}>
              <CertificationSection />
            </Suspense>
            <Suspense fallback={<div className="h-[400px] w-full" />}>
              <AchievementsSection />
            </Suspense>
            <Suspense fallback={<div className="h-[400px] w-full" />}>
              <ContactSection />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <Suspense fallback={null}>
            {!isLoading && <Chatbot />}
          </Suspense>
        </div>
      </PageTransition>
    </div>
  );
};

export default Index;
