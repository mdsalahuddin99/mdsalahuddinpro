"use client"

import type React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  )
}

