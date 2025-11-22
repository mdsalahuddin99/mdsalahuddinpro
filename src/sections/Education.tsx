import type React from "react"
import { GraduationCap } from "lucide-react"
import { educationData } from "../data/education"
import { SectionTitle } from "../components/SectionTitle"

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-5  px-4 bg-white dark:bg-gray-800/50">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle subtitle="My academic journey and qualifications">Education</SectionTitle>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-500 hidden md:block" />

          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <div key={edu.id} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 border-4 border-white dark:border-gray-900 hidden md:block z-10" />

                {/* Content card */}
                <div className="md:ml-20 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/40 dark:bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300  dark:border-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center md:hidden">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                        <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                          {edu.status}
                        </span>
                      </div>
                      <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">{edu.institute}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{edu.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
