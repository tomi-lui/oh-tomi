"use client";

import InfiniteGrid from "../../components/layout/InfiniteGrid";

export default function Gallery() {
  return (
    <main className=" w-screen relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Content if needed */}
      </div>
      
      {/* Text paragraph in bottom left */}
      <div className="absolute bottom-8 left-8 max-w-md z-30">
        <p className="text-white font-semibold text-lg leading-relaxed">
          Immerse yourself in our digital laboratory where creativity meets innovation. 
          Explore endless possibilities through our interactive experiments and visual explorations. 
          Each element represents a unique approach to blending technology with artistic expression.
        </p>
      </div>
      
      <InfiniteGrid />
    </main>
  );
}