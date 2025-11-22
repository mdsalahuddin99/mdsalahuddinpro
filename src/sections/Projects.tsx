import type React from "react"
import { Github, ExternalLink } from "lucide-react"
import { projectsData } from "../data/projects"
import { Card } from "../components/Card"
import { SectionTitle } from "../components/SectionTitle"
import { Button } from "../components/Button"

export const Projects: React.FC = () => {

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle subtitle="Some of my recent work and side projects">Projects</SectionTitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <Card
              key={project.id}
              hover
              className="overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden rounded-lg mb-4">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" href={project.githubUrl}>
                  <Github className="w-4 h-4" />
                  Code
                </Button>
                <Button variant="primary" size="sm" href={project.liveUrl}>
                  <ExternalLink className="w-4 h-4" />
                  Live
                </Button>
                 
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
