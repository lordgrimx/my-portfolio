'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "Next.js", level: 80 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Node.js", level: 75 },
  { name: "TypeScript", level: 70 },
]

const experiences = [
  {
    title: "Senior Front-End Developer",
    company: "Tech Innovate",
    period: "2021 - Günümüz",
    description: "Büyük ölçekli e-ticaret uygulamalarını geliştirdim. React ve Next.js kullanarak performans iyileştirmeleri yaptım."
  },
  {
    title: "Front-End Developer",
    company: "Digital Solutions",
    period: "2019 - 2021",
    description: "Şirketin müşteri portalını tasarladım ve geliştirdim. Responsive tasarım ve kullanıcı deneyimi konularında uzmanlaştım."
  },
  {
    title: "Junior Developer",
    company: "WebCreators",
    period: "2017 - 2019",
    description: "Web sitesi geliştirme projelerinde çalıştım. JavaScript ve CSS konularında temel becerilerimi geliştirdim."
  }
]

function About() {
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const experienceRef = useRef(null)
  
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 })
  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.3 })
  const isExperienceInView = useInView(experienceRef, { once: true, amount: 0.3 })

  return (
    <div 
      id="about-me" 
      className="py-24 bg-gradient-to-b from-black to-indigo-950/50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-300 to-teal-500 inline-block text-transparent bg-clip-text">
            Hakkımda
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6 rounded-full"></div>
        </motion.div>

        {/* Hakkımda Bilgi */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <motion.div
            ref={aboutRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-2 order-2 lg:order-1"
          >
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6 text-emerald-400">Kim <span className="text-white">Ben?</span></h3>
              
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Ben <span className="text-emerald-400 font-semibold">Sabri Alperen Kaya</span>, 5 yıllık deneyime sahip bir Front-end geliştiriciyim. Modern web teknolojileri ve kullanıcı deneyimi tasarımına odaklanıyorum.
                </p>
                
                <p className="text-gray-300 leading-relaxed">
                  Geliştirdiğim projelerde her zaman en son teknolojileri kullanmaya ve kod kalitesini üst düzeyde tutmaya özen gösteriyorum. Kullanıcı merkezli düşünerek, performanslı ve erişilebilir web uygulamaları oluşturuyorum.
                </p>
                
                <p className="text-gray-300 leading-relaxed">
                  Sürekli öğrenmeye ve gelişmeye açık bir yaklaşımla, yeni teknolojileri hızla adapte ediyor ve projelerime entegre ediyorum. 
                </p>
              </div>
              
              <div className="mt-8 flex gap-6 flex-wrap">
                <InfoBox icon="🎓" title="Eğitim">
                  Bilgisayar Mühendisliği, XYZ Üniversitesi (2017)
                </InfoBox>
                <InfoBox icon="🌐" title="Dil">
                  Türkçe (Anadil), İngilizce (İleri)
                </InfoBox>
                <InfoBox icon="🏆" title="Hobiler">
                  Fotoğrafçılık, Seyahat, Kitap
                </InfoBox>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 flex items-center justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Avatar resmi için yer tutucu */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/10 transform hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-blue-500/20 flex items-center justify-center">
                  <span className="text-7xl">👨‍💻</span>
                </div>
              </div>
              
              {/* Dekoratif elementler */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full filter blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-teal-500/10 rounded-full filter blur-xl"></div>
              
              {/* Yuvarlak dekoratif çerçeve */}
              <div className="absolute -inset-6 border-2 border-dashed border-emerald-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
            </div>
          </motion.div>
        </div>

        {/* Yetenekler */}
        <motion.div
          ref={skillsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold mb-8 text-emerald-400">Yeteneklerim</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                <div className="mb-2 flex justify-between">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full h-3 bg-gray-700/40 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isSkillsInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Deneyim */}
        <motion.div
          ref={experienceRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isExperienceInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-emerald-400">Deneyimlerim</h3>
          
          <div className="relative border-l-2 border-emerald-500/30 pl-8 pb-8 ml-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                animate={isExperienceInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="mb-12 relative"
              >
                <div className="absolute -left-11 top-0 w-6 h-6 rounded-full border-2 border-emerald-500 bg-black"></div>
                <div className="bg-black/40 rounded-xl p-6 backdrop-blur-sm border border-white/5 hover:border-emerald-500/20 transition-colors shadow-lg">
                  <div className="flex flex-wrap justify-between mb-2">
                    <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                    <span className="text-emerald-400 text-sm bg-emerald-500/10 px-3 py-1 rounded-full">{exp.period}</span>
                  </div>
                  <div className="text-emerald-300 mb-3">{exp.company}</div>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
              </motion.div>
            ))}
            
            {/* Son nokta */}
            <div className="absolute -left-[7px] bottom-0 w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Bilgi kutusu bileşeni
function InfoBox({ icon, title, children }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-emerald-500/20 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl">{icon}</div>
        <h4 className="text-emerald-400 font-medium">{title}</h4>
      </div>
      <p className="text-sm text-gray-300">{children}</p>
    </div>
  )
}

export default About 