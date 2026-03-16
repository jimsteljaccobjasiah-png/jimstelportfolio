import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const laptopRef = useRef(null);
  const screenContentRef = useRef(null);
  const lidRef = useRef(null);
  const keyboardRef = useRef(null);
  const headerGroupRef = useRef(null);
  const hintRef = useRef(null);

  const projectList = [
    { 
      title: "SIP_CALCULATOR", 
      cat: "FINANCIAL_UI_ENGINEERING", 
      tech: "JS_CORE // CHART.JS // TAILWIND", 
      img: "/projects/sip-calculator.png" 
    },
    { 
      title: "SENTI_THERAPIST", 
      cat: "AI_MENTAL_HEALTH_ASSISTANT", 
      tech: "PYTHON // RASA // FLASK // NLP", 
      img: "/projects/chatbot-screenshot.png" 
    },
    { 
      /* MACHA: DROWSINESS DETECTION REPLACES FACE REC DA! */
      title: "DROWSY_DETECT_AI", 
      cat: "REAL_TIME_SAFETY_MONITORING", 
      tech: "PYTHON // OPENCV // DJANGO // NUMPY", 
      img: "/projects/drowsiness-detection.png" // Use a screenshot of the EAR landmarks da!
    },
    { 
      title: "DOC_CONVERTER", 
      cat: "DOCUMENT_AI_UTILITY", 
      tech: "PYTHON // FLASK // PYPDF2", 
      img: "/projects/doc-converter.png" 
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=6000",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        }
      });

      gsap.set(laptopRef.current, { opacity: 0, scale: 0.8, y: 100 });
      gsap.set(hintRef.current, { opacity: 1, y: 0 });

      tl.to(headerGroupRef.current, { 
        x: -200, 
        opacity: 0, 
        filter: "blur(15px)",
        duration: 1.5, 
        ease: "power2.inOut" 
      })
      .to(laptopRef.current, { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 1.5, 
        ease: "power2.out" 
      }, "<") 

      .to(lidRef.current, { 
        rotationX: 0, 
        duration: 2, 
        ease: "power3.inOut",
        force3D: true 
      })
      .to(hintRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.in"
      }, "<")
      .to(keyboardRef.current, { opacity: 1, filter: "brightness(1.2)", duration: 1.5 }, "<")
      .to(".cinematic-glow", { opacity: 1, scale: 1.2, duration: 2 }, "<")
      .to(".screen-power-on", { opacity: 1, duration: 0.5 }, "-=0.8")
      
      .to(laptopRef.current, { 
        scale: window.innerWidth > 1024 ? 1.15 : 1.3, 
        y: window.innerWidth > 1024 ? 40 : -20, 
        duration: 1.5, 
        force3D: true 
      })
      .to(screenContentRef.current, {
        y: () => -(screenContentRef.current.scrollHeight - 600),
        duration: 5,
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#010101] flex flex-col items-center justify-center overflow-hidden font-['Outfit'] select-none">
      
      <div className="cinematic-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full opacity-0 blur-[180px] pointer-events-none z-0 will-change-transform" />
      <div className="absolute bottom-0 w-full h-[25vh] bg-gradient-to-t from-blue-900/5 to-transparent pointer-events-none z-0" />

      <div ref={headerGroupRef} className="absolute top-10 left-10 md:top-20 md:left-24 z-50 pointer-events-none will-change-transform text-left">
        <h2 className="text-blue-500 font-['Space_Mono'] text-[9px] md:text-[11px] tracking-[0.8em] mb-2 uppercase opacity-40 font-bold">
          // SECTION_04.MISSION_ARCHIVE
        </h2>
        <h1 className="text-4xl md:text-7xl lg:text-[7rem] font-black text-white tracking-tighter uppercase italic leading-[0.8] drop-shadow-2xl">
          Featured<br/>Projects
        </h1>
      </div>

      <div className="flex flex-col items-center gap-8 md:gap-12">
        <div ref={laptopRef} className="relative w-[340px] h-[220px] md:w-[900px] md:h-[580px] z-10 will-change-transform" style={{ perspective: "2500px", transformStyle: "preserve-3d" }}>
          
          <div 
            ref={lidRef}
            className="absolute inset-0 bg-[#1a1a1a] border-[4px] md:border-[6px] border-[#222] rounded-t-2xl origin-bottom overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] will-change-transform"
            style={{ 
              transform: "rotateX(-95deg)", 
              transformStyle: "preserve-3d", 
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden" 
            }}
          >
            <div className="relative w-full h-full bg-black">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 md:w-56 h-3 md:h-6 bg-[#0c0c0c] rounded-b-xl z-30 flex items-center justify-center px-4">
                  <div className="w-1 md:w-2 h-1 md:h-2 rounded-full bg-green-500/30 shadow-[0_0_8px_#22c55e] animate-pulse" />
              </div>

              <div ref={screenContentRef} className="screen-power-on opacity-0 flex flex-col gap-20 p-6 pt-24 md:pt-32 transition-opacity duration-1000 will-change-transform">
                {projectList.map((proj, i) => (
                  <div key={i} className="relative group w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-[#050505]">
                    <img src={proj.img} className="w-full h-full object-cover opacity-80" alt={proj.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-right z-20">
                        <p className="text-blue-500 font-['Space_Mono'] text-[8px] md:text-[10px] tracking-[0.5em] uppercase mb-1 font-bold">{proj.cat}</p>
                        <h3 className="text-white font-black italic uppercase tracking-tighter text-3xl md:text-6xl mb-3">{proj.title}</h3>
                        <div className="flex justify-end gap-3 flex-wrap">
                          {proj.tech.split(' // ').map(t => (
                            <span key={t} className="text-[7px] md:text-[9px] font-['Space_Mono'] text-white/40 border border-white/10 px-2 py-1 tracking-widest uppercase bg-white/[0.02]">
                              {t}
                            </span>
                          ))}
                        </div>
                    </div>
                  </div>
                ))}
                <div className="h-64 flex items-center justify-center text-white/5 font-['Space_Mono'] text-xs uppercase tracking-[2em]">DATA_STREAM_END</div>
              </div>
            </div>
          </div>

          <div ref={keyboardRef} className="absolute top-full left-1/2 -translate-x-1/2 w-[114%] h-5 md:h-9 bg-[#2a2a2a] rounded-b-[2.5rem] opacity-0 border-t border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] will-change-transform" style={{ transform: "translateY(-1px)", transformStyle: "preserve-3d" }} />
        </div>

        <div ref={hintRef} className="flex flex-col items-center gap-4 z-20">
           <span className="font-['Space_Mono'] text-[9px] md:text-[11px] tracking-[0.5em] text-blue-500 animate-pulse uppercase font-bold">
             [ KEEP SCROLLING TO UNVEIL ]
           </span>
           <div className="w-[1px] h-10 bg-gradient-to-b from-blue-500 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Projects;