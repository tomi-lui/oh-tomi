"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);

  // Initialize GSAP effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only enable parallax on desktop
      if (window.innerWidth >= 1024) {
        gsap.to([bg1Ref.current, bg2Ref.current], {
          yPercent: -30, // Moves backgrounds upward on scroll
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            markers: false // Set to true for debugging
          }
        });
      }
    }, heroRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section 
      ref={heroRef}
      className="inset-0 fixed  overflow-hidden z-10"
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {/* Default Background */}
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: isHovered ? 1 : 1.2 }}
          transition={{ 
            scale: { duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
          className="absolute inset-0"
        >
          <div 
            ref={bg1Ref}
            className="absolute inset-0"
          >
            <img
              src="/img/hero1.jpg"
              alt="Myrtle Pool House"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </motion.div>

        {/* Hover Background */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.7, ease: "easeInOut"}} 
          className="absolute inset-0 z-10"
        >
          <div 
            ref={bg2Ref}
            className="absolute inset-0"
          >
            <img
              src="/img/hero2.avif"
              alt="Myrtle Pool House Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </motion.div>
      </div>

      {/* Desktop Content */}
      <div className="relative z-20 h-full hidden lg:block max-w-full">
        {/* Middle Row - Featured Project */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-between text-white uppercase font-bold"
            >
              <span className="">Featured Project</span>
              <span className="">Myrtle Pool House</span>
              <span className="">2024</span>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-white text-lg font-medium relative group"
              >
                <span>View Project</span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-110"></div>
              </motion.button>
            </motion.div>
          </div>
        </div>
       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-8 left-8 text-white z-20"
        >
          <p className="text-4xl font-medium">
            The OH Architecture style is defined by<br />
            strong, solid forms with subtle elegance,<br />
            natural balance and enduring appeal
          </p>
        </motion.div>

        {/* Bottom Right Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-8 right-8 text-white z-20"
        >
          <div className="flex items-center gap-2 text-lg opacity-100 uppercase font-bold tracking-wider">
            <span>(SCROLL DOWN)</span>
          </div>
        </motion.div>
      </div>

      {/* Mobile Content */}
      <div className="relative z-20 h-full lg:hidden flex flex-col">
        {/* Center the project row vertically and horizontally */}
        <div className="flex-1 flex flex-col justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-between items-center text-white uppercase font-bold"
          >
            <span className="text-sm md:text-base flex-1 text-left">Myrtle Pool House</span>
            <span className="text-sm md:text-base flex-1 text-center ">2024</span>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-white text-sm md:text-base font-medium relative group flex-1 text-right"
            >
              <span>View Project</span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-110"></div>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Content - Description and Scroll Indicator */}
        <div className="pb-8 px-4 text-white z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <p className="text-xl md:text-2xl font-medium leading-tight">
              The OH Architecture style is defined by<br />
              strong, solid forms with subtle elegance,<br />
              natural balance and enduring appeal
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 text-sm opacity-100 uppercase tracking-wider"
          >
            <span>(SCROLL DOWN)</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}