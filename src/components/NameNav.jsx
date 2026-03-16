import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const NameNav = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsVisible(latest < 50); 
    });
  }, [scrollY]);

  return (
    <>
      {/* --- TOP CINEMATIC NAME (DEEP SHIMMER) --- */}
      <div className="fixed top-0 left-0 w-full z-[110] flex justify-center pt-6 md:pt-10 pointer-events-none px-6">
        <motion.div
          animate={{ 
            y: isVisible ? 0 : -150, 
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.95
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto cursor-default group relative max-w-full"
        >
          <div className="relative px-8 md:px-16 py-4 flex flex-col items-center justify-center overflow-hidden">
            
            {/* 1. DEEP SHIMMER LAYERS DA! */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {/* Primary Fast Blade */}
              <motion.div 
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent skew-x-[-25deg] blur-[2px]"
              />
              {/* Secondary Soft Trail */}
              <motion.div 
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "100%", opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.2, delay: 0.1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] blur-[8px]"
              />
            </div>

            {/* 2. THE TEXT IDENTITY */}
            <h1 
              className="text-white font-black text-xs sm:text-sm md:text-2xl uppercase italic relative z-10 text-center leading-none transition-all duration-700 ease-[0.22, 1, 0.36, 1] tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.6em] group-hover:tracking-[0.75em]"
            >
              <span className="opacity-30 group-hover:opacity-100 group-hover:text-white transition-all duration-500">JIMSTEL</span>
              
              <span className="relative inline-block px-2 md:px-6">
                <span className="text-blue-500 transition-all duration-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] group-hover:drop-shadow-[0_0_30px_rgba(59,130,246,1)]">
                  JACCOB
                </span>
                {/* Internal text glow da! */}
                <span className="absolute inset-0 text-blue-400 blur-[10px] opacity-0 group-hover:opacity-40 transition-opacity duration-500">JACCOB</span>
              </span>

              <span className="opacity-30 group-hover:opacity-100 group-hover:text-white transition-all duration-500">JASIAH</span>
            </h1>

            {/* 3. TACTICAL HUD ELEMENTS */}
            <div className="hidden md:block absolute top-0 left-0 w-6 h-full border-l-[1px] border-t-[1px] border-blue-500/30 group-hover:border-blue-500 group-hover:h-3/4 transition-all duration-700" />
            <div className="hidden md:block absolute top-0 right-0 w-6 h-full border-r-[1px] border-t-[1px] border-blue-500/30 group-hover:border-blue-500 group-hover:h-3/4 transition-all duration-700" />
            
            {/* Interactive Bottom Scanning Line */}
            <motion.div 
              initial={{ width: "20%", opacity: 0.2 }}
              whileHover={{ width: "100%", opacity: 1 }}
              className="absolute bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] transition-all duration-700"
            />
          </div>

          {/* Background Atmospheric Pulse */}
          {!isMobile && (
            <div className="absolute inset-0 bg-blue-600/5 blur-[60px] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          )}
        </motion.div>
      </div>

      {/* --- SIDE IDENTITIES --- */}
      <div className="fixed left-0 top-0 h-full w-8 md:w-16 z-[90] flex flex-col items-center justify-center pointer-events-none opacity-40">
        <div className="absolute left-4 md:left-6 top-[25%] bottom-[25%] w-[1px] bg-white/5 overflow-hidden">
          <motion.div className="w-full bg-blue-500 origin-top shadow-[0_0_15px_#3b82f6]" style={{ scaleY, height: '100%' }} />
        </div>
        
        <div className="hidden sm:flex relative flex-col items-center py-12 h-full justify-between">
          <div className="rotate-[-90deg] whitespace-nowrap text-[6px] md:text-[8px] tracking-[1em] text-white uppercase font-black opacity-20">SYSTEM_AUTHENTICATED</div>
          <div className="rotate-[-90deg] whitespace-nowrap text-[6px] md:text-[8px] tracking-[0.5em] text-blue-500 uppercase font-bold italic opacity-30">NAGERCOIL_NODE_v3.16</div>
        </div>
      </div>
    </>
  );
};

export default NameNav;