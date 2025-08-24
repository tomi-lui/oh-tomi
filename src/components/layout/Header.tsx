"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import Contact from "../../app/contact/page";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const pathname = usePathname();
 
  
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const headerHeightRef = useRef(0);

  // Check if we're on gallery page
  const isGalleryPage = pathname.startsWith("/gallery");

  // Scroll handler - Updated with 400px threshold
  const handleScroll = useCallback(() => {
    if (isGalleryPage) {
      // On gallery page, always hide main header and show sticky header
      setIsHeaderVisible(false);
      setIsScrolled(true);
      return;
    }

    const scrollPosition = window.scrollY;
    
    // Get header height if not already set
    if (headerHeightRef.current === 0) {
      const header = document.querySelector('header');
      if (header) headerHeightRef.current = header.offsetHeight;
    }
    
    // Show sticky header only when scrolled more than 400px
    setIsScrolled(scrollPosition > 400);
    
    // Show/hide main header based on scroll direction
    setIsHeaderVisible(scrollPosition <= 0);

    
    lastScrollY.current = scrollPosition;
  }, [isGalleryPage]);

  useEffect(() => {
    let ticking = false;
    
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [handleScroll]);

  const toggleForm = () => setIsFormOpen(!isFormOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Check if we're on a page where text should be black
  const shouldUseBlackText = pathname !== "/" && 
                            !pathname.startsWith("/gallery") && 
                            !pathname.startsWith("/works/");

  

  // Animation for menu
  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        menuRef.current.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      } else {
        menuRef.current.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
      }
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Initial Header - With Faster Transition */}
      {!isGalleryPage && (
        <motion.header
          initial={{ y: 0 }}
          animate={{ y: isHeaderVisible ? 0 : -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-40"
        >
          <div className="px-4 lg:px-8 py-4 lg:py-6 flex justify-between items-center">
            <Link href="/" className={`font-bold text-3xl md:text-6xl ${shouldUseBlackText ? 'text-black' : 'text-white'}`}>
              OH Architecture
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className={`flex gap-6 font-bold text-lg uppercase mr-96 ${shouldUseBlackText ? 'text-black' : 'text-white'}`}>
                {[
                  { text: "Works", href: "/works" },
                  { text: "Studio", href: "/studio" },
                  { text: "Process", href: "/process" },
                  { text: "Gallery", href: "/gallery" },
                ].map((item) => (
                  <HoverAnimationLink
                    key={item.text}
                    text={item.text}
                    href={item.href}
                    colorClass={shouldUseBlackText ? 'text-black' : 'text-white'}
                  />
                ))}
              </div>
              <GetInTouchButton onClick={toggleForm} />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <MobileMenuButton onClick={toggleMenu} colorClass={shouldUseBlackText ? 'text-black' : 'text-white'} />
            </div>
          </div>
        </motion.header>
      )}

      {/* Sticky Header - Appears when scrolled more than 400px or on gallery page */}
      <AnimatePresence>
        {(isScrolled || isGalleryPage) && (
          <motion.header
            ref={stickyHeaderRef}
            initial={{ 
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
            }}
            animate={{ 
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            }}
            exit={{ 
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 "
          >
            <div className="px-4 lg:px-8 py-4 flex justify-between items-center">
              {/* Back button for Gallery page */}
              {isGalleryPage && (
                <Link 
                  href="/"
                  className="flex items-center text-black gap-2 uppercase font-semibold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  Back to Home
                </Link>
              )}
              
             
              
              <div className="flex gap-4 ml-auto">
                {!isGalleryPage && (
                  <GetInTouchButton 
                    onClick={toggleForm} 
                    className="text-base md:text-lg"
                  />
                )}
                <MenuButton 
                  onClick={toggleMenu} 
                  variant={isGalleryPage ? 'light' : 'dark'}
                  className="text-base md:text-lg"
                />
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Use external ContactForm component */}
      <Contact isOpen={isFormOpen} onClose={toggleForm} />

      {/* Mobile Menu with Clip-Path Animation - Changed to off-white background */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-black z-[100] p-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between">
            <div className="font-bold text-4xl text-white">OH Architecture</div>
            <button onClick={toggleMenu} className="text-white uppercase text-2xl group overflow-hidden h-8">
              <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                <span className="mb-1.5">Close</span>
                <span className="mb-1.5">Close</span>
              </div>
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center uppercase">
            {[
              { text: "Home", href: "/" },
              { text: "Works", href: "/works" },
              { text: "Studio", href: "/studio" },
              { text: "Process", href: "/process" },
              { text: "Gallery", href: "/gallery" },
            ].map((item) => (
              <Link
                key={item.text}
                href={item.href}
                onClick={closeMenu}
                className="text-5xl lg:text-7xl font-semibold text-white block overflow-hidden group"
              >
                <div className="overflow-hidden h-[1.5em]">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                    <span className="mb-1.5">{item.text}</span>
                    <span className="mt-6">{item.text}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="pb-8">
            <div className="mb-6">
              <a href="#" className="text-lg text-white group overflow-hidden inline-block h-6">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  <span className="mb-1.5">Instagram</span>
                  <span className="mb-1.5">Instagram</span>
                </div>
              </a>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white group overflow-hidden inline-block h-6">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  <span className="mb-1.5">Privacy Policy</span>
                  <span className="mb-1.5">Privacy Policy</span>
                </div>
              </a>
              <a href="#" className="text-white group overflow-hidden inline-block h-6">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  <span className="mb-1.5">Terms of Services</span>
                  <span className="mb-1.5">Terms of Services</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- BUTTONS ---------------- */

interface ButtonProps {
  onClick: () => void;
  variant?: 'dark' | 'light';
  className?: string;
}

function GetInTouchButton({ onClick, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group cursor-pointer relative flex items-center uppercase ${className}`}
      aria-label="Get in touch"
    >
      <div className="flex items-center gap-3 px-5 h-14 lg:h-12 rounded-full bg-black text-white border border-gray-800 font-semibold text-[clamp(14px,1.2vw,18px)]">
        
        <div className="overflow-hidden h-6">
          <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
            <span className="text-[clamp(14px,1vw,18px)] font-semibold mb-1.5 uppercase text-white">
              Get in touch
            </span>
            <span className="text-[clamp(14px,1vw,18px)] font-semibold mb-1.5 text-white">
              Get in touch
            </span>
          </div>
        </div>

        <span className="relative w-3 h-3 rounded-full border border-white flex items-center justify-center">
          <span className="w-full h-full rounded-full scale-0 group-hover:scale-75 transition-transform duration-300 ease-out bg-white"></span>
        </span>
      </div>
    </button>
  );
}

function MenuButton({ onClick, variant = 'dark', className = '' }: ButtonProps) {
  const isLight = variant === 'light';
  
  return (
    <button 
      onClick={onClick}
      className={`group cursor-pointer relative font-bold text-[14px] lg:text-[16px] rounded-3xl px-4 py-2 uppercase
        ${isLight ? 'bg-black text-white' : 'bg-white text-black'} ${className}`}
      aria-label="Menu"
    >
      <div className="overflow-hidden h-[1.5em]">
        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
          <span className="mb-1.5">Menu</span>
          <span className="mb-1.5">Menu</span>
        </div>
      </div>
    </button>
  );
}

function MobileMenuButton({ onClick, colorClass = "text-white", className = '' }: ButtonProps & { colorClass?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`group cursor-pointer relative font-bold text-[19px] rounded-3xl px-4 py-2 uppercase ${colorClass} ${className}`}
      aria-label="Menu"
    >
      <div className="overflow-hidden h-[1.5em]">
        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
          <span className="mb-1.5">Menu</span>
          <span className="mb-1.5">Menu</span>
        </div>
      </div>
    </button>
  );
}

/* ---------------- LINKS ---------------- */

interface LinkProps {
  text: string;
  href: string;
  colorClass?: string;
}

function HoverAnimationLink({ text, href, colorClass = "text-white" }: LinkProps) {
  return (
    <Link href={href} className={`group block overflow-hidden ${colorClass}`}>
      <div className="overflow-hidden h-[1.5em]">
        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
          <span className="mb-1.5">{text}</span>
          <span className="mb-1.5">{text}</span>
        </div>
      </div>
    </Link>
  );
}