'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

function Hero() {
  const containerRef = useRef(null)
  const codeRef = useRef(null)
  const [typedText, setTypedText] = useState({
    comment: '',
    declaration: '',
    role: '',
    email: '',
    github: '',
    skills: '',
    interests: '',
    closing: ''
  })
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [currentLine, setCurrentLine] = useState('comment')

  // Typewriter efekti için
  useEffect(() => {
    const lines = {
      comment: '// Merhaba, ben Sabri Alperen',
      declaration: 'const myProfile = {',
      role: '  role: "Full-Stack Web Developer",',
      email: '  email: "sabri.alperen.kaya@gmail.com",',
      github: '  github: "https://github.com/lordgrimx",',
      skills: '  skills: ["React", "Next.js", "Tailwind CSS", "JavaScript","C#" , "Python"],',
      interests: '  interests: ["UI/UX", "Modern Web", "3D Effects"]',
      closing: '};'
    }

    const typingSpeed = 40 // milisaniye cinsinden yazma hızı
    let currentIndex = 0
    let timeout

    const typeLine = () => {
      if (currentLine === 'comment' && currentIndex <= lines.comment.length) {
        setTypedText(prev => ({ ...prev, comment: lines.comment.slice(0, currentIndex) }))
        currentIndex++
      } else if (currentLine === 'declaration' && currentIndex <= lines.declaration.length) {
        setTypedText(prev => ({ ...prev, declaration: lines.declaration.slice(0, currentIndex) }))
        currentIndex++
      } else if (currentLine === 'role' && currentIndex <= lines.role.length) {
        setTypedText(prev => ({ ...prev, role: lines.role.slice(0, currentIndex) }))
        currentIndex++
      } else if (currentLine === 'email' && currentIndex <= lines.email.length) {
        setTypedText(prev => ({ ...prev, email: lines.email.slice(0, currentIndex) }))
        currentIndex++
      } else if (currentLine === 'github' && currentIndex <= lines.github.length) {
        setTypedText(prev => ({ ...prev, github: lines.github.slice(0, currentIndex) }))
        currentIndex++
      } else if (currentLine === 'skills' && currentIndex <= lines.skills.length) {
        setTypedText(prev => ({ ...prev, skills: lines.skills.slice(0, currentIndex) }))
        currentIndex++
      } else if (currentLine === 'interests' && currentIndex <= lines.interests.length) {
        setTypedText(prev => ({ ...prev, interests: lines.interests.slice(0, currentIndex) }))
        currentIndex++
      } else if (currentLine === 'closing' && currentIndex <= lines.closing.length) {
        setTypedText(prev => ({ ...prev, closing: lines.closing.slice(0, currentIndex) }))
        currentIndex++
      } else {
        // Satır tamamlandı, sonraki satıra geç
        currentIndex = 0
        
        if (currentLine === 'comment') setCurrentLine('declaration')
        else if (currentLine === 'declaration') setCurrentLine('role')
        else if (currentLine === 'role') setCurrentLine('email')
        else if (currentLine === 'email') setCurrentLine('github')
        else if (currentLine === 'github') setCurrentLine('skills')
        else if (currentLine === 'skills') setCurrentLine('interests')
        else if (currentLine === 'interests') setCurrentLine('closing')
        else if (currentLine === 'closing') {
          setIsTypingComplete(true)
          return // Yazma işlemi tamamlandı
        }
      }

      // Yazma hızını biraz değiştirerek daha doğal görünmesini sağla
      const randomSpeed = typingSpeed + Math.random() * 30
      timeout = setTimeout(typeLine, randomSpeed)
    }

    // Yazma işlemini başlat
    typeLine()

    // Cleanup
    return () => clearTimeout(timeout)
  }, [currentLine])

  // Mouse hareket etkisi için 
  useEffect(() => {
    const container = containerRef.current
    const codeBlock = codeRef.current

    if (!container || !codeBlock) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = container.getBoundingClientRect()
      
      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5
      
      // 3D dönüş efekti
      codeBlock.style.transform = `
        perspective(1000px)
        rotateY(${x * 5}deg)
        rotateX(${-y * 5}deg)
      `
    }

    container.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Değişken için renk sınıfları
  const getColorClasses = {
    keyword: "text-purple-400", // const, let, var
    variable: "text-emerald-400", // myProfile
    operator: "text-white", // =
    punctuation: "text-yellow-300", // { } [ ] , ;
    property: "text-teal-300", // role, email, github, skills, interests
    string: "text-amber-300", // "Front-end Developer"
    bracket: "text-blue-400", // [ ]
    comment: "text-emerald-300" // // Comments
  }

  return (
    <section 
      ref={containerRef}
      id="hello"
      className="pt-32 pb-20 px-8 max-w-7xl mx-auto min-h-[100vh] flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10"
      >
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-300 to-teal-500 text-transparent bg-clip-text dark:from-gray-100 dark:via-emerald-300 dark:to-teal-400">
          Sabri Alperen Kaya
        </h1>
        <h2 className="text-3xl text-emerald-400 font-mono dark:text-emerald-300">{'>'} Front-end Developer</h2>
      </motion.div>

      <motion.div
        ref={codeRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="p-8 rounded-xl backdrop-blur-md w-full max-w-2xl border transition-colors duration-300 bg-black/50 dark:bg-gray-900/50 border-white/10 dark:border-gray-700/20 shadow-[0_0_25px_rgba(16,185,129,0.2)] dark:shadow-[0_0_25px_rgba(16,185,129,0.15)]"
      >
        <div className="text-white font-mono space-y-2 dark:text-gray-200">
          {/* Comment Line */}
          <div className="text-emerald-300 mb-2 dark:text-emerald-200">
            {typedText.comment}
            {currentLine === 'comment' && <span className="ml-0.5 inline-block h-5 w-2 animate-blink bg-emerald-300 dark:bg-emerald-200"></span>}
          </div>

          {/* Declaration Line */}
          {(currentLine !== 'comment' || typedText.comment.length === 30) && (
            <div className="mb-2">
              {typedText.declaration && 
                (<>
                  <span className="text-purple-400 dark:text-purple-300">{typedText.declaration.match(/const/)?.[0] || ''}</span>
                  <span className="text-white dark:text-gray-200">{typedText.declaration.match(/ /)?.[0] || ''}</span>
                  <span className="text-emerald-400 dark:text-emerald-300">{typedText.declaration.match(/myProfile/)?.[0] || ''}</span>
                  <span className="text-white dark:text-gray-200">{typedText.declaration.match(/ = /)?.[0] || ''}</span>
                  <span className="text-yellow-300 dark:text-yellow-200">{typedText.declaration.match(/\{/)?.[0] || ''}</span>
                </>)
              }
              {currentLine === 'declaration' && <span className="ml-0.5 inline-block h-5 w-2 animate-blink bg-white dark:bg-gray-200"></span>}
            </div>
          )}

          {/* Role Line */}
          {(currentLine === 'role' || (currentLine !== 'comment' && currentLine !== 'declaration' && typedText.role.length > 0)) && (
            <div className="pl-6 mb-1">
              {typedText.role && 
                (<>
                  <span className="text-teal-300 dark:text-teal-200">{typedText.role.match(/role/)?.[0] || ''}</span>
                  <span className="text-white dark:text-gray-200">{typedText.role.match(/: /)?.[0] || ''}</span>
                  <span className="text-amber-300 dark:text-amber-200">
                    {typedText.role.includes('"') ? 
                      typedText.role.match(/"([^"]*)"/)?.[0] || '' : ''}
                  </span>
                  <span className="text-white dark:text-gray-200">{typedText.role.match(/,/)?.[0] || ''}</span>
                </>)
              }
              {currentLine === 'role' && <span className="ml-0.5 inline-block h-5 w-2 animate-blink bg-white dark:bg-gray-200"></span>}
            </div>
          )}

          {/* Email Line */}
          {(currentLine === 'email' || (currentLine !== 'comment' && currentLine !== 'declaration' && currentLine !== 'role' && typedText.email.length > 0)) && (
            <div className="pl-6 mb-1">
              {typedText.email && 
                (<>
                  <span className="text-teal-300 dark:text-teal-200">{typedText.email.match(/email/)?.[0] || ''}</span>
                  <span className="text-white dark:text-gray-200">{typedText.email.match(/: /)?.[0] || ''}</span>
                  <span className="text-amber-300 dark:text-amber-200">
                    {typedText.email.includes('"') ? 
                      typedText.email.match(/"([^"]*)"/)?.[0] || '' : ''}
                  </span>
                  <span className="text-white dark:text-gray-200">{typedText.email.match(/,/)?.[0] || ''}</span>
                </>)
              }
              {currentLine === 'email' && <span className="ml-0.5 inline-block h-5 w-2 animate-blink bg-white dark:bg-gray-200"></span>}
            </div>
          )}

          {/* Github Line */}
          {(currentLine === 'github' || (currentLine !== 'comment' && currentLine !== 'declaration' && currentLine !== 'role' && currentLine !== 'email' && typedText.github.length > 0)) && (
            <div className="pl-6 mb-1">
              {typedText.github && 
                (<>
                  <span className="text-teal-300 dark:text-teal-200">{typedText.github.match(/github/)?.[0] || ''}</span>
                  <span className="text-white dark:text-gray-200">{typedText.github.match(/: /)?.[0] || ''}</span>
                  <span className="text-amber-300 dark:text-amber-200">
                    {typedText.github.includes('"') ? 
                      typedText.github.match(/"([^"]*)"/)?.[0] || '' : ''}
                  </span>
                  <span className="text-white dark:text-gray-200">{typedText.github.match(/,/)?.[0] || ''}</span>
                </>)
              }
              {currentLine === 'github' && <span className="ml-0.5 inline-block h-5 w-2 animate-blink bg-white dark:bg-gray-200"></span>}
            </div>
          )}

          {/* Skills Line */}
          {(currentLine === 'skills' || (currentLine !== 'comment' && currentLine !== 'declaration' && currentLine !== 'role' && currentLine !== 'email' && currentLine !== 'github' && typedText.skills.length > 0)) && (
            <div className="pl-6 mb-1">
              {typedText.skills && (
                <>
                  <span className="text-teal-300 dark:text-teal-200">
                    {typedText.skills.match(/skills/)?.[0] || ''}
                  </span>
                  <span className="text-white dark:text-gray-200">
                    {typedText.skills.match(/: /)?.[0] || ''}
                  </span>
                  
                  {/* Arrays and items */}
                  {typedText.skills.includes('[') && (
                    <span className="text-blue-400 dark:text-blue-300">[</span>
                  )}
                  
                  {/* React */}
                  {typedText.skills.includes('"React"') && (
                    <span className="text-amber-300 dark:text-amber-200">"React"</span>
                  )}
                  
                  {/* Virgül 1 */}
                  {typedText.skills.includes('"React",') && (
                    <span className="text-white dark:text-gray-200">, </span>
                  )}
                  
                  {/* Next.js */}
                  {typedText.skills.includes('"Next.js"') && (
                    <span className="text-amber-300 dark:text-amber-200">"Next.js"</span>
                  )}
                  
                  {/* Virgül 2 */}
                  {typedText.skills.includes('"Next.js",') && (
                    <span className="text-white dark:text-gray-200">, </span>
                  )}
                  
                  {/* Tailwind CSS */}
                  {typedText.skills.includes('"Tailwind CSS"') && (
                    <span className="text-amber-300 dark:text-amber-200">"Tailwind CSS"</span>
                  )}
                  
                  {/* Virgül 3 */}
                  {typedText.skills.includes('"Tailwind CSS",') && (
                    <span className="text-white dark:text-gray-200">, </span>
                  )}
                  
                  {/* JavaScript */}
                  {typedText.skills.includes('"JavaScript"') && (
                    <span className="text-amber-300 dark:text-amber-200">"JavaScript"</span>
                  )}
                  
                  {/* Array kapanış */}
                  {typedText.skills.includes(']') && (
                    <span className="text-blue-400 dark:text-blue-300">]</span>
                  )}
                  
                  {/* Son virgül */}
                  {typedText.skills.includes('],') && (
                    <span className="text-white dark:text-gray-200">,</span>
                  )}
                </>
              )}
              {currentLine === 'skills' && <span className="ml-0.5 inline-block h-5 w-2 animate-blink bg-white dark:bg-gray-200"></span>}
            </div>
          )}

          {/* Interests Line */}
          {(currentLine === 'interests' || (currentLine !== 'comment' && currentLine !== 'declaration' && currentLine !== 'role' && currentLine !== 'email' && currentLine !== 'github' && currentLine !== 'skills' && typedText.interests.length > 0)) && (
            <div className="pl-6 mb-4">
              {typedText.interests && (
                <>
                  <span className="text-teal-300 dark:text-teal-200">
                    {typedText.interests.match(/interests/)?.[0] || ''}
                  </span>
                  <span className="text-white dark:text-gray-200">
                    {typedText.interests.match(/: /)?.[0] || ''}
                  </span>
                  
                  {/* Arrays and items */}
                  {typedText.interests.includes('[') && (
                    <span className="text-blue-400 dark:text-blue-300">[</span>
                  )}
                  
                  {/* UI/UX */}
                  {typedText.interests.includes('"UI/UX"') && (
                    <span className="text-amber-300 dark:text-amber-200">"UI/UX"</span>
                  )}
                  
                  {/* Virgül 1 */}
                  {typedText.interests.includes('"UI/UX",') && (
                    <span className="text-white dark:text-gray-200">, </span>
                  )}
                  
                  {/* Modern Web */}
                  {typedText.interests.includes('"Modern Web"') && (
                    <span className="text-amber-300 dark:text-amber-200">"Modern Web"</span>
                  )}
                  
                  {/* Virgül 2 */}
                  {typedText.interests.includes('"Modern Web",') && (
                    <span className="text-white dark:text-gray-200">, </span>
                  )}
                  
                  {/* 3D Effects */}
                  {typedText.interests.includes('"3D Effects"') && (
                    <span className="text-amber-300 dark:text-amber-200">"3D Effects"</span>
                  )}
                  
                  {/* Array kapanış */}
                  {typedText.interests.includes(']') && (
                    <span className="text-blue-400 dark:text-blue-300">]</span>
                  )}
                </>
              )}
              {currentLine === 'interests' && <span className="ml-0.5 inline-block h-5 w-2 animate-blink bg-white dark:bg-gray-200"></span>}
            </div>
          )}

          {/* Closing Line */}
          {(currentLine === 'closing' || (currentLine !== 'comment' && currentLine !== 'declaration' && currentLine !== 'role' && currentLine !== 'email' && currentLine !== 'github' && currentLine !== 'skills' && currentLine !== 'interests' && typedText.closing.length > 0)) && (
            <div>
              {typedText.closing && (
                <>
                  <span className="text-yellow-300 dark:text-yellow-200">
                    {typedText.closing.match(/\}/)?.[0] || ''}
                  </span>
                  <span className="text-white dark:text-gray-200">
                    {typedText.closing.match(/;/)?.[0] || ''}
                  </span>
                </>
              )}
              {currentLine === 'closing' && <span className="ml-0.5 inline-block h-5 w-2 animate-blink bg-white dark:bg-gray-200"></span>}
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-12 flex justify-center"
      >
        <a href="#projects" className='mr-5 ml-5'>
          <Button 
            variant="default" 
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 dark:from-emerald-600 dark:to-teal-700 dark:hover:from-emerald-700 dark:hover:to-teal-800 font-bold rounded-full shadow-lg hover:shadow-emerald-500/20 dark:hover:shadow-emerald-600/10 transform hover:scale-105 transition-all duration-300"
          >
            Projelerimi incele
          </Button>
        </a>
        <a href="#" className='mr-5 ml-5'>
          <Button 
            variant="outline" 
            size="lg"
            className="hover:from-emerald-600 hover:to-teal-700 dark:from-emerald-600 dark:to-teal-700 dark:hover:from-emerald-700 dark:hover:to-teal-800 font-bold rounded-full shadow-lg hover:shadow-emerald-500/20 dark:hover:shadow-emerald-600/10 transform hover:scale-105 transition-all duration-300"
          >
            CV indir
          </Button>
        </a>
      </motion.div>
    </section>
  )
}

export default Hero 