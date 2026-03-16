import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Copyright } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black pt-32 pb-10 px-6 border-t border-white/5">
      <div className="container max-w-7xl mx-auto relative z-10">
        
        {/* TOP SECTION: MASSIVE BRANDING & ACTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
          <div className="space-y-6">
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-[0.8]">
              JIMSTEL <br /> <span className="text-blue-600">JACCOB.</span>
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl font-light max-w-md uppercase tracking-tight">
              Software engineer & Developer
            </p>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -10 }}
            className="group flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
              <ArrowUp size={30} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/40 group-hover:text-white transition-colors">
              Back_To_Top
            </span>
          </motion.button>
        </div>

        {/* MIDDLE SECTION: COMMERCIAL LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-white/5 py-16 mb-12">
          <div className="space-y-6">
            <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em]">Navigation</p>
            <ul className="space-y-4 text-sm font-medium text-neutral-500">
              <li><a href="#home" className="hover:text-white transition-colors uppercase italic">Index</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors uppercase italic">Works</a></li>
              <li><a href="#about" className="hover:text-white transition-colors uppercase italic">Identity</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors uppercase italic">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em]">Socials</p>
            <ul className="space-y-4 text-sm font-medium text-neutral-500">
              <li>
                <a 
                  href="https://www.linkedin.com/in/jimstel-jaccob-jasiah-a-b5a464247/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors uppercase italic"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/jimstel" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors uppercase italic"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 space-y-6">
            <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em]">Inquiries</p>
            <a href="mailto:jimsteljaccobjasiah@gmail.com" className="text-2xl md:text-4xl font-black text-white hover:text-blue-500 transition-colors lowercase italic tracking-tighter">
              jimsteljaccobjasiah@gmail.com
            </a>
            <p className="text-neutral-600 text-xs uppercase tracking-widest">Available for worldwide collaborations.</p>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            <Copyright size={12} />
            <span>2026 DEVELOPED BY JIMS. ALL RIGHTS RESERVED.</span>
          </div>
          
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            MADE IN NAGERCOIL // INDIA
          </div>
        </div>

      </div>

      {/* TITAN WATERMARK */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02]">
        <h1 className="text-[25rem] font-black text-white leading-none -mb-20 tracking-tighter uppercase italic">
          JIMSTEL
        </h1>
      </div>
    </footer>
  );
};

export default Footer;