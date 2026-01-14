import type React from "react"
import { useRef } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"
import { Github, Linkedin, Download } from "lucide-react"
import { heroData } from "../data/hero"
import { useTyped } from "../hooks/useTyped"

const floatingIcons = [
  {
    name: "React",
    img: "/images/react.png",
    color: "rgba(6,182,212,0.6)", // Cyan
    position: "top-0 -left-4 md:top-10 md:-left-12",
    delay: 0,
  },
  {
    name: "JavaScript",
    img: "/images/js.png",
    color: "rgba(234,179,8,0.6)", // Yellow
    position: "top-20 -right-8 md:top-16 md:-right-16",
    delay: 1.5,
  },
  {
    name: "Tailwind",
    img: "/images/tailwind-css.png",
    color: "rgba(56,189,248,0.6)", // Sky
    position: "-bottom-6 right-10 md:-bottom-4 md:-right-4",
    delay: 2.2,
  },
  {
    name: "MongoDB",
    img: "/images/mongodb.png",
    color: "rgba(34,197,94,0.6)", // Green
    position: "-top-12 right-1/2 translate-x-1/2",
    delay: 3,
  },
]

export const Hero: React.FC = () => {
  const typedText = useTyped(heroData.roles)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const xPos = (e.clientX - left) / width - 0.5
    const yPos = (e.clientY - top) / height - 0.5

    x.set(xPos * 20) // Tilt range
    y.set(yPos * 20)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Starfield effect
  const stars = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }))

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Deep Space Background with Stars */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-purple-950/10 to-[#0a0a0a]" />
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: [0.42, 0, 0.58, 1],
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-gray-300 mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for work
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                Hi, I'm <br />
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                  {heroData.name}
                </span>
              </h1>

              <div className="h-12 sm:h-16 flex items-center justify-center lg:justify-start text-xl sm:text-3xl font-medium text-gray-300">
                <span>I am a</span>
                <span className="ml-3 px-3 py-1 bg-white/5 border-l-2 border-purple-500 text-purple-400">
                  {typedText}
                </span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-1 h-8 bg-purple-500 ml-1"
                />
              </div>

              <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {heroData.intro}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <a
                href={heroData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 overflow-hidden transition-all hover:bg-blue-600 hover:text-white hover:border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="relative flex items-center gap-2 font-medium">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </span>
              </a>

              <a
                href={heroData.links.cvUrl}
                download
                className="group relative px-6 py-3 rounded-xl bg-purple-600/10 text-purple-400 border border-purple-500/20 overflow-hidden transition-all hover:bg-purple-600 hover:text-white hover:border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.1)] hover:shadow-[0_0_30px_rgba(147,51,234,0.4)]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="relative flex items-center gap-2 font-medium">
                  <Download className="w-5 h-5" />
                  Download CV
                </span>
              </a>

              <a
                href={heroData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
            </motion.div>
          </div>

          {/* Right Side - Profile Image & Floating Icons */}
          <div className="relative order-1 lg:order-2 flex justify-center perspective-1000">
            <motion.div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: mouseY,
                rotateY: mouseX,
                transformStyle: "preserve-3d",
              }}
              className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[450px] lg:h-[450px] flex items-center justify-center"
            >
              {/* Animated Glow Behind */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: [0.42, 0, 0.58, 1],
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-[60px]"
              />

              {/* Liquid/Blob Border Container */}
              <div className="relative w-full h-full z-10">
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full absolute inset-0 text-gray-900 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                >
                  <mask id="blobMask">
                    <path
                      fill="white"
                      d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,71.2,34.6C60.2,46.1,49.5,55.4,37.6,63.1C25.7,70.8,12.6,76.9,-0.8,78.3C-14.2,79.7,-28.7,76.4,-41.8,69.5C-54.9,62.6,-66.6,52.1,-75.4,39.3C-84.2,26.5,-90.1,11.4,-88.7,-3.1C-87.3,-17.6,-78.6,-31.5,-68.1,-43.3C-57.6,-55.1,-45.3,-64.8,-32.1,-72.5C-18.9,-80.2,-4.8,-85.9,4.9,-94.4L14.6,-102.9"
                      transform="translate(100 100) scale(1.1)"
                    />
                  </mask>
                  {/* Neon Ring */}
                  <path
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,71.2,34.6C60.2,46.1,49.5,55.4,37.6,63.1C25.7,70.8,12.6,76.9,-0.8,78.3C-14.2,79.7,-28.7,76.4,-41.8,69.5C-54.9,62.6,-66.6,52.1,-75.4,39.3C-84.2,26.5,-90.1,11.4,-88.7,-3.1C-87.3,-17.6,-78.6,-31.5,-68.1,-43.3C-57.6,-55.1,-45.3,-64.8,-32.1,-72.5C-18.9,-80.2,-4.8,-85.9,4.9,-94.4L14.6,-102.9"
                    transform="translate(100 100) scale(1.1)"
                    className="animate-spin-slow"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Profile Image */}
                <div
                  className="absolute inset-4 sm:inset-6 lg:inset-8 overflow-hidden rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border-4 border-white/10 shadow-2xl"
                  style={{
                    background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
                  }}
                >
                  <img
                    src={heroData.profileImage || "/placeholder.svg"}
                    alt={heroData.name}
                    className="w-full h-full object-cover scale-110 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
                </div>
              </div>

              {/* Floating Icons */}
              {floatingIcons.map((icon) => (
                <motion.div
                  key={icon.name}
                  className={`absolute ${icon.position} z-20`}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: icon.delay,
                    ease: [0.42, 0, 0.58, 1],
                  }}
                >
                  <div
                    className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg"
                    style={{
                      boxShadow: `0 0 20px ${icon.color}`,
                    }}
                  >
                    <img
                      src={icon.img}
                      alt={icon.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md"
                    />
                    {/* Tooltip on hover (optional) */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white whitespace-nowrap">
                      {icon.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
