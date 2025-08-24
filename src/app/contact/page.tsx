"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";


interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-y-0 right-0 w-full lg:w-[40%] bg-black z-50 p-8"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start">
              <div className="text-white">
                <h2 className="text-md font-semibold mb-6">( PROJECT ENQUIRY )</h2>
                <p className="text-white text-md font-semibold max-w-md">
                  To get started, we ask that you provide some<br />
                  initial information about your project to help<br />
                  us determine whether our studio is the<br />
                  right fit. Our team will review the details and<br />
                  be in touch to discuss next steps within 5<br />
                  business days.
                </p>
              </div>

              <div className="flex flex-col items-end">
                <button
                  onClick={onClose}
                  className="group text-white text-base uppercase tracking-wider mb-4 overflow-hidden h-[1.5em]"
                >
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2 font-semibold">
                    <span className="mb-1.5">Close</span>
                    <span className="mb-1.5">Close</span>
                  </div>
                </button>

                <div className="w-40 aspect-[12/16] bg-black overflow-hidden">
                  <Image
                    src="/img/18.avif"
                    alt="Project Preview"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-32 flex items-start justify-between">
              <div className="text-white font-semibold text-lg">Your personal details</div>
              <div className="text-white font-semibold text-lg">(01/08)</div>
            </div>

            <div className="border-b border-white/40 my-4"></div>

            <div className="flex-1 mt-8">
              <div className="space-y-6">
                <FormInput label="Name *" placeholder="Your Name" />
                <FormInput label="Email Address *" placeholder="Your Email Address" />
                <FormInput label="Phone Number" placeholder="07 1234 5678" />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button className="group px-6 py-3 bg-white text-black font-medium rounded-full flex items-center gap-2">
                <div className="overflow-hidden h-[1.5em]">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                    <span className="mb-1.5">Next</span>
                    <span className="mb-1.5">Next</span>
                  </div>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                  viewBox="0 0 24 24" strokeWidth={1.5} 
                  stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FormInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-sm">
        <span className="text-white">{label.replace('*', '')}</span>
        {label.includes('*') && <span className="text-red-500"> *</span>}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full mt-1 p-3 bg-[#292929] text-white focus:outline-none"
      />
    </div>
  );
}