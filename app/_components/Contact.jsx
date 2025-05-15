'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Contact() {
  const contactRef = useRef(null)
  const formRef = useRef(null)
  const isInView = useInView(contactRef, { once: true, amount: 0.3 })
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Form gönderme simülasyonu - gerçek uygulamada burada API çağrısı yapılabilir
    setTimeout(() => {
      console.log('Form verisi:', formData)
      setIsSubmitting(false)
      setFormSubmitted(true)
      
      // Formu sıfırla
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
      // Başarı mesajını 3 saniye sonra gizle
      setTimeout(() => {
        setFormSubmitted(false)
      }, 3000)
    }, 1000)
  }
  
  const socialLinks = [
    { name: 'GitHub', icon: 'github.svg', url: 'https://github.com/sabrialperenkaya' },
    { name: 'LinkedIn', icon: 'linkedin.svg', url: 'https://linkedin.com/in/sabrialperenkaya' },
    { name: 'Twitter', icon: 'twitter.svg', url: 'https://twitter.com/sabrialperenkaya' },
    { name: 'Instagram', icon: 'instagram.svg', url: 'https://instagram.com/sabrialperenkaya' }
  ]

  return (
    <div 
      id="contact-me" 
      className="py-24 bg-gradient-to-b from-indigo-950/50 to-black min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-300 to-teal-500 inline-block text-transparent bg-clip-text">
            İletişim
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-white/70 max-w-lg mx-auto">
            Bir proje fikriniz mi var? Yeteneklerimi değerlendirmek mi istiyorsunuz? 
            Bana aşağıdaki form aracılığıyla ulaşabilirsiniz.
          </p>
        </motion.div>

        <div 
          ref={contactRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* İletişim Formu */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <form 
              ref={formRef} 
              onSubmit={handleSubmit}
              className="bg-black/30 p-8 rounded-xl backdrop-blur-md border border-white/10 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-emerald-400">Mesaj Gönder</h3>
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-white mb-2">İsim</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Adınız"
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:border-emerald-500/50 outline-none text-white transition-colors"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2">E-posta</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-posta adresiniz"
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:border-emerald-500/50 outline-none text-white transition-colors"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-white mb-2">Konu</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Mesajınızın konusu"
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:border-emerald-500/50 outline-none text-white transition-colors"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-white mb-2">Mesaj</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Mesajınızı buraya yazın..."
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:border-emerald-500/50 outline-none text-white resize-none transition-colors"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-500/20 transform hover:translate-y-[-2px]'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Gönderiliyor...
                  </span>
                ) : (
                  'Gönder'
                )}
              </button>
              
              {/* Başarılı gönderim mesajı */}
              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-center"
                >
                  Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağım.
                </motion.div>
              )}
            </form>
          </motion.div>
          
          {/* İletişim Bilgileri */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <div className="bg-black/30 p-8 rounded-xl backdrop-blur-md border border-white/10 shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6 text-emerald-400">İletişim Bilgileri</h3>
              
              <div className="space-y-6">
                <ContactInfo icon="📧" title="E-posta">
                  <a href="mailto:sabrialperen@example.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    sabrialperen@example.com
                  </a>
                </ContactInfo>
                
                <ContactInfo icon="📱" title="Telefon">
                  <a href="tel:+901234567890" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    +90 123 456 7890
                  </a>
                </ContactInfo>
                
                <ContactInfo icon="📍" title="Konum">
                  İstanbul, Türkiye
                </ContactInfo>
                
                <div className="pt-6 mt-6 border-t border-white/10">
                  <h4 className="text-white font-medium mb-4">Sosyal Medya</h4>
                  
                  <div className="flex space-x-4">
                    {socialLinks.map((link) => (
                      <SocialLink key={link.name} name={link.name} url={link.url}>
                        {link.name === 'GitHub' && (
                          <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        )}
                        {link.name === 'LinkedIn' && (
                          <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        )}
                        {link.name === 'Twitter' && (
                          <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        )}
                        {link.name === 'Instagram' && (
                          <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        )}
                      </SocialLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-24 text-center text-white/50 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} Sabri Alperen Kaya. Tüm hakları saklıdır.</p>
          <p className="mt-2">
            <a href="#hello" className="text-emerald-400/70 hover:text-emerald-400 transition-colors">
              Yukarı Çık
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function ContactInfo({ icon, title, children }) {
  return (
    <div className="flex items-start">
      <div className="text-2xl mr-4">{icon}</div>
      <div>
        <h4 className="text-white font-medium mb-1">{title}</h4>
        <div className="text-gray-300">{children}</div>
      </div>
    </div>
  )
}

function SocialLink({ children, name, url }) {
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-emerald-500/20 rounded-full transition-colors border border-white/10 hover:border-emerald-500/30 text-gray-300 hover:text-emerald-400"
      aria-label={name}
    >
      {children}
    </a>
  )
}

export default Contact 