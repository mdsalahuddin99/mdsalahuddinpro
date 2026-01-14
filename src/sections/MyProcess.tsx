import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Pencil, Code2, Monitor } from "lucide-react"
import { SectionTitle } from "../components/SectionTitle"
import { Card } from "../components/Card"

const stepReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export const MyProcess: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.2"],
  })

  const lineGlowOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0.05, 1])

  return (
    <section
      id="process"
      className="py-16 md:py-20 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionTitle subtitle="From first pencil line to live, polished experience">
            My Process
          </SectionTitle>
        </motion.div>

        <div
          ref={containerRef}
          className="relative mt-10 md:mt-14 pl-10 md:pl-0"
        >
          <div className="pointer-events-none absolute left-4 top-0 bottom-0 md:left-1/2 md:-translate-x-1/2">
            <div className="h-full w-px border-l-2 border-dashed border-sky-500/30" />
            <motion.div
              style={{
                scaleY: lineScaleY,
                opacity: lineGlowOpacity,
                transformOrigin: "top",
              }}
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] rounded-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-violet-500 shadow-[0_0_40px_rgba(56,189,248,0.95)]"
            />
          </div>

          <div className="space-y-10 md:space-y-16">
            <motion.div
              variants={stepReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center"
            >
              <div className="flex items-start gap-4 md:col-span-2 md:col-start-1 md:pr-10">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -2, 2, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: [0.42, 0, 0.58, 1],
                  }}
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/80 via-indigo-500/80 to-violet-500/90 text-white shadow-[0_0_35px_rgba(56,189,248,0.9)]"
                >
                  <Pencil className="h-7 w-7" />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.6, 0.2] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: [0.42, 0, 0.58, 1],
                    }}
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-sky-400/40 blur-xl"
                  />
                </motion.div>

                <Card
                  hover
                  className="relative w-full rounded-3xl border border-white/15 bg-white/10 dark:bg-white/5 px-5 py-5 sm:px-7 sm:py-6 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,23,42,0.85)]"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-sky-500/15 opacity-70 mix-blend-screen" />
                  <div className="relative space-y-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-sky-300">
                      Step 1
                    </p>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-50">
                      The Sketch
                    </h3>
                    <p className="text-sm sm:text-base text-gray-200/90">
                      I start with quick wireframes and flows, defining structure,
                      content priority, and interaction moments before a single
                      line of code is written.
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <motion.svg
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.7 }}
                        className="h-16 w-24 text-sky-200"
                        viewBox="0 0 120 80"
                      >
                        <motion.rect
                          x="8"
                          y="10"
                          rx="8"
                          ry="8"
                          width="104"
                          height="60"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 1.2, ease: [0.42, 0, 0.58, 1] }}
                          viewport={{ once: true, amount: 0.7 }}
                        />
                        <motion.rect
                          x="18"
                          y="20"
                          width="40"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 0.9, ease: [0.42, 0, 0.58, 1], delay: 0.2 }}
                          viewport={{ once: true, amount: 0.7 }}
                        />
                        <motion.rect
                          x="64"
                          y="20"
                          width="38"
                          height="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 0.9, ease: [0.42, 0, 0.58, 1], delay: 0.35 }}
                          viewport={{ once: true, amount: 0.7 }}
                        />
                        <motion.rect
                          x="18"
                          y="46"
                          width="84"
                          height="10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 0.9, ease: [0.42, 0, 0.58, 1], delay: 0.5 }}
                          viewport={{ once: true, amount: 0.7 }}
                        />
                      </motion.svg>
                      <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-sky-200">
                          Wireframes
                        </span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-sky-200">
                          User flows
                        </span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-sky-200">
                          UX strategy
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            <motion.div
              variants={stepReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="relative md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center"
            >
              <div className="flex items-start gap-4 md:col-span-2 md:col-start-1 md:pl-10">
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: [0.42, 0, 0.58, 1],
                  }}
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/80 via-sky-500/80 to-indigo-500/90 text-white shadow-[0_0_35px_rgba(34,197,94,0.9)]"
                >
                  <Code2 className="h-7 w-7" />
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.6, 0.2] }}
                    transition={{
                      duration: 2.1,
                      repeat: Infinity,
                      ease: [0.42, 0, 0.58, 1],
                    }}
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-emerald-400/40 blur-xl"
                  />
                </motion.div>

                <Card
                  hover
                  className="relative w-full rounded-3xl border border-white/15 bg-white/10 dark:bg-white/5 px-5 py-5 sm:px-7 sm:py-6 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,23,42,0.85)]"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/10 via-transparent to-sky-500/20 opacity-80 mix-blend-screen" />
                  <div className="relative space-y-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">
                      Step 2
                    </p>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-50">
                      The Coding
                    </h3>
                    <p className="text-sm sm:text-base text-gray-200/90">
                      I translate the sketch into clean, scalable code with
                      attention to motion, micro-interactions, and performance so
                      the experience feels alive.
                    </p>

                    <div className="relative mt-4 overflow-hidden rounded-2xl border border-emerald-400/40 bg-gray-950/90 px-4 py-3 text-xs sm:text-sm text-emerald-100 shadow-[0_20px_60px_rgba(6,78,59,0.9)]">
                      <div className="relative">
                        <motion.div
                          aria-hidden
                          className="pointer-events-none absolute -top-10 -left-4 h-28 w-28 bg-emerald-400/20 blur-3xl"
                          animate={{ opacity: [0.1, 0.5, 0.1] }}
                          transition={{
                            duration: 3.2,
                            repeat: Infinity,
                            ease: [0.42, 0, 0.58, 1],
                          }}
                        />
                        <div className="font-mono text-[11px] sm:text-xs text-emerald-100/90">
                          <span className="text-emerald-400">const</span>{" "}
                          <span className="text-sky-300">Process</span>{" "}
                          <span className="text-emerald-400">=</span>{" "}
                          <span className="text-emerald-300">()</span>{" "}
                          <span className="text-emerald-400">=&gt;</span>{" "}
                          <span className="text-emerald-300">{"{"}</span>
                          <br />
                          <span className="pl-4 text-slate-300">
                            return{" "}
                            <span className="text-sky-400">
                              {"<Experience ready={true} />"}
                            </span>
                            ;
                          </span>
                          <br />
                          <span className="text-emerald-300">{"}"}</span>
                        </div>

                        <motion.div
                          className="pointer-events-none"
                          animate={{ y: [0, 10, 0] }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: [0.42, 0, 0.58, 1],
                          }}
                        >
                          <motion.span
                            initial={{ opacity: 0, x: -40, y: -10, scale: 0.8 }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                              y: 0,
                              scale: 1,
                            }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="absolute -left-5 top-1 rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-200"
                          >
                            {"<div>"}
                          </motion.span>
                          <motion.span
                            initial={{ opacity: 0, x: 40, y: 4, scale: 0.8 }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                              y: 0,
                              scale: 1,
                            }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="absolute -right-4 top-4 rounded-full bg-sky-500/20 px-2 py-0.5 font-mono text-[10px] text-sky-200"
                          >
                            const ui
                          </motion.span>
                          <motion.span
                            initial={{ opacity: 0, x: -32, y: 18, scale: 0.8 }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                              y: 0,
                              scale: 1,
                            }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="absolute -left-3 bottom-2 rounded-full bg-indigo-500/20 px-2 py-0.5 font-mono text-[10px] text-indigo-200"
                          >
                            useEffect()
                          </motion.span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            <motion.div
              variants={stepReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="relative md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center"
            >
              <div className="flex items-start gap-4 md:col-span-2 md:col-start-1 md:pr-10">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -4, 4, 0],
                  }}
                  transition={{
                    duration: 6.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: [0.42, 0, 0.58, 1],
                  }}
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400/80 via-fuchsia-500/80 to-sky-500/90 text-white shadow-[0_0_40px_rgba(168,85,247,0.9)]"
                >
                  <Monitor className="h-7 w-7" />
                  <motion.div
                    animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.65, 0.2] }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: [0.42, 0, 0.58, 1],
                    }}
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-fuchsia-400/40 blur-xl"
                  />
                </motion.div>

                <Card
                  hover
                  className="relative w-full rounded-3xl border border-white/15 bg-white/10 dark:bg-white/5 px-5 py-5 sm:px-7 sm:py-6 backdrop-blur-2xl shadow-[0_20px_70px_rgba(15,23,42,0.9)]"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-fuchsia-400/10 via-transparent to-sky-400/25 opacity-90 mix-blend-screen" />
                  <div className="relative space-y-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300">
                      Step 3
                    </p>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-50">
                      The Live Site
                    </h3>
                    <p className="text-sm sm:text-base text-gray-200/90">
                      I ship a live, optimized experience with polished motion,
                      responsive layouts, and smooth interactions that feel
                      intentional and premium.
                    </p>

                    <motion.div
                      className="relative mt-4 w-full overflow-hidden rounded-2xl border border-fuchsia-400/50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-3 shadow-[0_24px_80px_rgba(76,29,149,0.95)]"
                      animate={{
                        scale: [1, 1.02, 1],
                        boxShadow: [
                          "0 24px 80px rgba(76,29,149,0.8)",
                          "0 30px 90px rgba(129,140,248,0.95)",
                          "0 24px 80px rgba(76,29,149,0.8)",
                        ],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: [0.42, 0, 0.58, 1],
                      }}
                    >
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-rose-500" />
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <span className="ml-2 font-medium text-gray-200">
                            your-site.live
                          </span>
                        </div>
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-emerald-300">
                          Deployed
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] sm:text-xs">
                        <div className="col-span-2 rounded-xl bg-white/5 p-2 text-gray-100">
                          <p className="font-medium">Hero section</p>
                          <p className="text-[10px] text-gray-300/80">
                            Smooth scroll, parallax, and micro-interactions.
                          </p>
                        </div>
                        <div className="rounded-xl bg-white/5 p-2 text-gray-100">
                          <p className="font-medium">Performance</p>
                          <p className="text-[10px] text-emerald-300">Lighthouse 90+</p>
                        </div>
                      </div>
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.4),_transparent_55%)]"
                        animate={{ opacity: [0.25, 0.65, 0.25] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: [0.42, 0, 0.58, 1],
                        }}
                      />
                    </motion.div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

