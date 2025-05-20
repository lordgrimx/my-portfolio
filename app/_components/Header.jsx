"use client";
import React, { useEffect, useState } from 'react'

function Header() {

  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const initialHash = window.location.hash || '#hello';
    setActiveLink(initialHash);

    if(!window.location.hash){
      window.history.replaceState(null, '', initialHash);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash;
      setActiveLink(newHash);
    }
    window.addEventListener('hashchange', handleHashChange);

    // IntersectionObserver ayarlarını iyileştiriyoruz
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -300px 0px", // Daha iyi bir görünürlük marjini
      threshold: 0.2 // Section'ın %20'si görünür olmalı
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      // En fazla görünür olan section'ı bulmak için görünür section'ları filtrele
      const visibleSections = entries.filter(entry => entry.isIntersecting);
      
      if (visibleSections.length > 0) {
        // Sayfa pozisyonuna göre en üstteki section'ı seç 
        // (varsayılan olarak ilk görüneni alır)
        const mostVisibleSection = visibleSections[0];
        const sectionId = `#${mostVisibleSection.target.id}`;
        
        if(window.location.hash !== sectionId) {
          window.history.replaceState(null, '', sectionId);
          setActiveLink(sectionId);
        }
      }
    }, observerOptions);

    // Tüm section'ları bul ve gözlemlemeye başla
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      sectionObserver.observe(section);
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      // Observer'ı temizle
      if (sections) {
        sections.forEach(section => {
          sectionObserver.unobserve(section);
        });
      }
    }
  }
  , []);


  return (
    <nav className="backdrop-blur-sm border-b px-6 py-3 fixed w-full top-0 z-50 transition-colors duration-300 bg-black/20 dark:bg-gray-900/30 border-white/10 dark:border-gray-800/30">
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <div className='font-mono text-emerald-400 text-lg font-bold hover:text-emerald-300 transition-colors'>
          sabriAlperen<span className="text-white dark:text-gray-200">-kaya</span>
        </div>
        
        <div className='flex items-center space-x-8'>
          <NavLink href="#hello" isActive={activeLink === "#hello"}>_hello</NavLink>
          <NavLink href="#about-me" isActive={activeLink === "#about-me"}>_about-me</NavLink>
          <NavLink href="#projects" isActive={activeLink === "#projects"}>_projects</NavLink>
          <NavLink href="#contact-me" isActive={activeLink === "#contact-me"}>_contact-me</NavLink>
        </div>
        
        <div className='flex items-center space-x-4'>
          <div className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors bg-white/5 hover:bg-white/10 dark:bg-gray-800/30 dark:hover:bg-gray-700/30'>
            <span role="img" aria-label="Language Changer" className="text-sm">🌐</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, children, isActive }) => (
  <a 
    href={href}
    className={`font-mono relative group transition-all duration-300 ${
      isActive 
        ? 'text-emerald-400 dark:text-emerald-300' 
        : 'text-white/70 dark:text-gray-300/70 hover:text-emerald-400 dark:hover:text-emerald-300'
    }`}
  >
    {children}
    <span className={`absolute -bottom-1 left-0 h-[2px] bg-emerald-400 dark:bg-emerald-300 transition-all duration-300 ${
      isActive ? 'w-full' : 'w-0 group-hover:w-full'
    }`}></span>
  </a>
)

export default Header