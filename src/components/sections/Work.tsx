"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Project } from "@/data/projects";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef(null);

  // Animate on scroll
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["end start", "start end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <Link
      key={project.slug}
      href={`/works/${project.slug}`}
      className={`flex flex-col gap-4 ${
        index % 2 === 0 ? "items-start mr-8 md:mr-0" : "items-end ml-8 md:ml-0"
      }`}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="w-full"
      >
        {/* Image container */}
        <div
          className={`relative overflow-hidden w-full ${
            index % 2 === 0
              ? "aspect-[9/16] md:aspect-[2/3]"
              : "aspect-[16/9] md:aspect-[3/2]"
          }`}
        >
          <motion.div style={{ scale }} className="w-full h-full">
            <Image
              src={project.backgroundImageUrl}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </div>

        {/* Project info */}
        <div className="flex justify-between items-center w-full mt-4">
          <div
            className={`flex items-center gap-2 ${
              index % 2 === 0 ? "" : "flex-row-reverse"
            }`}
          >
            <span className="text-xl font-medium text-black">
              ({String(index + 1).padStart(2, "0")})
            </span>
            <h3 className="text-xl font-medium uppercase">{project.title}</h3>
          </div>

          <motion.div whileHover="hover" className="relative overflow-hidden h-6">
            <motion.span
              variants={{ hover: { y: -24 } }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block text-xl font-medium text-black cursor-pointer"
            >
              {project.year}
              <span className="absolute top-6 left-0 text-black">View →</span>
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Work({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projects.slice(0, 6);

  return (
    <section className="relative z-20 px-4 lg:px-8 py-24 bg-white w-full">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-16 uppercase">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(60px,9vw,150px)] font-medium leading-none"
          >
            Featured <br className="hidden md:block" />
            <span className="md:ml-74">Works</span>
          </motion.h2>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(60px,9vw,150px)] font-medium leading-none"
          >
            (06)
          </motion.span>
        </div>

        {/* Projects Grid */}
        <div ref={containerRef} className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-5">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-16 flex justify-center"
        >
          <div className="w-full flex justify-center mt-16">
            <Link href="/works">
              <button className="group relative flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-neutral-800 transition-colors duration-300 overflow-hidden">
                {/* Animated text wrapper */}
                <div className="overflow-hidden h-6">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                    <span className="text-[clamp(14px,1vw,18px)] font-semibold mb-1.5 uppercase">
                      View all works
                    </span>
                    <span className="text-[clamp(14px,1vw,18px)] font-semibold mb-1.5">
                      View all works
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
      </div>
    </section>
  );
}
