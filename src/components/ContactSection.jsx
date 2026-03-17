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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  const textY = useTransform(smoothProgress, [0, 1], [300, -300]);
  const formY = useTransform(smoothProgress, [0, 1], [120, -120]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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
    .then(() => {
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
      className="relative min-h-screen lg:min-h-[140vh] bg-black flex items-center justify-center py-16 sm:py-20 md:py-32 px-4 sm:px-6 overflow-hidden"
    >
      
      {/* BACKGROUND TEXT */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <h1 className="text-[6rem] sm:text-[10rem] md:text-[20rem] lg:text-[30rem] font-black text-white/[0.03] tracking-tighter italic uppercase leading-none">
          CONTACT
        </h1>
      </motion.div>

      <div className="container max-w-[90rem] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          
          {/* LEFT */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-10">
                <div className="h-[1px] w-10 sm:w-16 bg-blue-500/50" />
                <span className="text-[8px] sm:text-[10px] tracking-[0.5em] sm:tracking-[0.8em] text-blue-400 uppercase font-bold">
                  Available_for_Collaborations
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight uppercase mb-6 sm:mb-10">
                Have a <br /> 
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-900 italic font-thin">
                  Project in Mind?
                </span>
              </h2>

              <div className="space-y-4 sm:space-y-6 max-w-md mb-8 sm:mb-12">
                <p className="text-neutral-400 text-sm sm:text-lg md:text-xl font-light leading-relaxed">
                  I help founders and teams build scalable digital products and AI-powered solutions with world-class design and engineering.
                </p>
                <p className="text-blue-500/80 text-xs sm:text-base md:text-lg font-medium">
                  Let’s create something that stands out.
                </p>
              </div>

              <div className="flex gap-6 sm:gap-8">
                {socialLinks.map(({ Icon, url }, i) => (
                  <motion.a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-white/30 hover:text-blue-500 transition"
                  >
                    <Icon size={22} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT FORM */}
          <motion.div 
            style={{ y: formY }}
            className="lg:col-span-7"
          >
            <div className="w-full bg-[#080808]/60 backdrop-blur-3xl rounded-3xl sm:rounded-[3rem] md:rounded-[4rem] p-6 sm:p-10 md:p-14 border border-white/5 shadow-2xl min-h-[500px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
  {!submitted ? (
    <motion.form 
      key="form"
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4 md:space-y-8 relative z-10" // Tightened space-y da
    >
      {[
        { id: 1, label: "01 // FULL_NAME", ph: "Your Name", type: "text", name: "name" },
        { id: 2, label: "02 // EMAIL_ADDRESS", ph: "Professional Email", type: "email", name: "email" },
        { id: 3, label: "03 // PROJECT_BRIEF", ph: "Describe your vision...", type: "textarea", name: "message" }
      ].map((field, index, array) => (
        <div 
          key={field.id} 
          className={`relative group/input ${index === array.length - 1 ? 'mb-0' : ''}`}
        >
          <p className={`text-[8px] md:text-[10px] uppercase tracking-[0.5em] mb-2 transition-all duration-700 font-bold ${activeInput === field.id ? 'text-blue-500' : 'text-white/30'}`}>
            {field.label}
          </p>
          {field.type === "textarea" ? (
            <textarea 
              name={field.name}
              required
              rows="1"
              onFocus={() => setActiveInput(field.id)} 
              onBlur={() => setActiveInput(null)}
              placeholder={field.ph}
              // Removed border-b for the last item (index 2) to fix that extra line da
              className={`w-full bg-transparent text-xl md:text-3xl text-white font-bold outline-none placeholder:text-white/50 pb-2 ${index === array.length - 1 ? 'border-none' : 'border-b border-white/10'} focus:border-blue-500 transition-all duration-700 uppercase italic tracking-tighter resize-none`}
            />
          ) : (
            <input 
              name={field.name}
              required
              onFocus={() => setActiveInput(field.id)} 
              onBlur={() => setActiveInput(null)}
              type={field.type} 
              placeholder={field.ph}
              className="w-full bg-transparent text-xl md:text-3xl text-white font-bold outline-none placeholder:text-white/50 pb-2 border-b border-white/10 focus:border-blue-500 transition-all duration-700 uppercase italic tracking-tighter"
            />
          )}
        </div>
      ))}

      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: 0.98 }}
        className="group/btn w-full flex items-center justify-between py-2 md:py-4 pt-4 border-t border-white/10"
      >
        <span className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter group-hover/btn:text-blue-500 group-hover/btn:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500">
          {loading ? "SENDING..." : "SEND_MESSAGE"}
        </span>
        
        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:border-blue-600 transition-all duration-500">
          <ArrowRight className="w-6 h-6 md:w-10 md:h-10 group-hover/btn:translate-x-1 transition-transform" />
        </div>
      </motion.button>
    </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-center space-y-6"
                  >
                    <CheckCircle2 className="w-12 h-12 text-blue-500" />
                    <h3 className="text-2xl sm:text-4xl font-black text-white">
                      Message SENT
                    </h3>
                    <p className="text-neutral-500 text-sm sm:text-base max-w-sm">
                     Thank you for reaching out. Your message has been received and I will review the project brief shortly.

                    </p>

                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-white/30 text-xs tracking-widest"
                    >
                      [ RETURN ]
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
