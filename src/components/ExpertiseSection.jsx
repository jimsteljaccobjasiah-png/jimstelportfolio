import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Scramble Hook (Keeping your exact logic da) ---
const useScrambleText = (text, isVisible) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    if (!isVisible) {
      setDisplayText(""); 
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.15; 
    }, 40);

    return () => clearInterval(interval);
  }, [text, isVisible]);

  return displayText;
};

const ScrambleTitle = ({ title, sub, isActive }) => {
  const scrambledTitle = useScrambleText(title, isActive);
  const scrambledSub = useScrambleText(sub, isActive);

  return (
    <h3 className="flex flex-col text-[clamp(2.2rem,7vw,5rem)] font-[900] leading-[0.85] tracking-tighter italic uppercase min-h-[1.9em] will-change-contents">
      <span className="block text-white">
        {scrambledTitle || ""}
      </span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white/20">
        {scrambledSub || ""}
      </span>
    </h3>
  );
};

const WhatIDo = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      id: "01",
      title: "FULL-STACK",
      sub: "ARCHITECT",
      desc: "Architecting high-availability systems where performance meets scale. I build the backbone of modern digital ecosystems using robust, distributed infrastructures.",
      tech: ["MICROSERVICES", "KUBERNETES", "DISTRIBUTED_DB"],
      img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000"
    },
    {
      id: "02",
      title: "AI & ML",
      sub: "ENGINEER",
      desc: "Engineering intelligent systems using machine learning and neural networks to transform complex data into real-world solutions.",
      tech: ["PYTORCH", "TENSORFLOW", "COMPUTER_VISION"],
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000"
    },
    {
      id: "03",
      title: "PROMPT",
      sub: "ENGINEER",
      desc: "Mastering the bridge between human intent and machine execution. Crafting advanced LLM workflows and chain-of-thought logic to automate cognitive tasks.",
      tech: ["LLM_OPS", "LANGCHAIN", "RAG_ARCHITECT"],
      img: "https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=2000"
    }
  ];

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.service-panel');
      
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${services.length * 120}%`, // Optimized scroll length da
          pin: true,
          scrub: 1, // Butter smooth scrub
          onUpdate: (self) => {
            const index = Math.min(
              services.length - 1,
              Math.floor(self.progress * (services.length + 0.05))
            );
            setActiveIndex(index);
          }
        }
      });

      panels.forEach((panel, i) => {
        const img = panel.querySelector('.service-img');
        
        if (i !== 0) {
          mainTl.fromTo(panel, 
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { 
              clipPath: 'inset(0% 0% 0% 0%)', 
              duration: 1, 
              ease: "none",
              willChange: "clip-path" 
            }, 
            i
          );
        }

        mainTl.fromTo(img, 
          { scale: 1.2, filter: 'grayscale(100%) brightness(0.5)' },
          { scale: 1, filter: 'grayscale(0%) brightness(1)', ease: "power1.inOut", duration: 1 },
          i
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#080808] w-full h-screen overflow-hidden text-white font-['Outfit'] select-none">
      
      {/* HEADER SECTION - pt-20 for clearance */}
      <div className="absolute top-0 left-0 w-full pt-10 md:pt-20 z-50 pointer-events-none">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-blue-500 font-['Space_Mono'] text-[10px] md:text-xs tracking-[0.5em] mb-2 uppercase opacity-70">
            // 02. THE EXPERTISE
          </h2>
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">
            What I Do
          </h1>
        </div>
      </div>

      {/* Cinematic CRT/Scanline Overlays */}
      <div className="absolute inset-0 z-40 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-20" />

      <div className="relative w-full h-full">
        {services.map((service, i) => (
          <div 
            key={i} 
            className="service-panel absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-12 lg:px-20 bg-[#080808]"
            style={{ 
              zIndex: i + 1,
              opacity: activeIndex === i ? 1 : (i < activeIndex ? 1 : 0),
              visibility: activeIndex >= i - 1 ? 'visible' : 'hidden'
            }}
          >
            {/* CONTENT BLOCK - pt-32 for mobile spacing */}
            <div className="relative z-10 w-full md:w-[60%] flex flex-col items-start pt-32 md:pt-0">
              <div className="w-full max-w-2xl">
                <h2 className="text-blue-500 font-['Space_Mono'] text-[10px] md:text-xs tracking-[0.5em] mb-4 uppercase opacity-70">
                  EXPERTISE.0{i + 1}
                </h2>
                
                <ScrambleTitle 
                  title={service.title} 
                  sub={service.sub} 
                  isActive={activeIndex === i} 
                />

                <p className="mt-6 md:mt-8 text-white/40 text-base md:text-lg max-w-lg font-light leading-relaxed">
                  {service.desc}
                </p>

                <div className="mt-8 md:mt-10 flex flex-wrap gap-3">
                  {service.tech.map(t => (
                    <div 
                      key={t} 
                      className="group relative flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:border-blue-500/50"
                    >
                      <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[10px] font-['Space_Mono'] tracking-widest text-white/60 group-hover:text-white uppercase">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* VISUAL BLOCK */}
            <div className="relative w-[85%] md:w-[35%] aspect-[4/5] overflow-hidden mt-10 md:mt-0 border border-white/5">
              <img 
                src={service.img} 
                className="service-img w-full h-full object-cover will-change-transform"
                alt={service.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        ))}
      </div>

      {/* Nav Indicators */}
      <div className="absolute bottom-10 left-6 md:left-12 z-50 flex items-center gap-6">
        <div className="flex flex-col gap-2">
           {services.map((_, i) => (
             <div 
               key={i} 
               className={`h-[2px] transition-all duration-500 ${activeIndex === i ? 'w-16 bg-blue-500' : 'w-6 bg-white/10'}`} 
             />
           ))}
        </div>
        <span className="text-[10px] font-['Space_Mono'] tracking-[0.4em] opacity-40 text-white">SYSTEM_PROTOCOL</span>
      </div>
    </section>
  );
};

export default WhatIDo;