import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { techData } from "../data/tech"
import { Card } from "../components/Card"
import { SectionTitle } from "../components/SectionTitle"

const coreTechNames = ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "WordPress"]

const accentClasses: Record<string, string> = {
  React: "border-cyan-500/40 shadow-cyan-500/40",
  TypeScript: "border-blue-500/40 shadow-blue-500/40",
  "Tailwind CSS": "border-sky-400/40 shadow-sky-400/40",
  Bootstrap: "border-violet-500/40 shadow-violet-500/40",
  HTML: "border-orange-500/40 shadow-orange-500/40",
  CSS: "border-blue-400/40 shadow-blue-400/40",
  JavaScript: "border-yellow-400/40 shadow-yellow-400/40",
  "Node.js": "border-emerald-500/40 shadow-emerald-500/40",
  "Express.js": "border-zinc-300/40 shadow-zinc-300/40",
  MongoDB: "border-emerald-400/40 shadow-emerald-400/40",
  "CMS (WordPress)": "border-pink-500/40 shadow-pink-500/40",
}

const allTech = techData

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => {
      if (typeof window === "undefined") return
      setIsMobile(window.innerWidth < breakpoint)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [breakpoint])

  return isMobile
}

export const TechStack: React.FC = () => {
  const coreTech = techData.filter((tech) => coreTechNames.includes(tech.name))

  const [visibleCount, setVisibleCount] = useState(8)
  const isMobile = useIsMobile(768)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [dragWidth, setDragWidth] = useState(0)

  const filteredItems = useMemo(() => {
    return allTech
  }, [])

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount)
  }, [filteredItems, visibleCount])

  useEffect(() => {
    if (!isMobile) return
    const element = carouselRef.current
    if (!element) return

    const updateWidth = () => {
      const fullWidth = element.scrollWidth
      const viewportWidth = element.offsetWidth
      const diff = fullWidth - viewportWidth
      setDragWidth(diff > 0 ? diff : 0)
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [isMobile, visibleItems.length])

  const showLoadMore = visibleCount < filteredItems.length

  const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, delay: index * 0.05 },
    }),
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8)
  }

  return (
    <section id="skills" className="py-16 md:py-20 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionTitle subtitle="Technologies I use to design, build and ship web experiences">
            Tech Stack
          </SectionTitle>
        </motion.div>

        <Card hover className="mt-6 mb-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                Core Stack
              </p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                The tools I rely on for most of my projects.
              </p>
            </div>
            <div className="marquee-container max-w-full sm:max-w-md">
              <div className="marquee-track">
                {[...coreTech, ...coreTech].map((tech, index) => (
                  <div
                    key={`${tech.id}-${index}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 border border-gray-200/70 dark:border-gray-700 whitespace-nowrap"
                  >
                    {tech.img.endsWith(".png") ? (
                      <img src={tech.img} alt={tech.name} className="w-5 h-5 object-contain" />
                    ) : (
                      <span className="text-lg">{tech.img}</span>
                    )}
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-100">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {isMobile ? (
          <motion.div
            ref={carouselRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: -dragWidth, right: 0 }}
              className="flex gap-4"
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item, index) => {
                  const accent = accentClasses[item.name] || "border-gray-500/40 shadow-gray-500/30"
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      variants={cardVariant}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: 30, scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 24,
                      }}
                      whileHover={{
                        rotateX: -8,
                        rotateY: 8,
                        translateY: -6,
                        boxShadow:
                          "0 0 30px rgba(56,189,248,0.5), 0 0 60px rgba(56,189,248,0.2)",
                      }}
                      className={`relative min-w-[220px] max-w-[240px] rounded-2xl bg-white/5 border ${accent} backdrop-blur-2xl p-5 flex flex-col items-start justify-between shadow-[0_0_1px_rgba(255,255,255,0.2)]`}
                      style={{
                        transformStyle: "preserve-3d",
                        perspective: 1000,
                      }}
                    >
                      <div className="flex items-center justify-between w-full mb-4">
                        <motion.div
                          animate={{ y: [0, -6, 0] }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: [0.42, 0, 0.58, 1],
                          }}
                          className="h-12 w-12 rounded-xl bg-gray-950/80 border border-white/10 flex items-center justify-center shadow-inner shadow-black/60"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="h-7 w-7 object-contain"
                          />
                        </motion.div>
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-base font-semibold text-gray-50">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400/80">
                          Production ready and battle tested in real projects.
                        </p>
                      </div>
                      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-cyan-400/10 opacity-0 hover:opacity-100 transition-opacity" />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, index) => {
                const accent = accentClasses[item.name] || "border-gray-500/40 shadow-gray-500/30"
                return (
                  <motion.div
                    key={item.id}
                    layout
                    variants={cardVariant}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: 30, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 24,
                    }}
                    whileHover={{
                      rotateX: -8,
                      rotateY: 8,
                      translateY: -6,
                      boxShadow:
                        "0 0 40px rgba(56,189,248,0.5), 0 0 80px rgba(56,189,248,0.2)",
                    }}
                    className={`relative rounded-2xl bg-white/5 border ${accent} backdrop-blur-2xl p-5 flex flex-col items-start justify-between shadow-[0_0_1px_rgba(255,255,255,0.2)]`}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: 1000,
                    }}
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: [0.42, 0, 0.58, 1],
                        }}
                        className="h-12 w-12 rounded-xl bg-gray-950/80 border border-white/10 flex items-center justify-center shadow-inner shadow-black/60"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-7 w-7 object-contain"
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-semibold text-gray-50">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400/80">
                        Production ready and battle tested in real projects.
                      </p>
                    </div>
                    <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-cyan-400/10 opacity-0 hover:opacity-100 transition-opacity" />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {showLoadMore && (
          <div className="mt-10 flex justify-center">
            <motion.button
              onClick={handleLoadMore}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-400/70 bg-gradient-to-r from-cyan-500/30 via-sky-500/20 to-blue-500/30 text-sm font-medium text-cyan-50 shadow-[0_0_30px_rgba(56,189,248,0.6)] backdrop-blur-xl"
            >
              <span>Load More</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="text-xs"
              >
                →
              </motion.span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  )
}
