"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import TextAnimation from "../layout/TextAnimation"; // Adjust the import path as needed

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLElement>(null);
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const aboutSection = aboutRef.current;
    if (!aboutSection) return;

    // Scroll trigger for the hero darkening as about section comes into view
    ScrollTrigger.create({
      trigger: aboutSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        // Darken hero section as about section scrolls over it
        const heroOverlay = document.querySelector('#hero-overlay');
        if (heroOverlay) {
          gsap.to(heroOverlay, {
            opacity: self.progress * 0.8,
            duration: 0.1
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={aboutRef}
      className="relative z-20 bg-neutral-50 px-4 lg:px-8 py-9 "
    >
      {/* Large Title - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 md:mb-16"
      >
        <TextAnimation>
          <h2 className="text-[clamp(48px,8vw,160px)] font-medium tracking-tight leading-none uppercase text-neutral-900 hidden md:block">
            Experience
            <br />
            focused design
          </h2>
        </TextAnimation>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6 lg:gap-1">
          
          {/* Center Image */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-4 mb-8 lg:mb-12 ">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <img
                src="/img/abimg.avif"
                alt="Architecture process"
                className="w-full aspect-[6/4] object-cover lg:max-w-[85%] lg:mx-auto"
              />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-4 aspect-[6/4] lg:max-w-[90%] ml-0 md:ml-9">
            {/* Mobile: "Our Studio" heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden mb-4"
            >
              <TextAnimation>
                <h3 className="text-2xl font-medium">[Our Studio]</h3>
              </TextAnimation>
            </motion.div>
             
            {/* Desktop: "Our Studio" heading positioned to the left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute right-[-6%] -translate-x-full pr-8"
            >
              <TextAnimation>
                <h3 className="text-2xl font-medium whitespace-nowrap">[Our Studio]</h3>
              </TextAnimation>
            </motion.div>

            {/* First Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <TextAnimation>
                <p className="text-[clamp(21px,2vw,29px)]  leading-8  text-black font-medium">
                  We work closely with clients right from the start,
                  with clear communication and expert guidance
                  along the way. We also work closely with builders,
                  consultants, and other partners to make sure each
                  project runs smoothly and the final build delivers
                  well beyond our shared aspirations.
                </p>
              </TextAnimation>
            </motion.div>
            
            {/* Second Paragraph */}
            <div className="mt-8 lg:mt-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <TextAnimation>
                  <p className="text-[clamp(21px,2vw,29px)]  leading-8  text-black font-medium">
                    While our aesthetic is recognisable, each project
                    evolves to embody its own shape and character,
                    crafted in response to the aspirations of our clients,
                    the opportunities of the site, and the creative vision
                    of our architectural team.
                  </p>
                </TextAnimation>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 lg:mt-10"
            >
              <Link href="/studio">
                <button className="group relative flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-neutral-800 transition-colors duration-300 overflow-hidden">
                  
                  {/* Animated text wrapper */}
                  <div className="overflow-hidden h-6">
                    <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                      <span className="text-[clamp(14px,1vw,18px)] font-semibold mb-1.5 uppercase">
                        Learn more about our studio
                      </span>
                      <span className="text-[clamp(14px,1vw,18px)] font-semibold mb-1.5">
                        Learn more about our studio
                      </span>
                    </div>
                  </div>

                  {/* Circle effect */}
                  <span className="relative w-3 h-3 rounded-full border border-white overflow-hidden">
                    <span className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-full"></span>
                  </span>
                </button>
              </Link>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}