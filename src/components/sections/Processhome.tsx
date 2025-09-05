"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import TextAnimation from "../layout/TextAnimation"; // ✅ import your animation wrapper

const processSteps = [
  { number: "01", title: "Sketch Design" },
  { number: "02", title: "Design Development" },
  { number: "03", title: "Development Application" },
  { number: "04", title: "Interior Design" },
  { number: "05", title: "Building approval plans + documentation" },
  { number: "06", title: "Construction plans + documentation" },
];

type ProcessProps = {
  showButton?: boolean;
};

export default function ProcessHome({ showButton = true }: ProcessProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["end end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section
      ref={containerRef}
      className="relative z-20 px-4 lg:px-8 py-24 bg-white"
    >
      <div className="mx-auto">
        {/* Section Label */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg font-semibold uppercase tracking-wider mb-4 text-black"
          >
            (OUR PROCESS)
          </motion.p>
        </div>

        {/* Main Content Flex Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-44">
          {/* Left Side - Image and Steps */}
          <div className="w-[470px] flex-shrink-0">
            {/* Image */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[5/5] w-full">
                <motion.div style={{ scale }} className="w-full h-full">
                  <Image
                    src="/img/pro.avif"
                    alt="NH Architecture building exterior"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Process Steps */}
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-start gap-1 text-lg">
                    <span className="text-black font-medium">
                      ({step.number})
                    </span>
                    <span className="text-black font-semibold flex-1">
                      {step.title}
                    </span>
                  </div>
                  {index < processSteps.length + 1 && (
                    <div className="w-full h-px bg-gray-300 mt-1"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Text + CTA */}
          <div className="lg:w-full flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-10"
            >
              {/* Main Heading with TextAnimation */}
              <TextAnimation>
                <h2 className="text-[clamp(38px,5vw,76px)] font-semibold leading-[1] text-black md:indent-12 indent-0">
                  Our approach at NH Architecture is designed to make your
                  journey from concept to completion as smooth and enjoyable as
                  possible.
                </h2>
              </TextAnimation>

              {/* Subtext with TextAnimation */}
              <TextAnimation delay={0.2}>
                <p className="text-[clamp(38px,5vw,76px)] font-semibold leading-[1] text-black">
                  With our 6-stage process, we prioritise clarity,
                  collaboration, and your unique vision. At every step, we will
                  keep you informed, inspired, and involved.
                </p>
              </TextAnimation>
            </motion.div>

            {/* CTA Button (conditional) */}
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="pt-12 flex justify-center"
              >
                <div className="w-full flex justify-start mt-16">
                  <Link href="/process">
                    <button className="group relative flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-neutral-800 transition-colors duration-300 overflow-hidden">
                      {/* Animated text wrapper */}
                      <div className="overflow-hidden h-6">
                        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                          <span className="text-[clamp(14px,1vw,18px)] font-semibold mb-1.5 uppercase">
                            get to know our process
                          </span>
                          <span className="text-[clamp(14px,1vw,18px)] font-semibold mb-1.5">
                            get to know our process
                          </span>
                        </div>
                      </div>

                      {/* Circle effect */}
                      <span className="relative w-3 h-3 rounded-full border border-white overflow-hidden">
                        <span className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-full"></span>
                      </span>
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
