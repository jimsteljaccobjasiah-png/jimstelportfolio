import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Scramble Hook ---
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
    ScrollTrigger.refresh();

    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.service-panel');
      
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${services.length * 200}%`,
          pin: true,
          scrub: 0.8, 
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              services.length - 1,
              Math.floor(self.progress * (services.length + 0.1))
            );
            setActiveIndex(index);
          }
        }
      });

      panels.forEach((panel, i) => {
        const img = panel.querySelector('.service-img');
        const badges = panel.querySelectorAll('.tech-badge');
        
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

        mainTl.fromTo(badges, 
          { y: 15, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.4, ease: "power2.out" },
          i + 0.3
        );

        mainTl.fromTo(img, 
          { filter: 'grayscale(0%) brightness(1.5)' },
          { filter: 'grayscale(100%) brightness(1)', ease: "none", duration: 1 },
          i
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#080808] w-full h-screen overflow-hidden text-white font-['Outfit'] select-none">
      
      {/* --- ADDED HEADER (Matches About pattern) --- */}
      <div className="absolute top-0 left-0 w-full pt-8 md:pt-20 z-50 pointer-events-none">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-blue-500 font-['Space_Mono'] text-[10px] md:text-xs tracking-[0.5em] mb-2 md:mb-4 uppercase opacity-70">
            // 02. THE EXPERTISE
          </h2>
          <h1 className="text-4xl md:text-8xl font-bold font-['Outfit'] text-white tracking-tighter">
            What I Do
          </h1>
        </div>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-40 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-10" />

      {/* Large Background Index */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-[0.03] pointer-events-none">
        <h1 className="text-[55vw] font-black tracking-tighter leading-none will-change-transform">
          0{activeIndex + 1}
        </h1>
      </div>

      <div className="relative w-full h-full">
        {services.map((service, i) => (
          <div 
            key={i} 
            className="service-panel absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-12 lg:px-20 bg-[#080808]"
            style={{ 
              zIndex: i + 1,
              opacity: activeIndex === i ? 1 : (i === 0 && activeIndex === 0 ? 1 : 0),
              pointerEvents: activeIndex === i ? 'auto' : 'none',
              transition: 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
            {/* LEFT CONTENT - pt-20 added for mobile header clearance */}
            <div className="relative z-10 w-full md:w-[60%] flex flex-col items-start text-left pt-24 md:pt-0">
              <div className="kinetic-text w-full max-w-2xl pr-4 md:pr-10">
                <h2 className="text-blue-500 font-['Space_Mono'] text-[10px] md:text-xs tracking-[0.5em] mb-3 md:mb-5 uppercase opacity-70">
                  // EXPERTISE.0{i + 1}
                </h2>
                
                <ScrambleTitle 
                  title={service.title} 
                  sub={service.sub} 
                  isActive={activeIndex === i} 
                />

                <p className="mt-6 md:mt-10 text-white/40 text-sm md:text-base lg:text-lg max-w-lg font-light leading-relaxed">
                  {service.desc}
                </p>

                <div className="mt-8 md:mt-12 flex flex-wrap gap-2 md:gap-3">
                  {service.tech.map(t => (
                    <div 
                      key={t} 
                      className="tech-badge group relative flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 border border-white/10 bg-white/5 cursor-crosshair overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:-translate-y-1"
                    >
                      <div className="absolute inset-y-0 left-0 w-[2px] bg-blue-500 -translate-x-full group-hover:translate-x-[200px] transition-transform duration-1000 ease-in-out opacity-30" />
                      <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[9px] md:text-[10px] font-['Space_Mono'] tracking-widest text-white/60 group-hover:text-white transition-colors uppercase">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative w-[80%] md:w-[35%] lg:w-[30%] aspect-square md:aspect-[4/5] overflow-hidden mt-10 md:mt-0 border border-white/5 group transition-all duration-700 rounded-sm">
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-color z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src={service.img} 
                className="service-img w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100 group-hover:!filter-none will-change-transform"
                alt={service.title}
                loading="lazy"
              />
              <div className="absolute bottom-4 right-4 z-20 font-['Space_Mono'] text-[8px] tracking-widest opacity-40 bg-black/60 px-2 py-1 uppercase">
                [ {activeIndex === i ? 'Live_Feed' : 'Data_Locked'} ]
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-50 flex items-center gap-6 text-white uppercase font-['Space_Mono']">
        <div className="flex flex-col gap-2">
           {services.map((_, i) => (
             <div 
               key={i} 
               className={`h-[1px] md:h-[1.5px] transition-all duration-700 ease-in-out ${activeIndex === i ? 'w-12 md:w-16 bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'w-6 md:w-8 bg-white/10'}`} 
             />
           ))}
        </div>
        <span className="text-[8px] md:text-[10px] tracking-[0.4em] opacity-40">SYSTEM_PROTOCOL</span>
      </div>
    </section>
  );
};

export default WhatIDo;
