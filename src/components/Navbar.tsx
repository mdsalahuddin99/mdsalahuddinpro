"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"


const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("#home")
            }}
            className="text-lg sm:text-xl font-bold gradient-text"
          >
            MSU
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 sm:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <div className="ml-4 sm:ml-10">
              
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
          
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 space-y-2 px-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className="block py-2 px-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
