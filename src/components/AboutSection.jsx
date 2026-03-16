import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const progressLineRef = useRef(null);
  const bottomLineRef = useRef(null); 
  const counterRef = useRef(null);
  const marqueeRef = useRef(null);
  
  const aboutText = [
    "I’m Jims, currently pursuing my Master’s in Computer Science Engineering, but my real education happens in every project I take on experimenting, rebuilding, testing and learning how to create things that actually matter.",
    "I use AI-powered tools and modern development techniques to build powerful, scalable digital products.",
    "Creating systems that are practical and meaningful. Whether it's a web application, an automation tool, or a problem-solving script, I focus on building solutions that are simple, reliable, and useful.",
    "I’m not here to compete with others. I’m here to build, learn, and create work that speaks for itself.",
    "And if you have an idea worth building, I’d be glad to be part of that journey."
  ];

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.about-card');
      const totalCards = cards.length;
      
      // 1. Horizontal Marquee Animation
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      // 2. Main Stacking Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalCards * 50}%`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
        }
      });

      cards.forEach((card, i) => {
        const label = `step-${i}`;

        // Side Progress Line Sync
        tl.to(progressLineRef.current, {
          scaleY: (i + 1) / totalCards,
          ease: "power1.inOut",
          duration: 1,
        }, label);

        // Bottom Reveal Line Sync
        tl.to(bottomLineRef.current, {
          scaleX: (i + 1) / totalCards,
          opacity: 1,
          ease: "power1.inOut",
          duration: 1,
        }, label);

        // Counter Flip
        tl.to(counterRef.current, {
          innerText: i + 1,
          snap: { innerText: 1 },
          duration: 0.2,
        }, label);

        // Card Entrance
        if (i !== 0) {
          tl.fromTo(card, 
            { yPercent: 100, opacity: 0 },
            { 
              yPercent: 0, 
              opacity: 1, 
              duration: 1, 
              ease: "none",
              willChange: "transform, opacity"
            }, 
            label
          );
        }
        
        // Card Exit (Blur & Scale)
        if (i < totalCards - 1) {
          tl.to(cards[i], {
            filter: "blur(15px)",
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: "none"
          }, `step-${i + 1}`);
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sharedGradient = {
    backgroundImage: 'linear-gradient(135deg, #fff 0%, #3b82f6 70%, #2563eb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-black w-full overflow-hidden h-[100vh]"
    >
      {/* --- HEADER & MARQUEE (TOP ANCHOR) --- */}
      <div className="absolute top-0 left-0 w-full z-50 bg-black">
        <div className="pt-12 md:pt-20 pb-6 container mx-auto px-6 md:px-12">
          <h2 className="text-blue-500 font-['Space_Mono'] text-[10px] md:text-sm uppercase tracking-[0.5em] opacity-70 mb-2">
            // 01. THE JOURNEY
          </h2>
          <h1 className="text-4xl md:text-8xl font-bold font-['Outfit'] text-white tracking-tighter">
            About Me
          </h1>
        </div>

        {/* Horizontal Marquee Bar */}
        <div className="relative w-full border-y border-white/5 py-4 overflow-hidden bg-black/80 backdrop-blur-md">
          <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
            {[...Array(4)].map((_, i) => (
              <span 
                key={i} 
                style={sharedGradient}
                className="text-xl md:text-4xl font-['Archivo_Black'] uppercase tracking-tighter px-8 md:px-12"
              >
                Jims — Software Engineer & Developer —
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- SIDE PROGRESS TRACKER --- */}
      <div className="absolute right-6 md:right-16 bottom-20 z-50 flex flex-col items-center gap-6">
        <div className="text-white font-['Space_Mono'] text-lg md:text-2xl font-bold flex flex-col items-center">
          <span className="text-blue-500">0<span ref={counterRef}>1</span></span>
          <span className="text-white/10 text-xs">—</span>
          <span className="text-white/10 text-xs">0{aboutText.length}</span>
        </div>
        <div className="relative h-32 md:h-64 w-[1px] bg-white/5 overflow-hidden">
          <div 
            ref={progressLineRef}
            className="absolute top-0 left-0 w-full h-full bg-blue-500 origin-top scale-y-0 will-change-transform"
          />
        </div>
      </div>

      {/* --- MAIN CONTENT AREA (PUSHED DOWN TO PREVENT OVERLAP) --- */}
      <div className="relative h-full w-full flex items-end pb-[10vh] md:pb-[15vh] px-6 md:px-20">
        <div className="relative w-full max-w-6xl h-[40vh] flex items-center justify-center">
          {aboutText.map((text, i) => (
            <div 
              key={i} 
              className="about-card absolute inset-0 flex items-center justify-center text-center px-4"
              style={{ zIndex: i }}
            >
              <p className="text-[clamp(1.2rem,3.5vw,3rem)] font-[800] leading-[1.3] md:leading-[1.1] tracking-tighter font-['Outfit'] text-white max-w-5xl">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- BOTTOM REVEAL LINE --- */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-50">
        <div 
          ref={bottomLineRef}
          className="w-full h-full bg-blue-500 origin-center scale-x-0 opacity-0 will-change-transform"
          style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)' }}
        />
      </div>

      {/* --- BACKGROUND WATERMARK --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <h1 className="text-[25vw] font-[900] font-['Syne'] uppercase tracking-tighter text-white">
          JIMS
        </h1>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
};

export default AboutSection;