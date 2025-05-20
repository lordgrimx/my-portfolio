"use client";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import About from "./_components/About";
import Projects from "./_components/Projects";
import Contact from "./_components/Contact";



export default function Home() {
  return (
    
    <div className="min-h-screen text-white overflow-hidden relative transition-colors duration-300 bg-gradient-to-br from-black via-blue-950 to-indigo-950 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-0"></div>
      <div className="relative z-10">
          <Header />
          <Hero />
          <About />
          <Projects />
          <Contact />
      </div>
    </div>
    

  );
}
