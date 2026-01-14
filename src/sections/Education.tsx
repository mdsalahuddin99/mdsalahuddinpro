import type React from "react"
import { GraduationCap, Calendar, Building2 } from "lucide-react"
import { educationData } from "../data/education"
import { SectionTitle } from "../components/SectionTitle"
import { Card } from "../components/Card"

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-12 md:py-20 px-4 bg-white dark:bg-gray-800/50">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle subtitle="My academic journey and qualifications">Education</SectionTitle>

        <div className="relative mt-8 md:mt-12">
          {/* Timeline vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary transform md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {educationData.map((edu, index) => (
              <div 
                key={edu.id} 
                className={`relative flex flex-col md:flex-row items-center w-full animate-slide-up ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Content Side */}
                <div className="pl-10 sm:pl-12 md:pl-0 md:w-[45%] w-full">
                  <Card hover className="relative overflow-hidden group p-4 sm:p-6">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                    <div className="flex flex-col sm:flex-row md:flex-row items-start gap-3 sm:gap-4 md:gap-6 relative z-10">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary dark:text-white">
                        <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      <div className="flex-1 space-y-2 sm:space-y-3 w-full">
                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                            {edu.degree}
                          </h3>
                          <span className={`
                            px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold w-fit
                            ${edu.status === 'Present' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' 
                              : 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300 border border-primary/20'}
                          `}>
                            {edu.status}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
                            <span>{edu.institute}</span>
                          </div>
                          <div className="hidden sm:block text-gray-300 dark:text-gray-600">•</div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
                            <span>{edu.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-[10px] md:left-1/2 top-8 md:top-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-r from-primary to-secondary border-[3px] md:border-4 border-white dark:border-gray-900 z-10 shadow-lg transform md:-translate-x-1/2 md:-translate-y-1/2" />
                
                {/* Empty Side for Desktop Balance */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
