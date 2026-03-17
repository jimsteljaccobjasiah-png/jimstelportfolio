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
      title: "DROWSY_DETECT_AI", 
      cat: "REAL_TIME_SAFETY_MONITORING", 
      tech: "PYTHON // OPENCV // DJANGO // NUMPY", 
      img: "/projects/drowsiness-detection.png" 
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

      const getScrollAmount = () => {
        const content = screenContentRef.current;
        const container = laptopRef.current;

        if (!content || !container) return 0;

        const contentHeight = content.scrollHeight;
        const visibleHeight = container.offsetHeight;

        return -(contentHeight - visibleHeight * 0.75); // 🔥 dynamic fix
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1.2,
        }
      });

      gsap.set(laptopRef.current, { opacity: 0, scale: 0.85, y: 80 });
      gsap.set(hintRef.current, { opacity: 1 });

      tl.to(headerGroupRef.current, { 
        x: -200, 
        opacity: 0, 
        filter: "blur(10px)",
        duration: 1.2 
      })

      .to(laptopRef.current, { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        duration: 1.2 
      }, "<")

      .to(lidRef.current, { 
        rotationX: 0, 
        duration: 1.8,
        ease: "power3.inOut"
      })

      .to(hintRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, "<")

      .to(keyboardRef.current, { 
        opacity: 1, 
        duration: 1 
      }, "<")

      .to(".screen-power-on", { 
        opacity: 1, 
        duration: 0.5 
      })

      // 🔥 RESPONSIVE SCALE FIX
      .to(laptopRef.current, { 
        scale: () => window.innerWidth < 768 ? 1.1 : 1.15,
        y: () => window.innerWidth < 768 ? -10 : 30,
        duration: 1.2
      })

      // 🔥 DYNAMIC SCROLL FIX
      .to(screenContentRef.current, {
        y: getScrollAmount,
        duration: 5,
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#010101] flex items-center justify-center overflow-hidden">

      {/* glow */}
      <div className="absolute w-[800px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full" />

      {/* HEADER */}
      <div ref={headerGroupRef} className="absolute top-10 left-6 md:left-20 z-50">
        <h2 className="text-blue-500 text-[10px] tracking-[0.6em] opacity-50">
          // PROJECTS
        </h2>
        <h1 className="text-3xl md:text-6xl font-black text-white italic leading-tight">
          Featured Projects
        </h1>
      </div>

      {/* LAPTOP */}
      <div className="flex flex-col items-center">

        <div 
          ref={laptopRef}
          className="relative w-[300px] h-[200px] sm:w-[500px] sm:h-[320px] md:w-[800px] md:h-[500px]"
          style={{ perspective: "2000px" }}
        >

          {/* SCREEN */}
          <div 
            ref={lidRef}
            className="absolute inset-0 bg-black rounded-xl overflow-hidden origin-bottom"
            style={{ transform: "rotateX(-90deg)" }}
          >

            <div className="w-full h-full bg-black overflow-hidden">

              <div 
                ref={screenContentRef}
                className="screen-power-on opacity-0 flex flex-col gap-16 p-4 md:p-10 pt-16 md:pt-24"
              >
                {projectList.map((proj, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden">
                    <img src={proj.img} className="w-full h-full object-cover opacity-80" />
                    
                    <div className="absolute bottom-4 right-4 text-right">
                      <p className="text-blue-400 text-[8px] md:text-xs tracking-widest">
                        {proj.cat}
                      </p>
                      <h3 className="text-white text-xl md:text-4xl font-bold italic">
                        {proj.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* KEYBOARD */}
          <div 
            ref={keyboardRef}
            className="absolute top-full left-1/2 -translate-x-1/2 w-[110%] h-4 md:h-8 bg-[#222] rounded-b-xl opacity-0"
          />

        </div>

        {/* SCROLL HINT */}
        <div ref={hintRef} className="mt-6 text-blue-400 text-xs tracking-widest animate-pulse">
          SCROLL
        </div>

      </div>
    </section>
  );
};

export default Projects;