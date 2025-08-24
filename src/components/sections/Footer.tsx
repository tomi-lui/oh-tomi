"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const navigationLinks = [
"Home",
"Works",
"Studio",
"Process",
"Gallery",
"Contact Us"
];

export default function Footer() {
return (
<footer className="relative bg-white px-4 lg:px-8 py-16">
<div className="max-w-7xl mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">


      {/* Left Section - Hero Image and Large OH Text */}
      <div className="lg:col-span-1 space-y-8">
        {/* Building Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/3] rounded-lg overflow-hidden"
        >
          <Image
            src="/api/placeholder/400/300"
            alt="OH Architecture building"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Large OH Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[120px] lg:text-[140px] font-bold leading-none text-black"
        >
          OH
        </motion.div>

        {/* Copyright */}
        <div className="space-y-2 text-sm text-black">
          <p>© 2025 OH ARCHITECTURE</p>
          <p>12:52 AM QLD, WE ARE CLOSED</p>
        </div>
      </div>

      {/* Middle Left - Navigation */}
      <div className="lg:col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8"
        >
          <h3 className="text-sm uppercase tracking-wider text-black font-medium">
            (NAVIGATION)
          </h3>
          
          <nav className="space-y-4">
            {navigationLinks.map((link, index) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Link
                  href={`/${link.toLowerCase().replace(' ', '-')}`}
                  className="block text-2xl lg:text-3xl font-medium text-black hover:text-gray-600 transition-colors duration-300"
                >
                  {link}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Legal Links */}
          <div className="pt-8 space-y-2">
            <Link 
              href="/privacy-policy" 
              className="block text-sm text-black hover:text-gray-600 transition-colors"
            >
              PRIVACY POLICY
            </Link>
            <Link 
              href="/terms-of-service" 
              className="block text-sm text-black hover:text-gray-600 transition-colors"
            >
              TERMS OF SERVICE
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Middle Right - Acknowledgement */}
      <div className="lg:col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-8"
        >
          <h3 className="text-sm uppercase tracking-wider text-black font-medium">
            (ACKNOWLEDGEMENT)
          </h3>
          
          <p className="text-base leading-relaxed text-black">
            We respectfully acknowledge the Turrbal people, 
            the Traditional Owners and Custodians of the 
            Country on which we work. We pay our respects 
            to Elders past and present, and acknowledge their 
            continuing connection to land, sea and community.
          </p>
        </motion.div>
      </div>

      {/* Right Section - Contact Info */}
      <div className="lg:col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-8"
        >
          <h3 className="text-sm uppercase tracking-wider text-black font-medium">
            (INFO)
          </h3>
          
          <div className="space-y-4 text-base text-black">
            <div>
              <p className="font-medium">A:</p>
              <p>101 Days Rd, Grange QLD 4051</p>
            </div>
            
            <div>
              <p className="font-medium">E:</p>
              <Link 
                href="mailto:info@oharchitecture.com.au"
                className="hover:text-gray-600 transition-colors"
              >
                info@oharchitecture.com.au
              </Link>
            </div>
            
            <div>
              <p className="font-medium">P:</p>
              <Link 
                href="tel:0731101031"
                className="hover:text-gray-600 transition-colors"
              >
                07 3110 1031
              </Link>
            </div>
            
            <div>
              <p className="font-medium">H:</p>
              <p>Monday to Friday, 8:30am - 5:00pm</p>
            </div>
          </div>

          {/* AIA Logo */}
          <div className="pt-8">
            <div className="w-24 h-16 bg-black flex items-center justify-center rounded">
              <span className="text-white font-bold text-xs">AIA</span>
              <div className="ml-2">
                <div className="text-white text-xs leading-tight">
                  <div>Member</div>
                  <div>Australian</div>
                  <div>Institute of</div>
                  <div>Architects</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Bottom Section - Social Links */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-16 border-t border-gray-200 mt-16"
    >
      <div className="mb-4 lg:mb-0">
        <Link 
          href="https://instagram.com/oharchitecture"
          className="text-sm text-black hover:text-gray-600 transition-colors uppercase tracking-wider"
        >
          INSTAGRAM
        </Link>
      </div>
      
      <div className="text-sm text-black">
        <span>MADE BY </span>
        <Link 
          href="https://huy.design"
          className="hover:text-gray-600 transition-colors font-medium"
        >
          HUY
        </Link>
        <span> & </span>
        <Link 
          href="https://sid.design"
          className="hover:text-gray-600 transition-colors font-medium"
        >
          SID
        </Link>
      </div>
    </motion.div>
  </div>
</footer>


);
}