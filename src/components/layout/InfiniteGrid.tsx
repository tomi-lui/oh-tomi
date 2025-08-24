"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Observer from "gsap/Observer";
import useInitialLoad from "@/contexts/initial-load-context";
import { labs } from "../../data/labs";

gsap.registerPlugin(Observer);

export default function InfiniteGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isInitialLoad } = useInitialLoad();

  useGSAP(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const halfX = container.clientWidth / 2;
    const wrapX = gsap.utils.wrap(-halfX, 0);
    const xTo = gsap.quickTo(container, "x", {
      duration: 1.5,
      ease: "power4",
      modifiers: {
        x: gsap.utils.unitize(wrapX),
      },
    });

    const halfY = container.clientHeight / 2;
    const wrapY = gsap.utils.wrap(-halfY, 0);
    const yTo = gsap.quickTo(container, "y", {
      duration: 1.5,
      ease: "power4",
      modifiers: {
        y: gsap.utils.unitize(wrapY),
      },
    });

    let incrX = 0,
      incrY = 0;

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      onChangeX: (self) => {
        if (self.event.type === "wheel") incrX -= self.deltaX;
        else incrX += self.deltaX * 2;

        xTo(incrX);
      },
      onChangeY: (self) => {
        if (self.event.type === "wheel")
          incrY -= self.deltaY;
        else incrY += self.deltaY * 2;

        yTo(incrY);
      },
    });

    return () => {
      observer.kill();
    };
  }, []);

  const renderMediaItems = (ariaHidden?: boolean) => (
    <div
      className="grid w-max grid-cols-[repeat(4,1fr)] gap-[15vw] p-[8vw] pointer-events-none"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {labs.map((path, index) => (
        <motion.div
          className="w-[70vw] md:w-[30vw] aspect-square select-none will-change-[scale,clipPath] rounded-xl overflow-hidden z-0 relative"
          key={`${index}-${ariaHidden ? "hidden" : "visible"}`}
          initial={
            ariaHidden
              ? undefined
              : {
                  clipPath: "polygon(15% 50%, 85% 50%, 85% 50%, 15% 50%)",
                  scale: 1.3,
                }
          }
          animate={
            ariaHidden
              ? undefined
              : {
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  scale: 1,
                }
          }
          transition={
            ariaHidden
              ? undefined
              : {
                  duration: 1,
                  delay: isInitialLoad ? 2.8 : 0.8,
                  ease: [0.76, 0, 0.24, 1],
                }
          }
        >
          {path.includes(".png") ? (
            <Image
              src={path || "/placeholder.svg"}
              alt=""
              fill
              className="w-full h-full object-contain z-0"
            />
          ) : (
            <video
              src={path}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain z-0"
            />
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="h-screen w-full overflow-hidden pointer-events-none">
      <div
        ref={containerRef}
        className="grid grid-cols-[repeat(2,1fr)] w-max will-change-transform"
      >
        {renderMediaItems()}
        {renderMediaItems(true)}
        {renderMediaItems(true)}
        {renderMediaItems(true)}
      </div>
    </section>
  );
}