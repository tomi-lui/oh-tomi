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
          <div className="p-4 md:p-6 flex flex-col md:flex-row items-end justify-between mb-16">
            {/* OH Letters - Always on left */}
            <div className="flex items-end gap-2 md:gap-4 order-1">
              {/* O */}
              <div className="overflow-hidden h-40 md:h-40">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: percent >= 50 ? "-50%" : "0%" }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                  className="flex flex-col"
                >
                  <span className="text-white text-9xl md:text-9xl font-extrabold leading-none">
                    O
                  </span>
                  <span className="text-white text-9xl md:text-9xl font-extrabold leading-none mt-3">
                    O
                  </span>
                </motion.div>
              </div>

              {/* H */}
              <div className="overflow-hidden h-40 md:h-40">
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
                  <span className="text-white text-9xl md:text-9xl font-extrabold leading-none">
                    H
                  </span>
                  <span className="text-white text-9xl md:text-9xl font-extrabold leading-none mt-3">
                    H
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Architecture Text - Right beside OH on desktop, below on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="order-2 md:ml-2 mt-2 md:mt-0 md:mb-1"
            >
              <span className="text-white text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight">
                [ARCHITECTURE & INTERIOR DESIGN]
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}