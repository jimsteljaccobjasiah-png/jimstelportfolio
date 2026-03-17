import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail } from 'lucide-react';
import heroImage from '@/assets/jimsphotov4.png'; 

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    let ctx = gsap.context(() => {
      gsap.set('.hero-line', { opacity: 0, y: 40 });
      gsap.set(imageRef.current, { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true, 
          preventOverlaps: true,
          pinType: 'fixed', 
        },
      });

      tl.to(imageRef.current, {
        opacity: 0.15,
        duration: 2,
        ease: "none"
      })
      .to('.hero-line', {
        opacity: 1,
        y: 0,
        stagger: 0.5,
        duration: 3,
        ease: "power2.out",
      }, "<0.1");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const textGradient = {
    backgroundImage: 'linear-gradient(135deg, #fff 0%, #3b82f6 70%, #2563eb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full overflow-hidden bg-black text-white min-h-[100dvh]" 
    >
      <div ref={imageRef} className="absolute inset-0 z-0 h-[100dvh] w-full will-change-opacity">
        <img 
          src={heroImage} 
          alt="Jims"
          className="h-full w-full object-cover object-top md:object-center pointer-events-none"
          loading="eager" 
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div ref={contentRef} className="relative z-10 flex h-[100dvh] w-full items-center justify-center px-6 py-20">
        <div className="font-extrabold leading-[1.2] md:leading-[1.1] text-center space-y-2 md:space-y-3 max-w-6xl">
            <div className="hero-line text-[clamp(2rem,7vw,5.5rem)] text-white will-change-transform">I turn</div>
            <div className="hero-line text-[clamp(2rem,7vw,5.5rem)] will-change-transform" style={textGradient}>concepts</div>
            <div className="hero-line text-[clamp(2rem,7vw,5.5rem)] text-white will-change-transform">into</div>
            <div className="hero-line text-[clamp(2rem,7vw,5.5rem)] text-white will-change-transform">
              <span style={textGradient}>code</span> that
            </div>
            <div className="hero-line text-[clamp(2rem,7vw,5.5rem)] text-white will-change-transform">
              <span className="whitespace-nowrap">solves problems</span>
            </div>
            <div className="hero-line text-[clamp(2rem,7vw,5.5rem)] text-white will-change-transform">efficiently.</div>
        </div>
      </div>
      
      {/* SOCIAL LINKS INTEGRATED DA */}
      <div className="absolute bottom-10 left-1/2 z-20 w-full -translate-x-1/2 px-6">
        <div className="mx-auto flex justify-center gap-10">
          <a 
            href="https://github.com/jimstel" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-neutral-500 hover:text-white transition-all"
          >
            <Github className="h-6 w-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/jimstel-jaccob-jasiah-a-b5a464247/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-neutral-500 hover:text-white transition-all"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a 
            href="mailto:jimsteljaccobjasiah@gmail.com" 
            className="text-neutral-500 hover:text-white transition-all"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;