import type React from "react"
import { Github, Linkedin, Download } from "lucide-react"
import { heroData } from "../data/hero"
import { useTyped } from "../hooks/useTyped"
import { Button } from "../components/Button"
import { IconButton } from "../components/IconButton"

export const Hero: React.FC = () => {
  const typedText = useTyped(heroData.roles)

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-5 pt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 animate-slide-up text-center md:text-left">
            <h1 className="text-3xl sm:text-5xl font-bold break-words">
              Hi, I am <span className="gradient-text">{heroData.name}</span>
            </h1>

            <div className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 h-10 sm:h-12">
              <span className="gradient-text">{typedText}</span>
              <span className="animate-pulse">|</span>
            </div>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {heroData.intro}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 sm:pt-4">
              <Button variant="primary" href={heroData.links.linkedin}>
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </Button>

              <Button variant="secondary" href={heroData.links.cvUrl} download>
                <Download className="w-5 h-5" />
                Download CV
              </Button>

              <IconButton href={heroData.links.github} ariaLabel="GitHub Profile">
                <Github className="w-6 h-6" />
              </IconButton>
            </div>
          </div>

          {/* Right Side - Profile Image */}
          <div className="flex justify-center animate-fade-in">
            <div className="relative w-60 h-60 sm:w-80 sm:h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-30 animate-glow"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-primary to-secondary p-1">
                <img
                  src={heroData.profileImage || "/placeholder.svg"}
                  alt={heroData.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
