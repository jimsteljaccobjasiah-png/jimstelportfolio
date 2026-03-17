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
      // Set initial state for icons
      gsap.set('.hero-line', { opacity: 0, y: 40 });
      gsap.set('.social-icon', { opacity: 0, x: 20 });
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
      }, "<0.1")
      // Animate Social Icons right after the text
      .to('.social-icon', {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1"); // Starts slightly before the last text line finishes

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
          className="h-full w-full object-cover object-[center_20%] md:object-center pointer-events-none"
          loading="eager" 
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div ref={contentRef} className="relative z-10 flex h-[100dvh] w-full items-center justify-center px-6 py-20">
        <div className="font-extrabold leading-[1.2] md:leading-[1.1] text-center space-y-2 md:space-y-3 max-w-3xl">
            <div className="hero-line text-[clamp(2rem,7vw,5.2rem)] text-white will-change-transform">I turn</div>
            <div className="hero-line text-[clamp(2rem,7vw,5.2rem)] will-change-transform" style={textGradient}>concepts</div>
            <div className="hero-line text-[clamp(2rem,7vw,5.2rem)] text-white will-change-transform">into</div>
            <div className="hero-line text-[clamp(2rem,7vw,5.2rem)] text-white will-change-transform">
              <span style={textGradient}>code</span> that
            </div>
            <div className="hero-line text-[clamp(2rem,7vw,5.5rem)] text-white will-change-transform">
              <span className="whitespace-nowrap">solves problems</span>
            </div>
            <div className="hero-line text-[clamp(2rem,7vw,5.2rem)] text-white will-change-transform">efficiently.</div>
        </div>
      </div>
      
      {/* SOCIAL LINKS - CENTER-RIGHT WITH ANIMATION CLASSES */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 z-20">
        <div className="flex flex-col items-center gap-8">
          <div className="social-icon w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent opacity-50" />
          <a 
            href="https://github.com/jimstel" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon text-neutral-500 hover:text-white transition-all hover:scale-110 active:scale-95"
          >
            <Github className="h-5 w-5 md:h-6 md:w-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/jimstel-jaccob-jasiah-a-b5a464247/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon text-neutral-500 hover:text-white transition-all hover:scale-110 active:scale-95"
          >
            <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
          </a>
          <a 
            href="mailto:jimsteljaccobjasiah@gmail.com" 
            className="social-icon text-neutral-500 hover:text-white transition-all hover:scale-110 active:scale-95"
          >
            <Mail className="h-5 w-5 md:h-6 md:w-6" />
          </a>
          <div className="social-icon w-[1px] h-12 bg-gradient-to-t from-blue-500 to-transparent opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;