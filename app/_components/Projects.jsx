'use client'

import React, { use, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fetchGitHubData, fetchLanguages } from '@/utils/githubAPI'
import { useMutation, useQueries, useQuery } from 'convex/react';

const projects = [
  {
    id: 1,
    title: "E-Ticaret Platformu",
    description: "Modern arayüzlü, tam özellikli bir e-ticaret web uygulaması. Ödeme entegrasyonu, kullanıcı hesapları ve ürün yönetimi içerir.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=764&auto=format&fit=crop",
    tags: ["Next.js", "TailwindCSS", "Stripe", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Sosyal Medya Uygulaması",
    description: "Kullanıcıların gönderi paylaşabildiği, beğeni ve yorum yapabildiği sosyal medya platformu.",
    image: "https://images.unsplash.com/photo-1600267165655-21eeda65fdad?q=80&w=1470&auto=format&fit=crop",
    tags: ["React", "Firebase", "Tailwind CSS", "Redux"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Task Yönetim Sistemi",
    description: "Drag-and-drop özellikleriyle profesyonel bir görev yönetim uygulaması. Kişisel ve ekip projeleri için idealdir.",
    image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=1925&auto=format&fit=crop",
    tags: ["TypeScript", "React", "Node.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "AI Destekli Blog",
    description: "Yapay zeka ile içerik önerileri sunan ve SEO optimizasyonu yapan modern bir blog platformu.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
    tags: ["Next.js", "OpenAI API", "Vercel", "TailwindCSS"],
    liveUrl: "#",
    githubUrl: "#"
  }
]



function Projects() {
  const projectsRef = useRef(null)
  const isInView = useInView(projectsRef, { once: true, amount: 0.1 })

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const createProject = useMutation("projects:createProject");
  const [languages, setLanguages] = useState([]);
  const reposCount = useQuery("about:getRepoCount")
  const updateRepoCount = useMutation("about:updateRepoCount");
  console.log("reposCount:", reposCount);
  

  useEffect(() => {
    const fetchData = async () => {
      console.log("GitHub verisi çekiliyor...");
      setLoading(true);
      try {
        const data = await fetchGitHubData('repos');
        setRepos(data);
        console.log("GitHub verisi başarıyla çekildi:", data);
      } catch (error) {
        console.error("GitHub verisi çekilirken hata:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);


  useEffect(() => {
    const saveData = async () => {
      console.log("Veri Convex'e kaydediliyor...");
      try {
        // DB'deki repo sayısını kontrol et
        const dbRepoCount = reposCount; // undefined ise 0 kullan
        console.log("DB'deki repo sayısı:", dbRepoCount);
        console.log("GitHub'dan alınan repo sayısı:", repos.length);
        
        // Eğer DB'deki repo sayısı GitHub'dan alınan repo sayısından az ise
        if (repos.length > dbRepoCount) {
          // Sadece yeni repoları kaydet (DB'de olmayan)
          const newRepos = repos.slice(dbRepoCount);
          console.log("Kaydedilecek yeni repo sayısı:", newRepos.length);
          await updateRepoCount({ count: repos.length });

          for (const repo of newRepos) {
            let repoLanguages = [];
            try {
              repoLanguages = await fetchLanguages(repo.name, repo.languages_url);
              console.log("Diller başarıyla alındı:", repoLanguages);
              setLanguages(repoLanguages);
            } catch (error) {
              console.error("Diller alınırken hata:", error);
            }

            await createProject({
              title: repo.name,
              description: repo.description || "",
              imageURL: repo.imageURL || "",
              demoURL: repo.homepage || "",
              githubURL: repo.html_url,
              languages: repoLanguages || [],
            });
          }
          console.log("Yeni repolar Convex'e başarıyla kaydedildi.");
        } else {
          console.log("Tüm repolar zaten DB'de kayıtlı, yeni kayıt yapılmadı.");
        }
      } catch (error) {
        console.error("Convex'e veri kaydedilirken hata:", error);
      }
    };
    
    // Sadece repos doluysa ve fetchData işlemi tamamlandıysa çalıştır
    if (repos.length > 0 && !loading) {
      saveData();
    }
  }, [repos, loading, reposCount, createProject]);
  
  // useEffect hook'u ile reposCount'un undefined olup olmadığını kontrol et
  useEffect(() => {
    if (reposCount !== undefined) {
      console.log("reposCount güncel değeri:", reposCount);
    }
  }, [reposCount]);


  return (
    <section 
      id="projects" 
      className="py-20 bg-gradient-to-b from-indigo-950/50 to-black min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-300 to-teal-500 inline-block text-transparent bg-clip-text">
            Projelerim
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Web geliştirme konusundaki uzmanlığımı sergilediğim en son projelerim. 
            Her proje modern teknolojiler ve en iyi uygulamalar kullanılarak oluşturulmuştur.
          </p>
        </motion.div>

        <div 
          ref={projectsRef} 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: 0.2 + index * 0.1,
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      className="project-card group h-[300px]"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      
      <div className="project-overlay">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-white/80 text-sm mb-4">{project.description}</p>
          
          <div className="mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          
          <div className="flex space-x-3">
            <a 
              href={project.liveUrl} 
              className="px-4 py-2 bg-emerald-500/90 hover:bg-emerald-500 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
            >
              <span>Canlı Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a 
              href={project.githubUrl} 
              className="px-4 py-2 bg-black/50 hover:bg-black/70 border border-white/20 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
            >
              <span>Kaynak Kod</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Hover efekti için parlama */}
      <div className="absolute -inset-x-1/2 -top-1/2 h-[500px] w-[500px] opacity-0 group-hover:opacity-30 transition-opacity duration-700">
        <div className="absolute inset-0 rotate-45 translate-y-32 translate-x-32 bg-gradient-radial from-emerald-400 to-transparent blur-3xl"></div>
      </div>
    </motion.div>
  )
}

export default Projects