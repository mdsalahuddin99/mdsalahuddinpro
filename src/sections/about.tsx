// src/components/AboutMeSimple.tsx

import React from "react"
import { aboutData } from "../data/about"

export const AboutMeSimple: React.FC = () => {
  return (
    <section id="about" className="px-4 py-10 sm:pb-20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          {aboutData.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Side - Image with a simple effect */}
          <div className="flex justify-center md:justify-end animate-fade-in">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Optional background glow effect similar to your hero section */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg transform -rotate-3 opacity-30 blur-xl"></div>
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={aboutData.image || "/placeholder-about.svg"}
                  alt="About Me"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6 animate-slide-up">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg text-justify">
              {aboutData.details}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
