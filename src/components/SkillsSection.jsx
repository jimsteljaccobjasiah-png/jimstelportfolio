import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const sectionRef = useRef(null);
  const wheelRef = useRef(null);

  const skills = [
    { name: "React", icon: "⚛️", desc: "UI ARCHITECTURE" },
    { name: "Next.js", icon: "▲", desc: "FULLSTACK OPS" },
    { name: "Node.js", icon: "🟢", desc: "BACKEND CORE" },
    { name: "PyTorch", icon: "🔥", desc: "NEURAL NETS" },
    { name: "Postgres", icon: "🐘", desc: "DATA SYSTEMS" },
    { name: "Python", icon: "🐍", desc: "AI WORKFLOWS" },
    { name: "Docker", icon: "🐳", desc: "VIRTUALIZATION" },
    { name: "Tailwind", icon: "🌊", desc: "DESIGN ENGINE" },
    
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".tech-card");
      const totalCards = cards.length;
      const angleStep = 360 / totalCards;
      const radius = window.innerWidth < 768 ? 260 : 480; 

      // 1. CLEAN 3D SETUP
      cards.forEach((card, i) => {
        const angle = i * angleStep;
        gsap.set(card, {
          transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
          opacity: 0.4, 
          filter: "brightness(1.1) contrast(1.2)",
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1,
        }
      });

      tl.to(wheelRef.current, {
        rotateY: -360,
        ease: "none",
        duration: 1
      });

      // 2. HERO REVEAL LOGIC
      cards.forEach((card, i) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: () => `top+=${(i / totalCards) * 3000} top`,
            end: () => `top+=${((i + 0.3) / totalCards) * 3000} top`,
            scrub: true,
            containerAnimation: tl
          }
        })
          .to(card, {
            opacity: 1,
            filter: "brightness(1.4) saturate(1.4)",
            scale: 1.1,
            duration: 0.2
          })
          .to(card.querySelector(".data-reveal"), { width: "100%", duration: 0.2 }, "<")
          .to(card, {
            opacity: 0.4,
            filter: "brightness(0.9) contrast(1.1)",
            scale: 1,
            duration: 0.2,
          });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#020202] overflow-hidden flex flex-col items-center justify-center font-['Outfit'] select-none">
      
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[200px] rounded-full pointer-events-none" />

      {/* FIXED HEADER: Shifted left for better composition */}
      <div className="absolute top-0 left-0 w-full pt-16 md:pt-24 z-50 pointer-events-none">
        <div className="container mx-auto px-10 md:px-24">
          <h2 className="text-blue-500 font-['Space_Mono'] text-[10px] md:text-xs tracking-[0.7em] mb-4 uppercase font-bold opacity-80">
            // 03. TECH_ENERGY_CORE
          </h2>
          <h1 className="text-5xl md:text-[7rem] font-black text-white tracking-tighter uppercase italic leading-[0.75] opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            TECH STACK
          </h1>
        </div>
      </div>

      {/* 3D WHEEL Container: Shifted down (mt-20) to avoid title overlap */}
      <div className="relative w-full h-full flex items-center justify-center mt-32 md:mt-40" style={{ perspective: "2000px" }}>
        <div
          ref={wheelRef}
          className="relative w-[280px] h-[380px] md:w-[380px] md:h-[500px] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {skills.map((skill, i) => (
            <div
              key={i}
              className="tech-card absolute w-full h-full bg-[#0a0a0a]/95 border border-white/20 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center shadow-[0_0_100px_rgba(0,0,0,1)]"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="text-8xl md:text-[11rem] mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
                {skill.icon}
              </div>

              <div className="space-y-4 relative z-10">
                <h3 className="text-3xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                  {skill.name}
                </h3>
                <p className="text-blue-500 font-['Space_Mono'] text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">
                  {skill.desc}
                </p>
                <div className="mt-8 w-full h-[2px] bg-white/10 relative overflow-hidden">
                  <div className="data-reveal absolute top-0 left-0 h-full w-0 bg-blue-500 shadow-[0_0_15px_#3b82f6]" />
                </div>
              </div>

              <div className="absolute bottom-10 font-['Space_Mono'] text-[9px] text-white/30 tracking-[0.6em] uppercase">
                NODE_0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic Status Footer */}
      <div className="absolute bottom-12 w-full flex justify-center items-center opacity-40">
         <div className="flex items-center gap-8">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <span className="font-['Space_Mono'] text-[10px] text-white tracking-[1em] uppercase">Scroll to rotate</span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent via-blue-500 to-transparent" />
         </div>
      </div>
    </section>
  );
};

export default TechStack;
