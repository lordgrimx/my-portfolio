import React from 'react'
import { ModeToggle } from '@/components/mode-toggle'

function Header() {
  return (
    <nav className="backdrop-blur-sm border-b px-6 py-3 fixed w-full top-0 z-50 transition-colors duration-300 bg-black/20 dark:bg-gray-900/30 border-white/10 dark:border-gray-800/30">
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <div className='font-mono text-emerald-400 text-lg font-bold hover:text-emerald-300 transition-colors'>
          sabriAlperen<span className="text-white dark:text-gray-200">-kaya</span>
        </div>
        
        <div className='flex items-center space-x-8'>
          <NavLink href="#hello">_hello</NavLink>
          <NavLink href="#about-me">_about-me</NavLink>
          <NavLink href="#projects">_projects</NavLink>
          <NavLink href="#contact-me">_contact-me</NavLink>
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

const NavLink = ({ href, children }) => (
  <a 
    href={href}
    className="font-mono relative group transition-all duration-300 text-white/70 dark:text-gray-300/70 hover:text-emerald-400 dark:hover:text-emerald-300"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-400 dark:bg-emerald-300 transition-all duration-300 group-hover:w-full"></span>
  </a>
)

export default Header