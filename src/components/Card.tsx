import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  style?: React.CSSProperties // ✅ Add this line
}

export const Card: React.FC<CardProps> = ({ children, className = "", hover = false, style }) => {
  return (
    <div
      className={`
       bg-gradient-to-r from-primary/10 to-secondary/10 dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-primary/40
        ${hover ? "transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20" : ""}
        ${className}
      `}
      style={style} // ✅ Use the style prop
    >
      {children}
    </div>
  )
}
