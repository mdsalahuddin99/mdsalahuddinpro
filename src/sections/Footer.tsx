import type React from "react"
import { Heart } from "lucide-react"

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto max-w-6xl text-center">
        <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by{" "}
          <span className="gradient-text font-semibold">MD Salauddin</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  )
}
