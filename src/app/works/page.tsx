"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { projects, Project } from "../../data/projects";
import { gsap } from "gsap";
import Link from "next/link";
import TextAnimation from "../../components/layout/TextAnimation";

export default function Works() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
 
  const [isMobile, setIsMobile] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Update scroll progress for desktop
  useEffect(() => {
    if (isMobile) return;
    
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
     
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const scrollPosition = container.scrollLeft;
      const percentage = (scrollPosition / scrollWidth) * 100;
      setScrollProgress(percentage);
      
      
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isMobile]);

  // Smooth horizontal scrolling with GSAP for desktop only
  useEffect(() => {
    if (isMobile) return;
    
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      
      e.preventDefault();
      gsap.to(container, {
        scrollLeft: container.scrollLeft + e.deltaY * 2.5,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isMobile]);

  return (
   <div className={`${isMobile ? 'h-auto' : 'h-screen overflow-hidden'} w-screen bg-white`}>
      {/* Mobile Header */}
      {isMobile && (
        <div className="px-6 pt-28 pb-4">
          <TextAnimation>
            <h1 className="text-4xl font-semibold text-black mb-4">WORKS</h1>
          </TextAnimation>
        </div>
      )}

      {/* Main Content */}
      <div className={`${isMobile ? 'min-h-screen' : 'h-full pt-20 flex flex-col'}`}>
        {/* Projects Grid/List */}
        <div 
          ref={scrollContainerRef}
          className={`${
            isMobile 
              ? "overflow-y-visible overflow-x-hidden px-6 pb-6 space-y-12" 
              : "flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide w-full"
          }`}
        >
          <div className={isMobile ? "pb-8" : "h-full flex items-end pl-8 py-28 "}>
            {projects.map((project: Project, index: number) => (
              <Link 
                key={project.slug} 
                href={`/works/${project.slug}`}
                className={`${
                  isMobile 
                    ? "w-full block" 
                    : "flex-shrink-0 w-64 mr-8 cursor-pointer group relative block"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`${
                    isMobile 
                      ? "w-full" 
                      : "relative w-full overflow-hidden bg-gray-100"
                  } ${
                    index % 2 === 0 ? "aspect-[16/12]" : "aspect-[5/7]"
                  }`}>
                    <img 
                      src={project.backgroundImageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className={isMobile ? "mt-4 mb-4" : "mt-0"}>
                    <TextAnimation>
                      <h3 className="text-md font-bold text-black uppercase tracking-wide">
                        {project.title}
                      </h3>
                    </TextAnimation>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Bottom Section */}
        {!isMobile && (
          <div className="flex items-end justify-between px-8 pb-8 relative">
            <TextAnimation>
              <div className="text-[clamp(40px,7vw,140px)] font-semibold text-black leading-none">
                WORKS
              </div>
            </TextAnimation>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
              <TextAnimation>
                <div className="text-md font-semibold text-black mb-2">SCROLL DOWN TO EXPLORE</div>
              </TextAnimation>
              <TextAnimation>
                <div className="text-md font-semibold text-black ">
                  ({Math.round(scrollProgress)}%)
                </div>
              </TextAnimation>
            </div>
            
            <div className="text-right"></div>
          </div>
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
