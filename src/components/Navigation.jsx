import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fingerprint, X, Home, Cpu, 
  Briefcase, Mail, LayoutGrid, Terminal, Zap
} from 'lucide-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);

    const ctx = gsap.context(() => {
      gsap.to(".biometric-scan-line", {
        y: isMobile ? 40 : 50,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(".circular-text", { rotation: 360, duration: 20, repeat: -1, ease: "none" });
      gsap.to(".ring-inner", { rotation: 360, duration: 8, repeat: -1, ease: "none" });
      gsap.to(".ring-outer", { rotation: -360, duration: 15, repeat: -1, ease: "none" });
    });

    return () => {
      window.removeEventListener('resize', checkScreen);
      ctx.revert();
    };
  }, [isMobile]);

  const navItems = [
    { id: '01', name: 'Home', icon: <Home size={18} />, href: '#home', angle: -90 },
    { id: '02', name: 'About', icon: <Cpu size={18} />, href: '#about', angle: -128 },
    { id: '03', name: 'Expertise', icon: <Terminal size={18} />, href: '#expertise', angle: -166 },
    { id: '04', name: 'Projects', icon: <LayoutGrid size={18} />, href: '#projects', angle: -204 },
    { id: '05', name: 'Skills', icon: <Zap size={18} />, href: '#skills', angle: -242 },
    { id: '06', name: 'Contact', icon: <Mail size={18} />, href: '#contact', angle: -280 },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex items-center justify-center font-['Space_Mono']">
      
      <AnimatePresence>
        {isOpen && (
          <>
            {navItems.map((item, i) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  x: (Math.cos(item.angle * (Math.PI / 180)) * (isMobile ? 100 : 135)) - (isMobile ? 90 : 110), 
                  y: (Math.sin(item.angle * (Math.PI / 180)) * (isMobile ? 100 : 135)) - (isMobile ? 90 : 110) 
                }}
                exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.04 }}
                className="absolute group flex items-center justify-center outline-none"
              >
                {/* MACHA: Labels hidden on mobile (hidden), shown only on desktop hover (md:flex md:opacity-0 group-hover:opacity-100) */}
                <div className="absolute -top-14 transition-all duration-300 transform hidden md:flex flex-col items-center pointer-events-none md:opacity-0 group-hover:opacity-100 group-hover:-translate-y-2">
                   <span className="text-[6px] text-blue-400 font-bold tracking-[0.4em] mb-1">UNIT_{item.id}</span>
                   <span className="bg-blue-600/90 text-white text-[9px] px-3 py-1 rounded-sm backdrop-blur-md border border-white/20 uppercase tracking-widest whitespace-nowrap shadow-2xl">
                     {item.name}
                   </span>
                </div>

                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/80 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white/70 shadow-2xl group-hover:text-blue-400 group-hover:border-blue-500/50 transition-all duration-300">
                  {item.icon}
                </div>
              </motion.button>
            ))}
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] pointer-events-none" 
            />
          </>
        )}
      </AnimatePresence>

      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center group outline-none"
      >
        <div className={`circular-text absolute inset-[-30px] md:inset-[-40px] pointer-events-none transition-opacity duration-500 ${isHovered || isOpen ? 'opacity-100' : 'opacity-20'}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
            <text className="text-[5px] uppercase font-bold tracking-[0.6em] fill-blue-500/60">
              <textPath href="#circlePath">
                MODERN NAV INTERFACE • SYSTEM CORE V3 • 
              </textPath>
            </text>
          </svg>
        </div>

        <div className={`ring-outer absolute inset-[-15px] md:inset-[-20px] border border-blue-500/10 rounded-full transition-opacity duration-500 ${isHovered || isOpen ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`ring-inner absolute inset-[-5px] md:inset-[-10px] border-t-2 border-r-2 border-blue-500/40 rounded-full transition-all duration-500 ${isHovered || isOpen ? 'scale-110 opacity-100' : 'scale-100 opacity-0'}`} />

        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-700 to-blue-900 border-2 border-white/20 overflow-hidden shadow-[0_0_60px_rgba(37,99,235,0.5)] flex items-center justify-center z-10">
          <div className="biometric-scan-line absolute top-0 left-0 w-full h-[1px] bg-cyan-300 shadow-[0_0_15px_#67e8f9] z-20" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={28} className="text-white md:hidden" />
                <X size={32} className="text-white hidden md:block" />
              </motion.div>
            ) : (
              <motion.div key="fp" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.2, opacity: 0 }}>
                <Fingerprint size={30} className="text-white md:hidden animate-pulse" />
                <Fingerprint size={36} className={`text-white hidden md:block transition-all ${isHovered ? 'opacity-100 scale-110' : 'opacity-60 animate-pulse'}`} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4px_4px]" />
        </div>
      </motion.button>
    </div>
  );
};

export default Navigation;