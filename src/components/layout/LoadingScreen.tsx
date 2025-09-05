"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
const [percent, setPercent] = useState(0);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
// Disable scroll during loading
document.body.style.overflow = "hidden";


let paused = false;
let interval: NodeJS.Timeout;

interval = setInterval(() => {
  setPercent((prev) => {
    if (prev >= 100) {
      clearInterval(interval);
      return 100;
    }

    // pause at 50% only once
    if (prev === 50 && !paused) {
      paused = true;
      clearInterval(interval);
      setTimeout(() => {
        interval = setInterval(() => {
          setPercent((p) => {
            if (p >= 100) {
              clearInterval(interval);
              return 100;
            }
            return p + 2;
          });
        }, 15);
      }, 500);
      return prev;
    }

    return prev + 2;
  });
}, 20);

return () => {
  clearInterval(interval);
  document.body.style.overflow = "unset";
};


}, []);

useEffect(() => {
if (percent === 100) {
const timer = setTimeout(() => {
setIsLoading(false);
}, 1200);
return () => clearTimeout(timer);
}
}, [percent]);

return (
<AnimatePresence>
{isLoading && (
<motion.div
initial={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.8, ease: "easeInOut" }}
className="fixed flex flex-col justify-between inset-0 z-50 bg-black w-full h-full pointer-events-none"
>
{/* Top Progress Bar */}
<div className="w-full pt-4 md:pt-6 px-4 md:px-6">
<div className="w-full h-0.5 md:h-1 rounded-full overflow-hidden bg-white/20">
<motion.div
initial={{ width: "0%" }}
 animate={{ width: `${percent}%` }} 
transition={{ ease: "linear" }}
className="h-full bg-white"
/>
</div>
</div>


      {/* Bottom Content */}
      <div className="p-4 md:p-6 mb-16">
        {/* Mobile Layout */}
        <div className="flex flex-col items-start md:hidden">
          {/* OH Letters - Mobile */}
          <div className="flex items-end gap-3">
            {/* O */}
            <div className="overflow-hidden h-48">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: percent >= 50 ? "-50%" : "0%" }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col"
              >
                <span className="text-white text-[10rem] font-extrabold leading-none">
                  N
                </span>
                <span className="text-white text-[10rem] font-extrabold leading-none mt-3">
                  N
                </span>
              </motion.div>
            </div>

            {/* H */}
            <div className="overflow-hidden h-48">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: percent >= 70 ? "-50%" : "0%" }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 1, 0.5, 1],
                  delay: 0.1,
                }}
                className="flex flex-col"
              >
                <span className="text-white text-[10rem] font-extrabold leading-none">
                  H
                </span>
                <span className="text-white text-[10rem] font-extrabold leading-none mt-3">
                  H
                </span>
              </motion.div>
            </div>
          </div>

          {/* Architecture Text - Mobile (below OH, no animation) */}
          <div className="mt-4">
            <div className="text-white text-lg font-bold uppercase tracking-tight leading-tight">
              [ARCHITECTURE &<br />INTERIOR DESIGN]
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-end justify-start">
          {/* OH Letters - Desktop */}
          <div className="flex items-end gap-4">
            {/* O */}
            <div className="overflow-hidden h-52 lg:h-60">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: percent >= 50 ? "-50%" : "0%" }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col"
              >
                <span className="text-white text-[12rem] lg:text-[14rem] font-extrabold leading-none">
                  N
                </span>
                <span className="text-white text-[12rem] lg:text-[14rem] font-extrabold leading-none mt-3">
                  N
                </span>
              </motion.div>
            </div>

            {/* H */}
            <div className="overflow-hidden h-52 lg:h-60">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: percent >= 70 ? "-50%" : "0%" }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 1, 0.5, 1],
                  delay: 0.1,
                }}
                className="flex flex-col"
              >
                <span className="text-white text-[12rem] lg:text-[14rem] font-extrabold leading-none">
                  H
                </span>
                <span className="text-white text-[12rem] lg:text-[14rem] font-extrabold leading-none mt-3">
                  H
                </span>
              </motion.div>
            </div>
          </div>

          {/* Architecture Text - Desktop (right of OH, at bottom, no animation) */}
          <div className="ml-6 mb-2">
            <div className="text-white text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-tight">
              [ARCHITECTURE & INTERIOR DESIGN]
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>


);
}