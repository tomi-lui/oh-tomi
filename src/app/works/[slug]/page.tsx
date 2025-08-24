"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

import { redirect, useParams } from "next/navigation";
import useInitialLoad from "@/contexts/initial-load-context";
import Link from "next/link";
import TextAnimation from "@/components/layout/TextAnimation";

export default function Project() {
  const { isInitialLoad } = useInitialLoad();
  const containerRef = useRef<HTMLDivElement>(null);
  const params = useParams();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.9]);

  // Get slug from params
  const slug = params.slug as string;
  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    redirect("/works");
  }

  // Find next project
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Create array of project images
  const projectImages = [
    project.image1,
    project.image2,
    project.image3,
    project.image4,
    project.image5,
    project.image6,
    project.image7,
    project.image8,
    project.image9,
    project.image10,
  ].filter(Boolean);

  return (
    <main ref={containerRef} className="relative bg-black overflow-hidden">
      {/* Fixed Parallax Background */}
      <div className="fixed inset-0 z-0">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <Image
            src={project.backgroundImageUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-end pb-16 px-8 md:px-16">
          {/* Project Title */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isInitialLoad ? 1.2 : 0.8 }}
          >
            <TextAnimation>
              <h1 className="text-6xl md:text-9xl font-bold text-white leading-none tracking-tight whitespace-nowrap">
                {project.title}
              </h1>
            </TextAnimation>
          </motion.div>

          {/* Footer Info */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-16 border-t border-white/20 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isInitialLoad ? 1.8 : 1.4 }}
          >
            <TextAnimation>
              <div className="text-white text-lg tracking-wider">
                {project.location.toUpperCase()}
              </div>
            </TextAnimation>

            <TextAnimation>
              <div className="text-white text-lg text-center tracking-wider">
                {project.country.toUpperCase()}
              </div>
            </TextAnimation>

            <TextAnimation>
              <div className="text-white text-lg text-right tracking-wider opacity-70">
                SCROLL TO VIEW MORE
              </div>
            </TextAnimation>
          </motion.div>
        </section>

        {/* Project Details Section */}
        <section className="py-16 px-8 md:px-16 relative z-20">
          <div className="max-w-6xl mx-auto">
            {project.description && (
              <motion.div
                className="ml-auto max-w-2xl mb-16"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <TextAnimation>
                  <p className="text-xl md:text-2xl font-light text-white leading-relaxed">
                    {project.description}
                  </p>
                </TextAnimation>
              </motion.div>
            )}

            {/* Details Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 gap-8 max-w-4xl ml-0 md:ml-auto md:text-right"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-10">
                <div>
                  <TextAnimation>
                    <h3 className="text-gray-100 text-sm uppercase tracking-widest mb-3 opacity-70">
                      Date Completed
                    </h3>
                  </TextAnimation>
                  <TextAnimation>
                    <p className="text-2xl font-light text-white">
                      {project.dateCompleted}
                    </p>
                  </TextAnimation>
                </div>

                <div>
                  <TextAnimation>
                    <h3 className="text-gray-100 text-sm uppercase tracking-widest mb-3 opacity-70">
                      Project Type
                    </h3>
                  </TextAnimation>
                  <TextAnimation>
                    <p className="text-2xl font-light text-white">
                      {project.projectType}
                    </p>
                  </TextAnimation>
                </div>
              </div>

              <div className="space-y-10">
                {project.collaborators && project.collaborators.length > 0 && (
                  <div>
                    <TextAnimation>
                      <h3 className="text-gray-100 text-sm uppercase tracking-widest mb-3 opacity-70">
                        Collaborators
                      </h3>
                    </TextAnimation>
                    {project.collaborators.map((c, index) => (
                      <TextAnimation key={index}>
                        <p className="text-2xl font-light text-white mb-2">{c}</p>
                      </TextAnimation>
                    ))}
                  </div>
                )}

                {project.photography && project.photography.length > 0 && (
                  <div>
                    <TextAnimation>
                      <h3 className="text-gray-100 text-sm uppercase tracking-widest mb-3 opacity-70">
                        Photography
                      </h3>
                    </TextAnimation>
                    {project.photography.map((p, index) => (
                      <TextAnimation key={index}>
                        <p className="text-2xl font-light text-white mb-2">{p}</p>
                      </TextAnimation>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Images */}
        <section className="relative z-20 bg-white py-4 px-4 md:px-6 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {projectImages.slice(0, 2).map((image, index) => (
              <div key={index} className="aspect-[9/16] relative">
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {projectImages.slice(2).map((image, index) => (
            <div
              key={index + 2}
              className="w-full aspect-[16/9] relative mb-8"
            >
              <Image
                src={image}
                alt={`${project.title} - Image ${index + 3}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </section>

        {/* Next Project */}
        <section className="relative z-20 bg-white py-16 px-8 md:px-16 border-t border-gray-300">
          <div className="flex items-center justify-between">
            <div className="text-4xl">+</div>
            <TextAnimation>
              <p className="text-md uppercase tracking-widest text-black font-semibold mb-4">
                (Next Project)
              </p>
            </TextAnimation>
            <div className="text-4xl">+</div>
          </div>

          <div className="text-center my-8">
            <TextAnimation>
              <h2 className="text-4xl md:text-9xl font-bold text-black uppercase whitespace-nowrap">
                {nextProject.title}
              </h2>
            </TextAnimation>
          </div>
        </section>

        <section className="relative z-20 bg-white pb-24 px-8 md:px-16">
          <Link href={`/works/${nextProject.slug}`} className="block group">
            <div className="relative aspect-video max-w-6xl mx-auto overflow-hidden">
              <Image
                src={nextProject.backgroundImageUrl}
                alt={nextProject.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
            </div>
          </Link>
          <div className="flex items-center justify-between mt-72">
            <div className="text-4xl">+</div>
            <div className="text-4xl">+</div>
          </div>
        </section>
      </div>
    </main>
  );
}
