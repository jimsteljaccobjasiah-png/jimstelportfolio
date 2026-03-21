import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail } from 'lucide-react';
import heroImage from '@/assets/jimsphotov4.webp'; // ✅ use WebP
import heroMobile from '@/assets/jims_mobile.webp';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    ScrollTrigger.config({ ignoreMobileResize: true });

    let ctx = gsap.context(() => {
      // Initial states
      gsap.set('.hero-line', { opacity: 0, y: 30 });
      gsap.set('.social-icon', { opacity: 0, x: 15 });
      gsap.set(imageRef.current, { opacity: 1 });

      // ✅ Desktop: Full cinematic animation
      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            preventOverlaps: true,
          },
        });

        tl.to(imageRef.current, {
          opacity: 0.2,
          duration: 1.5,
          ease: "none",
        })
        .to('.hero-line', {
          opacity: 1,
          y: 0,
          stagger: 0.25, //  reduced load
          duration: 1.5,
          ease: "power2.out",
        }, "<0.1")
        .to('.social-icon', {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power2.out",
        }, "-=0.8");
      }

      //  Mobile: Lightweight animation (NO PIN)
      else {
        gsap.to(imageRef.current, {
          opacity: 0.3,
          duration: 1.2,
          ease: "power1.out",
          delay: 2,
        });

        gsap.to('.hero-line', {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: "power2.out",
          delay: 2,
        });

        gsap.to('.social-icon', {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          delay: 2,
        });
      }

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
      {/* ✅ Optimized Image Rendering */}
      <div ref={imageRef} className="absolute inset-0 z-0 h-[100dvh] w-full will-change-opacity">
        <picture>
          <source media="(max-width: 768px)" srcSet={heroMobile} type="image/webp"  />
          <img 
  src={heroImage}
  alt="Jims"
  className="h-full w-full object-cover object-[center_20%] md:object-center pointer-events-none"
  loading="eager"
  fetchpriority="high"
  decoding="async"
/>
        </picture>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 flex h-[100dvh] w-full items-center justify-center px-6 py-20">
        <div className="font-extrabold leading-[1.2] md:leading-[1.1] text-center space-y-2 md:space-y-3 max-w-3xl">
          <div className="hero-line text-[clamp(2rem,7vw,5.2rem)] will-change-transform transform-gpu">I turn</div>
          <div className="hero-line text-[clamp(2rem,7vw,5.2rem)] will-change-transform transform-gpu" style={textGradient}>concepts</div>
          <div className="hero-line text-[clamp(2rem,7vw,5.2rem)] will-change-transform transform-gpu">into</div>
          <div className="hero-line text-[clamp(2rem,7vw,5.2rem)] will-change-transform transform-gpu">
            <span style={textGradient}>code</span> that
          </div>
          <div className="hero-line text-[clamp(2rem,7vw,5.5rem)] will-change-transform transform-gpu">
            <span className="whitespace-nowrap">solves problems</span>
          </div>
          <div className="hero-line text-[clamp(2rem,7vw,5.2rem)] will-change-transform transform-gpu">efficiently.</div>
        </div>
      </div>

      {/* SOCIAL LINKS */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 z-20">
        <div className="flex flex-col items-center gap-8">
          <div className="social-icon w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent opacity-50" />
          <a href="https://github.com/jimstel" target="_blank" rel="noopener noreferrer" className="social-icon text-neutral-500 hover:text-white transition-all hover:scale-110 active:scale-95">
            <Github className="h-5 w-5 md:h-6 md:w-6" />
          </a>
          <a href="https://www.linkedin.com/in/jimstel-jaccob-jasiah-a-b5a464247/" target="_blank" rel="noopener noreferrer" className="social-icon text-neutral-500 hover:text-white transition-all hover:scale-110 active:scale-95">
            <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
          </a>
          <a href="mailto:jimsteljaccobjasiah@gmail.com" className="social-icon text-neutral-500 hover:text-white transition-all hover:scale-110 active:scale-95">
            <Mail className="h-5 w-5 md:h-6 md:w-6" />
          </a>
          <div className="social-icon w-[1px] h-12 bg-gradient-to-t from-blue-500 to-transparent opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;