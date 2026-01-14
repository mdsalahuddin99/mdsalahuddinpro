import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, PenTool, Code, Rocket } from "lucide-react"

type Step = {
  id: string
  title: string
  icon: React.ReactNode
  color: string
}

const steps: Step[] = [
  { id: "planning", title: "Planning", icon: <FileText />, color: "#60a5fa" },
  { id: "design", title: "Design", icon: <PenTool />, color: "#a78bfa" },
  { id: "coding", title: "Coding", icon: <Code />, color: "#34d399" },
  { id: "launch", title: "Launch", icon: <Rocket />, color: "#fb7185" },
]

export const WorkProcess: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [radius, setRadius] = useState(160)

  // Animation loop: expand -> hold -> collapse -> pause -> repeat
  useEffect(() => {
    let mounted = true
    let expandTimer: ReturnType<typeof setTimeout> | null = null
    let collapseTimer: ReturnType<typeof setTimeout> | null = null

    const loop = () => {
      if (!mounted) return
      setExpanded(true)
      expandTimer = setTimeout(() => {
        setExpanded(false)
        // short pause before repeating loop
        collapseTimer = setTimeout(loop, 800)
      }, 3200) // hold while expanded (~3.2s)
    }

    // initial delay so page settles
    const startTimer = setTimeout(loop, 700)

    return () => {
      mounted = false
      clearTimeout(startTimer)
      if (expandTimer) clearTimeout(expandTimer)
      if (collapseTimer) clearTimeout(collapseTimer)
    }
  }, [])

  // compute responsive radius based on container size
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const min = Math.min(rect.width, rect.height)
      // keep some padding
      const newRadius = Math.max(80, Math.min(230, Math.floor(min / 2.5)))
      setRadius(newRadius)
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const angles = [ -60, 60, 160, 260 ] // degrees where cards settle

  const positions = steps.map((_, i) => {
    const angleDeg = angles[i]
    const angleRad = (angleDeg * Math.PI) / 180
    const x = Math.round(radius * Math.cos(angleRad))
    const y = Math.round(radius * Math.sin(angleRad))
    return { x, y }
  })

  return (
    <section id="work-process" className="relative py-20 px-4 bg-[#0b0e14] overflow-hidden">
      {/* large blurred gradient mesh */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden
        animate={{ opacity: [0.18, 0.28, 0.18], scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      >
        <div
          className="absolute -left-1/4 -top-1/4 w-[60rem] h-[60rem] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25), transparent 20%), radial-gradient(circle at 70% 70%, rgba(59,130,246,0.18), transparent 30%)",
          }}
        />
      </motion.div>

      <div className="container mx-auto max-w-6xl">
        <h2 className="text-center text-sm tracking-[0.18em] uppercase text-indigo-300 mb-6 md:mb-10 md:text-base font-medium">THE DEPLOYMENT CYCLE</h2>

        <div ref={containerRef} className="relative mx-auto w-full max-w-4xl h-[420px] md:h-[540px] flex items-center justify-center">
          {/* orbit path (faint dashed circle) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" aria-hidden>
            <g transform="translate(300,300)">
              <circle r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" strokeDasharray="6 8" />

              <AnimatePresence>
                {expanded && positions.map((p, idx) => (
                  <motion.line
                    key={`line-${idx}`}
                    x1={0}
                    y1={0}
                    x2={p.x}
                    y2={p.y}
                    stroke="rgba(255,255,255,0.035)"
                    strokeWidth={1}
                    strokeDasharray="4 6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                  />
                ))}
              </AnimatePresence>
            </g>
          </svg>

          {/* central orb */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <motion.div
              className="rounded-full flex items-center justify-center"
              style={{ width: 180, height: 180 }}
              animate={expanded ? { boxShadow: "0 0 60px rgba(99,102,241,0.28)" } : { boxShadow: "0 0 30px rgba(59,130,246,0.18)" }}
              transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
            >
              <div className="relative w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-[#0b1220]/40 via-transparent to-[#051023]/40 backdrop-blur-xl border border-white/6">
                {/* Mobile center text */}
                <div className="md:hidden text-center px-4">
                  <motion.div
                    animate={expanded ? { scale: [1, 1.03, 1], opacity: [1, 0.96, 1] } : { scale: [1, 1.01, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
                    className="rounded-full p-3"
                  >
                    <div className="text-xs tracking-[0.18em] uppercase text-indigo-200 font-semibold">MY</div>
                    <div className="text-xl font-bold leading-tight text-white">WORK<br/>PROCESS</div>
                  </motion.div>
                </div>

                {/* Desktop minimal orb with V logo */}
                <div className="hidden md:flex items-center justify-center w-full h-full">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white relative z-10"
                    animate={{ scale: [1, 1.06, 1], rotate: [0, 6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: [0.42,0,0.58,1] }}
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M3 12L10 4L21 4L11 18L3 12Z" fill="url(#g)" />
                      <defs>
                        <linearGradient id="g" x1="0" x2="1">
                          <stop offset="0" stopColor="#60a5fa" />
                          <stop offset="1" stopColor="#a78bfa" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>

                  {/* subtle pulsing glow behind orb */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ width: 180, height: 180, background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.14), transparent 30%), radial-gradient(circle at 70% 70%, rgba(59,130,246,0.08), transparent 40%)" }}
                    animate={{ opacity: [0.04, 0.14, 0.04], scale: [1, 1.03, 1] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: [0.42,0,0.58,1] }}
                  />
                </div>
              </div>
            </motion.div>

            <div className="mt-6 text-center md:text-left w-full md:w-96 hidden md:block">
              <p className="text-white/80 text-sm">Circular, intentional steps that take an idea to production with confidence.</p>
            </div>
          </div>

          {/* process cards */}
          <AnimatePresence initial={false}>
            {expanded && steps.map((step, i) => {
              const { x, y } = positions[i]

              return (
                <motion.div
                  key={step.id}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{ x, y, opacity: 1, scale: 1 }}
                  exit={{ x: 0, y: 0, opacity: 0, scale: 0, transition: { duration: 0.6, delay: (steps.length - i) * 0.06, ease: [0.22, 1, 0.36, 1] } }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                  className="absolute z-20 pointer-events-auto"
                  style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                >
                  <motion.div
                    // bobbing effect when at orbit
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: [0.42, 0, 0.58, 1], delay: i * 0.25 }}
                    className="flex items-center justify-center"
                  >
                    {/* Card */}
                    <div className="group">
                      <div className="hidden md:block">
                        <div className="w-40 h-40 rounded-xl bg-white/6 border border-white/6 backdrop-blur-md flex flex-col items-center justify-center gap-2 p-4 text-center shadow-lg" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${step.color}, rgba(255,255,255,0.03))` }}>
                            <div className="text-white">{step.icon}</div>
                          </div>
                          <div className="text-xs uppercase tracking-wider text-white/90 font-semibold">{step.title}</div>
                        </div>
                      </div>

                      {/* mobile card: icon large, title under */}
                      <div className="md:hidden flex flex-col items-center gap-2">
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-white/6 border border-white/6 backdrop-blur-md" style={{ background: `linear-gradient(135deg, ${step.color}, rgba(255,255,255,0.03))` }}>
                          <div className="text-white">{step.icon}</div>
                        </div>
                        <div className="text-xs text-white/90">{step.title}</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default WorkProcess
