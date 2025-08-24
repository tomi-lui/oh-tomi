"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Review from "@/components/sections/Review";
import TextAnimation from "../../components/layout/TextAnimation";
import Contact from "../contact/page";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Process stages data
const processStages = [
  {
    number: "01",
    title: "SKETCH DESIGN",
    image: "/img/p3.avif",
    description:
      "We kick off with a site visit and creative consultation to define your vision, style, and functional needs. We'll also uncover new opportunities and potential limitations. Based on this, we craft a series of hand-drawn design sketches to provide an initial visual concept that reflects your brief. Through collaboration and refinement, we shape the concept to align with your goals, timeline, and budget.",
  },
  {
    number: "02",
    title: "DESIGN DEVELOPMENT",
    image: "/img/p5.jpg",
    description:
      "Building on the approved sketch design, we develop detailed drawings and 3D models. This stage involves refining spatial relationships, material selections, and technical solutions. We work closely with you to ensure every detail aligns with your vision while meeting all regulatory and performance requirements.",
  },
  {
    number: "03",
    title: "DOCUMENTATION",
    image: "/img/p5.jpg",
    description:
      "We prepare comprehensive construction documentation including detailed drawings, specifications, and schedules. This stage ensures all design intent is clearly communicated to builders and trades, providing the foundation for accurate pricing and quality construction.",
  },
  {
    number: "04",
    title: "APPROVALS",
    image: "/img/p3.avif",
    description:
      "We navigate the regulatory approval process, preparing and submitting all required documentation to local authorities. Our experience ensures efficient processing while maintaining design integrity throughout the approval journey.",
  },
  {
    number: "05",
    title: "TENDER & CONTRACT",
    image: "/img/p5.jpg",
    description:
      "We assist in selecting the right builder through a competitive tender process. Our detailed documentation ensures accurate pricing and we provide guidance throughout contract negotiations to protect your interests.",
  },
  {
    number: "06",
    title: "CONSTRUCTION",
    image: "/img/p5.jpg",
    description:
      "During construction, we provide ongoing support and regular site visits to ensure the build aligns with the design intent. We're your advocate throughout the construction process, addressing any issues that arise and ensuring quality outcomes.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const processSectionRef = useRef<HTMLDivElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const toggleForm = () => setIsFormOpen(!isFormOpen);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effects
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const overviewParallax = useTransform(scrollYProgress, [0.2, 0.5], [0, -50]);

  // GSAP animations for process cards (desktop only)
  useEffect(() => {
    if (!processSectionRef.current) return;

    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Clear any existing ScrollTriggers on mobile
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      return;
    }

    const items = gsap.utils.toArray(".process_stages_item") as Element[];

    if (items.length === 0) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Set initial states for all items
    items.forEach((item: Element) => {
      const container = item.querySelector(".process_stages_contain");
      const overlay = item.querySelector(".process_stages_overlay");

      gsap.set(container, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        z: 0,
        transformOrigin: "50% 10%",
      });

      gsap.set(overlay, {
        opacity: 0,
      });
    });

    // Create stacking animation for each item
    items.forEach((item: Element, index: number) => {
      const container = item.querySelector(".process_stages_contain");
      const overlay = item.querySelector(".process_stages_overlay");
      const nextItem = items[index + 1];

      if (index < items.length - 1) {
        // For all items except the last one, create stacking animation
        ScrollTrigger.create({
          trigger: nextItem,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * 0.1;
            const rotationX = progress * -15;
            const rotationY =
              (index % 2 === 0 ? 1 : -1) * progress * 12;
            const z = progress * -200;
            const overlayOpacity = progress * 0.3;

            gsap.set(container, {
              scale,
              rotationX,
              rotationY,
              z,
              transformOrigin: "50% 10%",
            });

            gsap.set(overlay, {
              opacity: overlayOpacity,
            });
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-white py-20 md:py-52">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center pt-16 pb-8 md:py-0">
        <motion.div
          className="w-full px-5 md:px-16"
          style={{ y: heroParallax }}
        >
          <div className="mx-auto">
            {/* Section label on the left */}
            <div className="flex flex-col md:flex-row mb-0 md:mb-0">
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-md font-semibold uppercase tracking-widest text-black">
                  (PROCESS)
                </h3>
              </div>

              {/* Text content on the right */}
              <div className="w-full md:w-3/4">
                <TextAnimation>
                  <h1 className="text-4xl md:text-7xl font-bold text-black leading-sung mb-8 md:mb-12">
                    Great architecture is not just about talent and
                    experience, but collaborations and relationships.
                  </h1>
                </TextAnimation>

                {/* Image - positioned after the text */}
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src="/img/p1.jpg"
                    alt="Modern architecture exterior"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Our Approach Section */}
      <section className="py-0 relative bottom-20 md:bottom-0 md:py-20 px-5 md:px-16 bg-white">
        <div className="mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Title */}
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-md font-semibold uppercase tracking-widest text-black">
                (OUR APPROACH)
              </h3>
            </div>

            {/* Right side - Content */}
            <div className="w-full md:w-3/4">
              <div className="space-y-6">
                <TextAnimation>
                  <p className="text-xl md:text-2xl font-medium text-black leading-relaxed">
                    You can expect our team to expertly guide your project
                    and work closely with you at every stage from delivering
                    the initial design concepts to achieving a final build
                    that goes beyond your aspirations
                  </p>
                </TextAnimation>

                <div className="text-center mt-10 md:mt-16 flex justify-center">
                  <div className="w-full flex justify-center">
                    <button 
                      onClick={toggleForm}
                      className="group relative flex items-center gap-3 bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-neutral-800 transition-colors duration-300 overflow-hidden"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contact isOpen={isFormOpen} onClose={toggleForm} />

      {/* Overview Section with Dark Background */}
      <section className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Background Image with parallax */}
        <div className="absolute inset-0">
          <Image
            src="/img/p2.avif"
            alt="Architecture detail"
            fill
            className="object-cover opacity-60"
          />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex items-start min-h-screen px-5 md:px-16 pt-7"
          style={{ y: overviewParallax }}
        >
          <div className="max-w-5xl">
            <div>
              <TextAnimation>
                <h2 className="text-5xl md:text-[9rem] font-semibold text-white leading-none mb-8">
                  OVERVIEW OF
                  <br />
                  OUR 6-STAGE
                  <br />
                  PROCESS
                </h2>
              </TextAnimation>
            </div>

            <div className="absolute bottom-12 right-5 md:right-12">
              <div className="flex items-center text-white text-4xl">
                <span className="mr-1 text-[7rem] leading-none">(</span>
                <svg
                  className="w-28 h-28 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <span className="ml-1 text-[7rem] leading-none">)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Process Stages */}
      <section ref={processSectionRef} className="bg-black">
        <div className="process_stages_collection">
          <div className="process_stages_list">
            {processStages.map((stage, index) => (
              <ProcessStage key={index} {...stage} index={index} />
            ))}
          </div>
        </div>
      </section>
      <Review />
    </main>
  );
}

type ProcessStageProps = {
  number: string;
  title: string;
  description: string;
  image: string;
  index: number;
};

function ProcessStage({
  number,
  title,
  description,
  image,
}: ProcessStageProps) {
  return (
    <div
      className="process_stages_item md:sticky md:top-16"
      style={{ perspective: "250vw" }}
    >
      <div
        className="process_stages_contain bg-white pt-8 pb-8 px-5 md:pt-12 md:pr-8 md:pb-28 md:pl-8 lg:pr-16 lg:pl-16"
        style={{ transformStyle: "preserve-3d", transformOrigin: "50% 10%" }}
      >
        {/* Overlay */}
        <div className="process_stages_overlay absolute inset-0 bg-black opacity-0 pointer-events-none z-10"></div>

        {/* Content */}
        <div className="process_stages_content flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-8 max-w-7xl mx-auto items-start">
          {/* Number on the left */}
          <div className="process_stages_index flex justify-start md:col-span-3">
            <span className="text-4xl md:text-8xl font-bold text-black opacity-20 md:opacity-100">
              ({number})
            </span>
          </div>

          {/* Right Side: Title, Image, Paragraph */}
          <div className="flex flex-col gap-4 md:gap-6 md:col-span-9">
            {/* Title */}
            <TextAnimation>
              <h2 className="process_stages_heading text-2xl md:text-6xl font-bold uppercase text-black leading-tight">
                {title}
              </h2>
            </TextAnimation>

            {/* Image */}
            <div className="process_stages_cover relative w-full max-w-6xl aspect-[4/3] md:aspect-[16/8] overflow-hidden">
              <div className="g_image_cover absolute inset-0 bg-black opacity-0 invisible"></div>
              <Image
                src={image}
                alt={title}
                fill
                className="process_stages_image object-cover"
              />
            </div>

            {/* Description */}
            <TextAnimation delay={0.2}>
              <p className="process_stages_paragraph text-base md:text-xl leading-relaxed text-black max-w-3xl font-semibold">
                {description}
              </p>
            </TextAnimation>
          </div>
        </div>
      </div>
    </div>
  );
}