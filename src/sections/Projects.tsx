import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { projectsData } from "../data/projects"
import { Card } from "../components/Card"
import { SectionTitle } from "../components/SectionTitle"
import { Button } from "../components/Button"
import type { ProjectType } from "../types/ProjectType"

type ProjectCategory = "All" | "Fullstack" | "Frontend" | "Backend"

type ProjectWithCategory = ProjectType & { category: ProjectCategory }

const categories: ProjectCategory[] = ["All", "Fullstack", "Frontend", "Backend"]

function computeCategory(technologies: string[]): ProjectCategory {
  const normalized = technologies.map((tech) => tech.toLowerCase().replace(/\s+/g, ""))

  const hasFrontend = normalized.some((tech) =>
    ["react", "next.js", "nextjs", "tailwind", "tailwindcss", "html", "html5", "css", "css3"].some((key) =>
      tech.includes(key),
    ),
  )

  const hasBackend = normalized.some((tech) =>
    ["node", "nodejs", "node.js", "express", "mongo", "mongodb"].some((key) => tech.includes(key)),
  )

  if (hasFrontend && hasBackend) return "Fullstack"
  if (hasFrontend) return "Frontend"
  if (hasBackend) return "Backend"
  return "Frontend"
}

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

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All")
  const [visibleCount, setVisibleCount] = useState(6)
  const isMobile = useIsMobile(768)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [dragWidth, setDragWidth] = useState(0)

  const projectsWithCategory: ProjectWithCategory[] = useMemo(
    () =>
      projectsData.map((project) => ({
        ...project,
        category: computeCategory(project.technologies),
      })),
    [],
  )

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectsWithCategory
    return projectsWithCategory.filter((project) => project.category === activeCategory)
  }, [activeCategory, projectsWithCategory])

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount)
  }, [filteredProjects, visibleCount])

  useEffect(() => {
    setVisibleCount(6)
  }, [activeCategory])

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
  }, [isMobile, visibleProjects.length])

  const showLoadMore = visibleCount < filteredProjects.length

  const cardVariant = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, delay: index * 0.07 },
    }),
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionTitle subtitle="Some of my recent work and side projects">Projects</SectionTitle>
        </motion.div>

        <motion.div
          className="inline-flex items-center gap-2 p-1 rounded-full bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/70 backdrop-blur-xl mt-8 mb-10"
          layout
        >
          {categories.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="relative px-4 py-1.5 text-xs sm:text-sm rounded-full text-gray-700 dark:text-gray-200 transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeProjectsCategory"
                    className="absolute inset-0 rounded-full bg-gray-900/5 dark:bg-white/10 border border-gray-400/60 dark:border-gray-500/70 shadow-[0_0_22px_rgba(148,163,184,0.7)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 mix-blend-screen">
                  {category}
                </span>
              </button>
            )
          })}
        </motion.div>

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
              className="flex gap-5"
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={cardVariant}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileHover={{
                      scale: 1.02,
                      y: -4,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 25 }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: 1000,
                      willChange: "transform",
                    }}
                    className="min-w-[260px] max-w-[280px]"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={cardVariant}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileHover={{
                    scale: 1.02,
                    y: -6,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 25 }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                    willChange: "transform",
                  }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {showLoadMore && (
          <div className="mt-10 flex justify-center">
            <motion.button
              onClick={handleLoadMore}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-400/70 bg-gradient-to-r from-indigo-500/30 via-violet-500/20 to-sky-500/30 text-sm font-medium text-indigo-50 shadow-[0_0_30px_rgba(129,140,248,0.6)] backdrop-blur-xl"
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

interface ProjectCardProps {
  project: ProjectWithCategory
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-800/80 group">
      <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
        <motion.img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-gray-900/40 to-transparent flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out"
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {project.title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded-full bg-primary/5 text-primary/80 dark:text-primary-100 text-[11px] font-medium border border-primary/10"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <Button variant="primary" size="sm" href={project.liveUrl}>
          <ExternalLink className="w-4 h-4" />
          Live
        </Button>
      </div>
    </Card>
  )
}
