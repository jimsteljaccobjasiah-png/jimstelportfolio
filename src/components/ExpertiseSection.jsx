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
    <h3 className="flex flex-col text-[clamp(1.5rem,8vw,4.5rem)] font-[900] leading-[0.9] tracking-tighter italic uppercase min-h-[1.8em] will-change-contents">
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
      desc: "Creating complete web experiences from responsive frontends to robust backend systems.",
      tech: ["MICROSERVICES", "DJANGO", "DISTRIBUTED_DB"],
      img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000"
    },
    {
      id: "02",
      title: "AI & ML",
      sub: "ENGINEER",
      desc: "Engineering intelligent systems using machine learning and neural networks to transform complex data.",
      tech: ["PYTORCH", "TENSORFLOW", "COMPUTER_VISION"],
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000"
    },
    {
      id: "03",
      title: "PROMPT",
      sub: "ENGINEER",
      desc: "Mastering the bridge between human intent and machine execution. Crafting advanced LLM workflows.",
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
          end: `+=${services.length * 150}%`, 
          pin: true,
          scrub: 1, 
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
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: "none" }, 
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
      
      {/* HEADER SECTION - Tighter for Mobile/Hub */}
      <div className="absolute top-0 left-0 w-full pt-6 md:pt-12 z-50 pointer-events-none">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-blue-500 font-['Space_Mono'] text-[8px] md:text-xs tracking-[0.5em] mb-1 uppercase opacity-70">
           // 02. THE_EXPERTISE
          </h2>
          <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold text-white tracking-tighter">
            What I Do
          </h1>
        </div>
      </div>

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
            {/* CONTENT BLOCK - Optimized for Short & Tall screens */}
            <div className="relative z-10 w-full md:w-[55%] flex flex-col items-start justify-center pt-16 md:pt-0 h-full max-h-[60%] md:max-h-none">
              <div className="w-full max-w-2xl">
                <h2 className="text-blue-500 font-['Space_Mono'] text-[9px] md:text-xs tracking-[0.5em] mb-2 uppercase opacity-70">
                 {/* EXPERTISE.0{i + 1} */}
                </h2>
                
                <ScrambleTitle 
                  title={service.title} 
                  sub={service.sub} 
                  isActive={activeIndex === i} 
                />

                <p className="mt-2 md:mt-8 text-white/40 text-[13px] md:text-lg max-w-lg font-light leading-relaxed">
                  {service.desc}
                </p>

                <div className="mt-4 md:mt-10 flex flex-wrap gap-2 md:gap-3">
                  {service.tech.map(t => (
                    <div 
                      key={t} 
                      className="group relative flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 border border-white/10 bg-white/5"
                    >
                      <div className="w-1 h-1 rounded-full bg-blue-500" />
                      <span className="text-[8px] md:text-[10px] font-['Space_Mono'] tracking-widest text-white/60 uppercase">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* VISUAL BLOCK - Fix for Nest Hub (Landscape Short) and Mobile (Portrait Tall) */}
            <div className="relative w-full md:w-[38%] h-[30%] md:h-[60%] lg:h-[70%] max-h-[250px] md:max-h-none overflow-hidden mt-4 md:mt-0 border border-white/5 self-center">
              <img 
                src={service.img} 
                className="service-img w-full h-full object-cover will-change-transform"
                alt={service.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-40" />
            </div>
          </div>
        ))}
      </div>

      {/* Nav Indicators */}
      <div className="absolute bottom-4 md:bottom-10 left-6 md:left-12 z-50 flex items-center gap-6">
        <div className="flex flex-col gap-2">
           {services.map((_, i) => (
             <div 
               key={i} 
               className={`h-[2px] transition-all duration-500 ${activeIndex === i ? 'w-12 md:w-16 bg-blue-500' : 'w-4 md:w-6 bg-white/10'}`} 
             />
           ))}
        </div>
        <span className="text-[8px] md:text-[10px] font-['Space_Mono'] tracking-[0.4em] opacity-40 text-white">SYSTEM_PROTOCOL</span>
      </div>
    </section>
  );
};

export default WhatIDo;