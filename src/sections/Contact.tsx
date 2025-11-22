"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { socialLinks } from "../data/links"
import { Card } from "../components/Card"
import { SectionTitle } from "../components/SectionTitle"
import { Button } from "../components/Button"
import { IconButton } from "../components/IconButton"

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to: socialLinks.email,
          subject: `Portfolio Contact from ${formData.name}`,
        }),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 5000)
      }
    } catch (error) {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle subtitle="Let's work together on your next project">Get In Touch</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <Card className="animate-slide-up w-full">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-sm sm:text-base"
                  placeholder="Your message..."
                />
              </div>

              <Button variant="primary" className="w-full text-sm sm:text-base" onClick={() => {}}>
                {status === "sending" ? (
                  <>Sending...</>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Sent Successfully!
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Failed to Send
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in">
            <Card className="w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="break-words">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">Email</h3>
                  <a href={`mailto:${socialLinks.email}`} className="text-primary hover:underline text-sm sm:text-base break-all">
                    {socialLinks.email}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="w-full">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">Connect with me</h3>
              <div className="flex gap-4">
                <IconButton href={socialLinks.github} ariaLabel="GitHub">
                  <Github className="w-6 h-6" />
                </IconButton>
                <IconButton href={socialLinks.linkedin} ariaLabel="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </IconButton>
                <IconButton href={`mailto:${socialLinks.email}`} ariaLabel="Email">
                  <Mail className="w-6 h-6" />
                </IconButton>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 w-full">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                <strong className="gradient-text">Open to opportunities!</strong>
                <br />
                I'm currently available for freelance projects and full-time positions. Let's build something amazing
                together!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
