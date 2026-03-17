import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail } from 'lucide-react';
import heroImage from '@/assets/jimsphotov4.png';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    ScrollTrigger.config({ ignoreMobileResize: true });

    let ctx = gsap.context(() => {
      gsap.set('.hero-line', { opacity: 0, y: 40 });
      gsap.set(imageRef.current, { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isMobile ? '+=50%' : 'bottom top',
          scrub: 1,
          pin: !isMobile, // disable pin on mobile
        },
      });

      tl.to(imageRef.current, {
        opacity: 0.15,
        duration: 2,
        ease: 'none',
      }).to(
        '.hero-line',
        {
          opacity: 1,
          y: 0,
          stagger: 0.4,
          duration: 2,
          ease: 'power2.out',
        },
        '<0.1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const textGradient = {
    backgroundImage:
      'linear-gradient(135deg, #fff 0%, #3b82f6 70%, #2563eb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const lineClass =
    'hero-line text-[clamp(1.5rem,5vw,4.5rem)] sm:text-[clamp(2rem,6vw,5rem)] font-extrabold leading-[1.2] md:leading-[1.1] will-change-transform';

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black text-white min-h-screen"
    >
      {/* BACKGROUND IMAGE */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 h-full w-full will-change-opacity"
      >
        <img
          src={heroImage}
          alt="Jims"
          className="h-full w-full object-cover object-center scale-110 sm:scale-100 pointer-events-none"
          loading="eager"
        />
        {/* darker overlay for mobile */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/20" />
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center space-y-1 sm:space-y-2 md:space-y-3 max-w-[90vw] md:max-w-6xl">
          
          <div className={lineClass}>I turn</div>

          <div className={lineClass} style={textGradient}>
            concepts
          </div>

          <div className={lineClass}>into</div>

          <div className={lineClass}>
            <span style={textGradient}>code</span> that
          </div>

          <div className={lineClass}>
            <span className="whitespace-normal md:whitespace-nowrap">
              solves problems
            </span>
          </div>

          <div className={lineClass}>efficiently.</div>
        </div>
      </div>

      {/* SOCIAL LINKS */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 z-20 w-full -translate-x-1/2 px-6">
        <div className="mx-auto flex justify-center gap-8 sm:gap-10">
          <a
            href="https://github.com/jimstel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-white transition-all"
          >
            <Github className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>

          <a
            href="https://www.linkedin.com/in/jimstel-jaccob-jasiah-a-b5a464247/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-white transition-all"
          >
            <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>

          <a
            href="mailto:jimsteljaccobjasiah@gmail.com"
            className="text-neutral-500 hover:text-white transition-all"
          >
            <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;