import type React from "react"

interface SectionTitleProps {
  children: React.ReactNode
  subtitle?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, subtitle }) => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">{children}</h2>
      {subtitle && <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
