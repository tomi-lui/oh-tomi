"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import TextAnimation from "../layout/TextAnimation";

const testimonials = [
  {
    id: 1,
    quote: "From the initial meeting I was impressed by the genuine enthusiasm and willingness to engage with the ideas in my brief. Johnny Hyde and the OH Architecture team engendered confidence. They cared about the project; throughout the design process they listened and interacted in a positive and professional, but relaxed, way.",
    secondQuote: "As they explored design ideas, they welcomed my contributions and encouraged feedback. Consequently, I had no doubt that OH Architecture would deliver a design to meet my dreams and also my budget. And in fact, the award-winning outcome eminently attests to their skill and achievement on both counts!",
    clientName: "CARMEN",
    clientTitle: "HOMEOWNER OF SIDNEY",
    projectTitle: "SIDNEY HOUSE",
    projectLocation: "ALDERLEY, QLD",
    projectYear: "2023",
    projectImage: "/img/r2.avif",
    exteriorImage: "/img/r1.avif",
    hoverImage: "/img/21.avif"
  }
];

export default function Review() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  

  return (
    <section className="relative z-20 px-4 lg:px-8 py-24 bg-white">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TextAnimation>
              <p className="text-lg uppercase tracking-wider mb-4 text-black font-semibold">
                (HEAR FROM OUR CLIENT)
              </p>
            </TextAnimation>
          </motion.div>
        </div>

        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Side - Content (60% width) */}
            <div className="lg:w-3/5 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Exterior Image */}
                <div className="relative w-full max-w-[900px]">
                  <div className="relative overflow-hidden rounded-lg aspect-[5/3]">
                    <Image
                      src={testimonial.exteriorImage}
                      alt="House exterior"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>  

                {/* Testimonial Quote */}
                <div className="space-y-6 max-w-2xl"> 
                  <TextAnimation>
                    <p className="text-xl leading-relaxed text-black font-semibold">
                      {testimonial.quote}
                    </p>
                  </TextAnimation>
                  
                  <TextAnimation delay={0.2}>
                    <p className="text-xl leading-relaxed text-black font-semibold">
                      {testimonial.secondQuote}
                    </p>
                  </TextAnimation>
                </div>

                {/* Client Info */}
                <div className="pt-4">
                  <TextAnimation>
                    <h4 className="text-xl font-medium text-black mb-1">
                      {testimonial.clientName}
                    </h4>
                  </TextAnimation>
                  <TextAnimation delay={0.1}>
                    <p className="text-base text-black font-semibold">
                      {testimonial.clientTitle}
                    </p>
                  </TextAnimation>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Project Image (40% width) */}
            <div className="lg:w-2/5 flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-full"
                onMouseEnter={() => setHoveredProject(testimonial.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-lg aspect-[4/5]">
                  {/* Background Image with Blur Effect */}
                  <motion.div
                    animate={{
                      scale: hoveredProject === testimonial.id ? 1.2 : 1,
                      filter: hoveredProject === testimonial.id ? "blur(4px)" : "blur(0px)"
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={testimonial.projectImage}
                      alt={testimonial.projectTitle}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Dark Overlay */}
                  <motion.div
                    animate={{
                      opacity: hoveredProject === testimonial.id ? 0.7 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black"
                  />

                  {/* Hover Content */}
                  <motion.div
                    animate={{
                      opacity: hoveredProject === testimonial.id ? 1 : 0,
                      scale: hoveredProject === testimonial.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6"
                  >
                    {/* Project Title */}
                    <div className="text-white text-center mb-4">
                      <TextAnimation animateOnScroll={false}>
                        <h3 className="text-xl font-medium tracking-wide">
                          {testimonial.projectTitle}
                        </h3>
                      </TextAnimation>
                    </div>

                    {/* Hover Image */}
                    <div className="relative w-[60%] h-[60%]">
                      <Image
                        src={testimonial.hoverImage}
                        alt={testimonial.projectTitle}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    {/* Location */}
                    <div className="text-white text-center mt-4">
                      <TextAnimation animateOnScroll={false}>
                        <p className="text-sm">{testimonial.projectLocation}</p>
                      </TextAnimation>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Project Details (Below the image) */}
              <div className="flex justify-between items-center mt-4">
                <TextAnimation>
                  <span className="text-sm text-black font-semibold">
                    ( {testimonial.projectYear} ) {testimonial.projectTitle}
                  </span>
                </TextAnimation>
                <Link 
                  href={`/works/${testimonial.projectTitle}`}
                  className="text-sm hover:underline flex items-center gap-2 text-black font-semibold"
                >
                  VIEW PROJECT →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}