import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Linkedin, Github, Mail, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser'; 

const ContactSection = () => {
  const containerRef = useRef(null);
  const formRef = useRef(); 
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [activeInput, setActiveInput] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Butter-Smooth Scroll Physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  const textY = useTransform(smoothProgress, [0, 1], [300, -300]);
  const formY = useTransform(smoothProgress, [0, 1], [120, -120]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Social Links Configuration
  const socialLinks = [
    { Icon: Linkedin, url: "https://www.linkedin.com/in/jimstel-jaccob-jasiah-a-b5a464247/" },
    { Icon: Github, url: "https://github.com/jimstel" },
    { Icon: Mail, url: "mailto:jimsteljaccobjasiah@gmail.com" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID, 
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
      formRef.current, 
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
        setSubmitted(true);
        setLoading(false);
    }, (error) => {
        console.error("Signal Lost:", error.text);
        alert("Signal Lost. Check connection and try again da.");
        setLoading(false);
    });
  };

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative min-h-[140vh] bg-black flex items-center justify-center py-20 md:py-40 px-6 overflow-hidden select-none"
    >
      
      {/* TITAN BACKGROUND TEXT */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <h1 className="text-[12rem] sm:text-[20rem] md:text-[35rem] font-black text-white/[0.03] tracking-tighter italic uppercase leading-none">
          CONTACT
        </h1>
      </motion.div>

      <div className="container max-w-[90rem] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: THE HOOK */}
          <div className="lg:col-span-5 relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-6 mb-8 md:mb-12">
                <div className="h-[1px] w-12 md:w-20 bg-blue-500/50" />
                <span className="text-blue-400 font-['Space_Mono'] text-[9px] md:text-[11px] tracking-[0.8em] uppercase font-bold">
                  Available_for_Collaborations
                </span>
              </div>

              <h2 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-10 max-w-full overflow-hidden">
                Have a <br /> 
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-900 italic font-thin">
                  Project in Mind?
                </span>
              </h2>

              <div className="space-y-8 max-w-md mb-12 md:mb-16">
                <p className="text-neutral-400 text-lg md:text-2xl font-light leading-relaxed">
                  I help founders and teams build scalable digital products and AI-powered solutions with world-class design and engineering.
                </p>
                <p className="text-blue-500/80 text-sm md:text-xl font-medium tracking-tight">
                  Let’s create something that stands out.
                </p>
              </div>

              {/* SOCIAL LINKS UPDATED */}
              <div className="flex gap-8 md:gap-10">
                {socialLinks.map(({ Icon, url }, i) => (
                  <motion.a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: "#3b82f6" }}
                    className="text-white/20 transition-all duration-300"
                  >
                    <Icon size={24} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: THE FORM */}
          <motion.div 
            style={{ y: formY }}
            className="lg:col-span-7 relative"
          >
            <div className="relative w-full bg-[#080808]/60 backdrop-blur-3xl rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 border border-white/5 shadow-2xl group overflow-hidden min-h-[550px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    ref={formRef}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    onSubmit={handleSubmit}
                    className="space-y-12 md:space-y-20 relative z-10"
                  >
                    {[
                      { id: 1, label: "01 // FULL_NAME", ph: "Your Name", type: "text", name: "name" },
                      { id: 2, label: "02 // EMAIL_ADDRESS", ph: "Professional Email", type: "email", name: "email" },
                      { id: 3, label: "03 // PROJECT_BRIEF", ph: "Describe your vision...", type: "textarea", name: "message" }
                    ].map((field) => (
                      <div key={field.id} className="relative group/input">
                        <p className={`text-[8px] md:text-[10px] uppercase tracking-[0.5em] mb-4 transition-all duration-700 font-bold ${activeInput === field.id ? 'text-blue-500 translate-x-2' : 'text-white/30'}`}>
                          {field.label}
                        </p>
                        {field.type === "textarea" ? (
                          <textarea 
                            name={field.name}
                            required
                            onFocus={() => setActiveInput(field.id)} onBlur={() => setActiveInput(null)}
                            placeholder={field.ph}
                            rows="1"
                            className="w-full bg-transparent text-xl sm:text-2xl md:text-4xl text-white font-bold outline-none placeholder:text-white/70 pb-4 border-b border-white/10 focus:border-blue-500 transition-all duration-1000 uppercase italic tracking-tighter resize-none"
                          />
                        ) : (
                          <input 
                            name={field.name}
                            required
                            onFocus={() => setActiveInput(field.id)} onBlur={() => setActiveInput(null)}
                            type={field.type} 
                            placeholder={field.ph}
                            className="w-full bg-transparent text-xl sm:text-2xl md:text-4xl text-white font-bold outline-none placeholder:text-white/70 pb-4 border-b border-white/10 focus:border-blue-500 transition-all duration-1000 uppercase italic tracking-tighter"
                          />
                        )}
                        <motion.div 
                          className="absolute bottom-0 left-0 h-[1px] bg-blue-500 shadow-[0_0_20px_#3b82f6]"
                          animate={{ width: activeInput === field.id ? "100%" : "0%" }}
                          transition={{ duration: 0.8, ease: "circOut" }}
                        />
                      </div>
                    ))}

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/btn relative w-full flex items-center justify-between py-6 md:py-10 mt-6 rounded-full"
                    >
                      <span className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter transition-all duration-700 group-hover/btn:text-blue-500">
                        {loading ? "SENDING..." : "SEND_Message"}
                      </span>
                      
                      <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border border-white/50 flex items-center justify-center text-white group-hover/btn:bg-blue-600 group-hover/btn:border-blue-600 group-hover/btn:shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all duration-700">
                        <ArrowRight size={32} className="md:w-12 md:h-12 group-hover/btn:translate-x-2 transition-transform duration-500" />
                      </div>
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    className="relative z-10 flex flex-col items-center justify-center text-center space-y-8"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/50"
                    >
                      <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-blue-500" />
                    </motion.div>

                    <div className="space-y-4">
                      <h3 className="text-3xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                       Message SENT
                      </h3>
                      <p className="text-blue-500 font-['Space_Mono'] text-xs tracking-[0.5em] uppercase font-bold">
                        MESSAGE SENT
                      </p>
                    </div>

                    <p className="text-neutral-500 text-sm md:text-lg max-w-sm font-light leading-relaxed">
                      Thank you for reaching out. Your message has been received and I will review the project brief shortly.
                    </p>

                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-white/20 hover:text-white transition-colors text-[9px] tracking-widest uppercase mt-4"
                    >
                      [ RETURN_TO_SYSTEM ]
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 w-full px-12 flex justify-between items-center opacity-10 pointer-events-none">
         <span className="text-[8px] tracking-[1.5em] text-white uppercase font-black">NAGERCOIL_NODE_V3.16</span>
         <span className="text-[8px] tracking-[1em] text-white uppercase font-black">© 2026 // SYSTEM_STABLE</span>
      </div>

    </section>
  );
};

export default ContactSection;