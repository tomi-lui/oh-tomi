"use client";

import About from "@/components/sections/About";

import Work from "@/components/sections/Work";
import Hero from "@/components/sections/Hero";
import { useEffect } from "react";
import { projects } from "@/data/projects";
import Process from "@/components/sections/Processhome";
import Review from "@/components/sections/Review";




export default function Home() {
useEffect(() => {
// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';


return () => {
  document.documentElement.style.scrollBehavior = 'auto';
};


}, []);

return (
<main className="bg-white ">
<Hero />
<About />
<Work projects={projects} />
<Process/>
<Review/>



</main>
);
}