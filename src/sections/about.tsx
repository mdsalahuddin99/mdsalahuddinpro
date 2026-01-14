import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { aboutData } from "../data/about"
import { useTyped } from "../hooks/useTyped"

export const AboutMeSimple: React.FC = () => {
  const headline = useTyped(["Frontend Developer & WordPress Expert"])
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateY = ((x - rect.width / 2) / rect.width) * 18
    const rotateX = -((y - rect.height / 2) / rect.height) * 18
    setTilt({ x: rotateY, y: rotateX })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const coreTech = ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "WordPress"]

  return (
    <section id="about" className="relative px-4 py-16 sm:py-20 md:py-24">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <motion.div
          className="absolute -top-24 -right-24 w-64 h-64 bg-primary/40 rounded-full blur-3xl opacity-40"
          animate={{ x: [0, 20, -10, 0], y: [0, 10, -15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-72 h-72 bg-secondary/40 rounded-full blur-3xl opacity-40"
          animate={{ x: [0, -15, 25, 0], y: [0, -10, 20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/4 top-10 text-4xl opacity-15"
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          ⚛️
        </motion.div>
        <motion.div
          className="absolute right-10 bottom-16 text-3xl opacity-15"
          animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          JS
        </motion.div>
        <motion.div
          className="absolute right-1/3 bottom-4 text-3xl opacity-10"
          animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          ⌘
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/10 dark:bg-gray-950/60 backdrop-blur-2xl shadow-[0_0_60px_rgba(15,23,42,0.7)] px-4 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12"
      >
        <div className="absolute inset-px rounded-[22px] bg-gradient-to-br from-white/10 via-white/0 to-primary/20 opacity-60 pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-8 sm:mb-10 text-white">
            {aboutData.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center md:justify-start">
              <motion.div
                className="relative w-64 h-64 sm:w-80 sm:h-80"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 1200,
                  transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                }}
              >
                <motion.div
                  className="absolute inset-[-14px] rounded-[2.5rem] bg-gradient-to-tr from-primary via-secondary to-cyan-400 opacity-70 blur-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 rounded-[2.5rem] bg-black/50 backdrop-blur-3xl" />
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-3">
                  <img
                    src={aboutData.image || "/placeholder-about.svg"}
                    alt="About Me"
                    className="w-full h-full object-cover transform -rotate-3 scale-110"
                  />
                </div>
              </motion.div>
            </div>

            <div className="space-y-6 md:space-y-7">
              <div className="space-y-3">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-sm sm:text-base font-semibold uppercase tracking-[0.25em] text-primary"
                >
                  <span className="inline-block align-middle">
                    {headline}
                  </span>
                  <span className="inline-block align-middle animate-pulse">|</span>
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
                  className="text-gray-100/90 dark:text-gray-200 leading-relaxed text-sm sm:text-base"
                >
                  {aboutData.details}
                </motion.p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: 0.25 }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 0 32px rgba(56,189,248,0.7)",
                  }}
                  className="relative rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 sm:px-5 sm:py-4 backdrop-blur-xl"
                >
                  <div className="text-xs font-medium text-primary/90 uppercase tracking-[0.2em] mb-1.5">
                    Experience
                  </div>
                  <p className="text-2xl sm:text-3xl font-semibold text-primary">2+</p>
                  <p className="text-[11px] sm:text-xs text-primary/90">
                    Years learning & building
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: 0.3 }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 0 32px rgba(233,213,255,0.8)",
                  }}
                  className="relative rounded-2xl border border-secondary/40 bg-secondary/10 px-4 py-3 sm:px-5 sm:py-4 backdrop-blur-xl"
                >
                  <div className="text-xs font-medium text-secondary/90 uppercase tracking-[0.2em] mb-1.5">
                    Projects
                  </div>
                  <p className="text-2xl sm:text-3xl font-semibold text-secondary">15+</p>
                  <p className="text-[11px] sm:text-xs text-secondary/90">
                    Projects & experiments
                  </p>
                </motion.div>
              </div>

              <div className="space-y-3">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-[0.18em]"
                >
                  Core technologies I work with
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: 0.4 }}
                  className="flex flex-wrap gap-2.5"
                >
                  {coreTech.map((skill, index) => (
                    <motion.button
                      key={`${skill}-${index}`}
                      whileHover={{
                        y: -2,
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(96,165,250,0.7)",
                      }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs bg-white/10 text-gray-100 border border-white/20 backdrop-blur-xl"
                    >
                      {skill}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
