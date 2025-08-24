"use client";

import { motion } from "motion/react";

import { useState } from "react";
import Contact from "../../app/contact/page"; // Adjust the path as needed

export default function Focus() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => setIsFormOpen(!isFormOpen);

  return (
    <>
      <section className="relative z-20 px-4 lg:px-8 py-24 lg:py-32 bg-white">
        <div className="mx-auto text-start">
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(40px,8vw,120px)] font-semibold leading-tight text-black mb-1 lg:mb-1"
          >
            FOCUSED ON QUALITY
            <br />
            <span className="text-end block">DRIVEN BY CREATIVITY</span>
          </motion.h2>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center mt-16 flex justify-center"
          >
            <div className="w-full flex justify-center ">
              <button 
                onClick={toggleForm}
                className="group relative flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-neutral-800 transition-colors duration-300 overflow-hidden"
              >
                {/* Animated text wrapper */}
                <div className="overflow-hidden h-6">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                    <span className="text-[clamp(14px,1vw,18px)] font-semibold mb-1.5 uppercase">
                      tell us about your project
                    </span>
                    <span className="text-[clamp(14px,1vw,18px)] font-semibold mb-1.5">
                      tell us about your project
                    </span>
                  </div>
                </div>

                {/* Circle effect */}
                <span className="relative w-3 h-3 rounded-full border border-white overflow-hidden">
                  <span className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-full"></span>
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <Contact isOpen={isFormOpen} onClose={toggleForm} />
    </>
  );
}