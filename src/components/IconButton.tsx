"use client"

import type React from "react"

interface IconButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  ariaLabel?: string
}

export const IconButton: React.FC<IconButtonProps> = ({ children, onClick, href, className = "", ariaLabel }) => {
  const baseStyles =
    "inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${className}`}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${className}`} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
