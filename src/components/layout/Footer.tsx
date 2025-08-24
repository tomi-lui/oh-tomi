"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigationLinks = [
  "Home",
  "Works",
  "Studio",
  "Process",
  "Gallery",
];

export default function Footer() {
  const [currentTime, setCurrentTime] = useState("");
  

  useEffect(() => {
    // Update time and status
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: "Australia/Brisbane", 
        hour: "2-digit", 
        minute: "2-digit" 
      };
      const timeString = now.toLocaleTimeString("en-US", options);
      const hours = now.getHours();
      const day = now.getDay(); // 0 is Sunday, 6 is Saturday
      
      // Check if it's a weekday and within business hours
      const isBusinessHours = day >= 1 && day <= 5 && hours >= 8 && hours < 17;
      
      setCurrentTime(`${timeString} QLD, we are ${isBusinessHours ? "open" : "closed"}`);
      
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-white px-4 lg:px-12 py-16 z-30 border-t border-gray-200">
      <div className="mx-auto ">
        {/* Mobile Order: Navigation first */}
        <div className="block lg:hidden mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <h3 className="text-lg font-bold uppercase tracking-wider text-black">
              (NAVIGATION)
            </h3>
            
            <nav className="space-y-6">
              {navigationLinks.map((link, index) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Link
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="group block overflow-hidden"
                  >
                    <div className=" h-[2.5em]">
                      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                        <span className="text-4xl font-semibold text-black mb-2">
                          {link}
                        </span>
                        <span className="text-4xl font-semibold text-black mb-2">
                          {link}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Main content - 3 column layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12">
          {/* First Column - Image and OH Text (Desktop) */}
          <div className="order-3 lg:order-1 space-y-10">
            {/* Building Image with full width */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-96 lg:h-[500px] overflow-hidden"
            >
              <Image
                src="/img/footer.avif"
                alt="OH Architecture building"
                fill
                className="object-cover aspect-[3/7]"
              />
            </motion.div>

            {/* Large OH Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[270px] lg:text-[400px] font-bold leading-none text-black text-center"
            >
              OH
            </motion.div>
          </div>

          {/* Second Column - Navigation (Desktop only) */}
          <div className="order-1 lg:order-2 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <h3 className="text-xl font-semibold uppercase tracking-wider text-black">
                (NAVIGATION)
              </h3>
              
              <nav className="space-y-6">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Link
                      href={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="group block overflow-hidden"
                    >
                      <div className=" h-[2.5em]">
                        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                          <span className="text-4xl font-semibold text-black mb-2">
                            {link}
                          </span>
                          <span className="text-4xl font-semibold text-black mb-2">
                            {link}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Third Column - Acknowledgement and Info (Mobile: second) */}
          <div className="order-2 lg:order-3 space-y-16">
            {/* Acknowledgement Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold uppercase tracking-wider text-black">
                (ACKNOWLEDGEMENT)
              </h3>
              
              <p className="text-md leading-relaxed text-black">
                We respectfully acknowledge the Turrbal people, 
                the Traditional Owners and Custodians of the 
                Country on which we work. We pay our respects 
                to Elders past and present, and acknowledge their 
                continuing connection to land, sea and community.
              </p>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold uppercase tracking-wider text-black">
                (INFO)
              </h3>
              
              <div className="space-y-4 text-lg">
                <div>
                  <p className="font-semibold">A: 101 Days Rd, Grange QLD 4051</p>
                </div>
                
                <div>
                  <p className="font-semibold">E: info@oharchitecture.com.au</p>
                </div>
                
                <div>
                  <p className="font-semibold">P: 07 3110 1031</p>
                </div>
                
                <div>
                  <p className="font-semibold">H: Monday to Friday, 8:30am - 5:00pm</p>
                </div>
              </div>

              {/* AIA Logo */}
              <div className="pt-4">
                <div className="w-32 h-20 bg-black flex items-center justify-center rounded">
                  <span className="text-white font-bold text-lg mr-2">AIA</span>
                  <div className="text-white text-xs leading-tight">
                    <div>Member</div>
                    <div>Australian</div>
                    <div>Institute of</div>
                    <div>Architects</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - 2 rows on mobile, 4 on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          {/* Mobile layout */}
          {/* Mobile layout */}
<div className="lg:hidden grid grid-cols-2 gap-6 text-xl font-semibold text-black">
  {/* Left column */}
  <div className="space-y-4">
    <div>© 2025 OH Architecture</div>
    <div>Privacy Policy</div>
    <div>
      <Link 
        href="https://instagram.com/oharchitecture"
        className="hover:text-gray-600 transition-colors"
      >
        Instagram
      </Link>
    </div>
  </div>

  {/* Right column */}
  <div className="space-y-4 text-right">
    <div>
      <Link 
        href="/privacy-policy" 
        className="hover:text-gray-600 transition-colors"
      >
        {currentTime}
      </Link>
    </div>
    <div>
      <Link 
        href="/terms-of-service" 
        className="hover:text-gray-600 transition-colors"
      >
        Terms of Service
      </Link>
    </div>
    <div>
      Made by <span className="font-bold">Sagar</span> &{" "}
      <span className="font-bold">Tomi</span>
    </div>
  </div>
</div>


          {/* Desktop layout */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {/* Row 1: Copyright */}
            <div className="text-xl font-semibold text-black">
              <p>© 2025 OH Architecture</p>
            </div>
            
            {/* Row 2: Time Status */}
            <div className="text-xl font-semibold text-black">
              <p>{currentTime}</p>
            </div>
            
            {/* Row 3: Legal Links */}
            <div className="flex items-center space-x-4 text-xl font-semibold text-black">
              <Link 
                href="/privacy-policy" 
                className="hover:text-gray-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <span>|</span>
              <Link 
                href="/terms-of-service" 
                className="hover:text-gray-600 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            
            {/* Row 4: Social and Credits */}
            <div className="flex items-center justify-end space-x-4 text-xl font-semibold text-black">
              <Link 
                href="https://instagram.com/oharchitecture"
                className="hover:text-gray-600 transition-colors"
              >
                Instagram
              </Link>
              <span>|</span>
              <p>
                Made by{" "}
                <span className="font-bold">Sagar</span> &{" "}
                <span className="font-bold">Tomi</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
