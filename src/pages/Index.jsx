import Navigation from '@/components/Navigation';
import NameNav from '@/components/NameNav'; // Swapping for the dope one da
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer'; // Import your new Cinematic Footer da!

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* 1. Using the Shimmering NameNav instead of basic Navigation */}
      <NameNav />
      
      <main className="relative">
        {/* HOME */}
        <section id="home" className="relative z-10 bg-black">
          <HeroSection />
        </section>

        {/* ABOUT */}
        <section id="about" className="relative z-20 bg-black">
          <AboutSection />
        </section>

        {/* EXPERTISE */}
        <section id="expertise" className="relative z-10 bg-black">
          <ExpertiseSection />
        </section>

        {/* PROJECTS */}
        <section id="projects" className="relative z-10 bg-black">
          <ProjectsSection />
        </section>

        {/* SKILLS / TECH STACK */}
        <section id="skills" className="relative z-10 bg-black">
          <SkillsSection />
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative z-10 bg-black">
          <ContactSection />
        </section>
      </main>
      
      {/* 2. Swapped the old basic footer for the "System-Core" Footer da! */}
      <Footer />

    </div>
  );
};

export default Index;