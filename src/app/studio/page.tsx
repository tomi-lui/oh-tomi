"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import TextAnimation from "../../components/layout/TextAnimation";

// Team data
const teamMembers = [
  {
    name: "Johnny Hyde",
    role: "Director",
    image: "/img/s6.avif",
    credentials: "M.Arch (QUT), B.Des (ArchSt)\nHons. (QUT)\nBOA Queensland No. 6021"
  },
  {
    name: "Poppie Kenneally",
    role: "Director",
    image: "/img/s8.avif",
    credentials: "B.Interior Design (QUT)\nDIDA Member"
  },
  {
    name: "Daniel Hickey",
    role: "Associate",
    image: "/img/s9.avif",
    credentials: "M.Arch (QUT)\nBOA Queensland No. 7243"
  },
  {
    name: "Nick Tan",
    role: "Architect",
    image: "/img/s4.avif",
    credentials: "M.Arch (QUT)\nBOA Queensland No. 8156"
  },
  {
    name: "Rachael Mellick",
    role: "Architect",
    image: "/img/s5.avif",
    credentials: "M.Arch (Griffith)\nBOA Queensland No. 7891"
  },
  {
    name: "Laura Sherriff",
    role: "Architect",
    image: "/img/s6.avif",
    credentials: "M.Arch (QUT)\nBOA Queensland No. 8234"
  },
  {
    name: "Hamish Maguire",
    role: "Architect",
    image: "/img/s8.avif",
    credentials: "M.Arch (UQ)\nBOA Queensland No. 8567"
  }
];

// Awards and Publications data
const awards = [
  {
    year: "2024",
    project: "Sidney house",
    award: "Greater Brisbane Architecture Awards - Regional Commendation Residential Architecture – Alterations and Additions"
  },
  {
    year: "2024",
    project: "Sidney house",
    award: "Queensland Architecture Awards - Residential Architecture - Houses (Alterations and Additions)"
  }
];

const publications = [
  { year: "2025", publication: "Grand Designs Australia Magazine", article: "Haig" },
  { year: "2024", publication: "Archello", article: "Sidney house" },
  { year: "2024", publication: "Architecture, Au", article: "Sidney house" },
  { year: "2024", publication: "Dwell", article: "Sidney house" },
  { year: "2023", publication: "House & Garden", article: "Greer" },
  { year: "2021", publication: "Architecture and Design", article: "Hawken" },
  { year: "2021", publication: "Inside Out", article: "Birdwood" },
  { year: "2021", publication: "QLD Homes", article: "Lloyd" },
  { year: "2020", publication: "Brisbane Kitchen and Bathroom", article: "Antill" }
];

