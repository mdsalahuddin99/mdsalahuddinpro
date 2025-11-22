import type React from "react"
import { techData } from "../data/tech"
import { Card } from "../components/Card"
import { SectionTitle } from "../components/SectionTitle"

export const TechStack: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle subtitle="Technologies and tools I work with">Tech Stack</SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {techData.map((tech, index) => (
            <Card
              key={tech.id}
              hover
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* ✅ If tech.img is an image path, render <img>, else render emoji */}
              {tech.img.endsWith(".png") ? (
                <img
                  src={tech.img}
                  alt={tech.name}
                  className="w-16 h-16 mx-auto mb-3 object-contain"
                />
              ) : (
                <div className="text-5xl mb-3">{tech.img}</div>
              )}

              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {tech.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {tech.category}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