export default function Studio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects for different sections
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const aboutParallax = useTransform(scrollYProgress, [0.2, 0.6], [0, -50]);
  const teamParallax = useTransform(scrollYProgress, [0.4, 0.8], [0, -30]);

  return (
    <main ref={containerRef} className="bg-white">
      {/* Hero Section - Large OH Typography */}
      <section className="h-auto min-h-[60vh] md:h-screen relative flex items-center justify-center py-8 md:py-0">
        <motion.div
          className="text-center"
          style={{ y: heroParallax }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h1 className="text-[65vw] font-black leading-none mt-7 text-black">
            NH
          </h1>
        </motion.div>
      </section>

      <section className="p-8 md:p-2 md:mt-36 md:mx-52 relative hidden md:block">
        {/* About Our Studio indicator */}
        <motion.div
          className="absolute mt-4 md:mt-10 left-8 text-black text-md uppercase tracking-widest font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          (ABOUT OUR STUDIO)
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute mt-4 md:mt-10 right-8 text-black text-sm uppercase tracking-widest font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          (SCROLL TO EXPLORE)
        </motion.div>
      </section>

      {/* Studio Philosophy Section */}
      <section className="py-12 md:min-h-screen relative flex items-center justify-center md:mt-24">
        <motion.div
          className="max-w-5xl px-6 md:px-16"
          style={{ y: aboutParallax }}
        >
          <div className="text-center">
            <TextAnimation>
              <h2 className="text-2xl md:text-6xl font-bold text-black leading-tight ">
                At NH, we take a collaborative
                approach. Whether we are working
                in the studio or alongside our
                clients and partners, it is this
                shared process that helps us
                create work that reflects both your
                vision and ours.
              </h2>
            </TextAnimation>
          </div>
        </motion.div>
      </section>

      <section className="py-8 md:py-16 relative px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Left image - Smaller */}
          <div className="md:col-span-4 aspect-[4/5] md:aspect-auto md:h-8/10 relative overflow-hidden">
            <Image
              src="/img/st2.avif"
              alt="Studio workspace detail"
              fill
              className="object-cover"
            />
          </div>

          {/* Right image - Taller */}
          <div className="md:col-span-8 aspect-[4/5] md:aspect-[3/2] relative overflow-hidden hidden md:block">
            <Image
              src="/img/st1.avif"
              alt="Studio interior workspace"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Design Ethos Section */}
      <section className="py-12 md:min-h-screen relative flex justify-end">
        <div className="w-full px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-full md:relative md:left-36">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-4 md:gap-12 md:ml-96"
              >
                {/* Left small heading */}
                <h3 className="text-xs md:text-lg uppercase tracking-widest text-black font-semibold whitespace-nowrap">
                  (DESIGN ETHOS)
                </h3>

                {/* Right paragraph */}
                <TextAnimation>
                  <p className="text-lg md:text-4xl font-semibold text-black leading-normal md:leading-tight max-w-6xl">
                    Our design ethos is grounded in passive design principles, carefully considered
                    planning, and intuitive spatial flow. We approach each project with the intent to
                    resolve the complexities of daily life — introducing ease and clarity through
                    architecture that is both purposeful and refined.
                  </p>
                </TextAnimation>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with Sticky Image */}
      <section className="py-16 md:min-h-screen relative bg-white md:bottom-96">
        <motion.div className="w-full px-6 md:px-16" style={{ y: teamParallax }}>
          <div className="mx-auto">
            {/* Team Header */}
            <motion.div
              className="mb-12 md:mb-16 text-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-md font-semibold uppercase tracking-tight text-black mb-4">
                ( OUR TEAM )
              </h3>
              <TextAnimation>
                <h2 className="text-4xl md:text-9xl font-black text-black leading-tight">
                  MEET THE TEAM
                  <br />
                  BEHIND THE DESIGNS
                </h2>
              </TextAnimation>
            </motion.div>

            {isMobile ? (
              // Mobile layout
              <div className="space-y-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-full aspect-[3/4] relative overflow-hidden mb-4 max-w-sm mx-auto">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-start text-black px-4">
                      <div className="text-xl uppercase tracking-widest font-semibold">
                        {member.name}
                      </div>
                      <h3 className="text-lg font-bold text-black mb-3">
                        {member.role}
                      </h3>
                      <div className="text-sm font-semibold leading-relaxed whitespace-pre-line">
                        {member.credentials}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop layout with sticky image
              <div className="grid grid-cols-12 gap-16 items-start ml-96">
                {/* Left - Names & Roles */}
                <div className="col-span-7 space-y-6">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setSelectedMember(index)}
                      onMouseEnter={() => setSelectedMember(index)}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-baseline gap-4">
                        {/* Role */}
                        <span className={`text-base font-medium transition-colors duration-300 ${
                          index === selectedMember ? "text-black" : "text-gray-600"
                        }`}>
                          {member.role}
                        </span>
                        {/* Name */}
                        <h3 className={`text-4xl md:text-6xl font-bold transition-colors duration-300 ${
                          index === selectedMember ? "text-black" : "text-gray-600"
                        }`}>
                          {member.name}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right - Sticky Image + Credentials */}
                <div className="col-span-5 flex flex-col items-center lg:items-start justify-start sticky top-24 h-fit">
                  <div className="w-full h-full max-w-sm aspect-[9/16] relative overflow-hidden mb-6">
                    <Image
                      src={teamMembers[selectedMember].image}
                      alt={teamMembers[selectedMember].name}
                      fill
                      className="object-contain transition-all duration-500"
                    />
                  </div>
                  <motion.div
                    className="text-left text-black max-w-sm"
                    key={selectedMember}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-md font-semibold leading-relaxed whitespace-pre-line relative bottom-10">
                      {teamMembers[selectedMember].credentials}
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Recognition Section */}
      <section className="py-16 md:min-h-screen relative md:bottom-16">
        <div className="w-full px-6 md:px-16">
          <div className="mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-20">
              {/* Left side - Text */}
              <motion.div
                className="space-y-6 md:space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-md font-semibold uppercase tracking-widest text-black">
                  (RECOGNITION)
                </h3>

                <div className="space-y-4 text-black text-base md:text-lg font-bold leading-relaxed max-w-md">
                  <TextAnimation>
                    <p>
                      Awards and media recognition are not the goal, but they remind us that thoughtful design leaves a lasting impact.
                    </p>
                  </TextAnimation>

                  <TextAnimation>
                    <p>
                      When our projects earn accolades or are featured in leading publications, it reflects the dedication, creativity, and collaboration that define NH Architecture.
                    </p>
                  </TextAnimation>

                  <TextAnimation>
                    <p>
                      It is a testament to spaces that resonate deeply with both our clients and the architectural community.
                    </p>
                  </TextAnimation>
                </div>
              </motion.div>

              {/* Right side - Image */}
              <motion.div
                className="aspect-[4/3] md:aspect-[4/5] relative overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/img/st1.avif"
                  alt="Award-winning architecture"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Awards and Publications Section */}
            <div className="pt-12 md:pt-16 border-t border-gray-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                {/* Awards */}
                <div className="lg:col-span-5">
                  <h3 className="text-md font-semibold uppercase tracking-widest border-b-2 md:border-none border-gray-300 pb-2 md:pb-0 text-black">
                    (AWARDS)
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <div className="space-y-6 md:space-y-8">
                    {/* Table Header - Hidden on mobile */}
                    <div className="hidden md:grid grid-cols-12 gap-4 font-semibold text-black border-b border-gray-300 pb-2">
                      <div className="col-span-2">Year</div>
                      <div className="col-span-3">Project</div>
                      <div className="col-span-7">Award</div>
                    </div>

                    {/* Table Rows */}
                    {awards.map((award, index) => (
                      <div key={index} className="md:grid md:grid-cols-12 md:gap-4 items-start text-black border-b border-gray-200 py-4 space-y-2 md:space-y-0">
                        <div className="md:col-span-2 font-bold text-sm md:text-base">
                          <span className="md:hidden text-gray-600">Year: </span>
                          {award.year}
                        </div>
                        <div className="md:col-span-3 font-medium text-sm md:text-base">
                          <span className="md:hidden text-gray-600">Project: </span>
                          {award.project}
                        </div>
                        <div className="md:col-span-7 text-sm md:text-base">
                          <span className="md:hidden text-gray-600">Award: </span>
                          {award.award}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Publications Section */}
              <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                <div className="lg:col-span-5">
                  <h3 className="text-md uppercase tracking-widest text-black mb-4 md:mb-8 border-b-2 md:border-none pb-2 md:pb-0 border-gray-300 font-bold">
                    (PUBLICATIONS)
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <div className="space-y-6 md:space-y-8">
                    {/* Table Header - Hidden on mobile */}
                    <div className="hidden md:grid grid-cols-12 gap-4 font-semibold text-black border-b border-gray-300 pb-2">
                      <div className="col-span-2">Year</div>
                      <div className="col-span-4">Publication</div>
                      <div className="col-span-6">Article</div>
                    </div>

                    {/* Table Rows */}
                    {publications.map((pub, index) => (
                      <div key={index} className="md:grid md:grid-cols-12 md:gap-4 items-start text-black border-b border-gray-200 py-4 space-y-2 md:space-y-0">
                        <div className="md:col-span-2 font-bold text-sm md:text-base">
                          <span className="md:hidden text-gray-600">Year: </span>
                          {pub.year}
                        </div>
                        <div className="md:col-span-4 font-medium text-sm md:text-base">
                          <span className="md:hidden text-gray-600">Publication: </span>
                          {pub.publication}
                        </div>
                        <div className="md:col-span-6 text-sm md:text-base">
                          <span className="md:hidden text-gray-600">Article: </span>
                          {pub.article}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
