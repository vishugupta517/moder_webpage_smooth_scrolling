"use client"

import { useEffect, useState } from "react"
import { principlesData } from "@/data/principlesData"

export default function FloatingNavigation() {
  const [activeSection, setActiveSection] = useState<string>("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      const heroHeight = window.innerHeight

      // Show navigation after hero section
      setIsVisible(scrollPosition > heroHeight * 0.8)

      // Find active section
      const sections = principlesData.map((principle) => ({
        id: principle.id,
        element: document.getElementById(principle.id),
      }))

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= 300) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center space-y-4">
      {/* Navigation Dots */}
      <div className="bg-white/10 backdrop-blur-lg rounded-full p-4 border border-white/20 shadow-2xl">
        <div className="flex flex-col space-y-3">
          {/* Home/Top Button */}
          <button
            onClick={scrollToTop}
            className={`group relative w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
              activeSection === ""
                ? "bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg shadow-blue-500/50"
                : "bg-white/30 hover:bg-white/50"
            }`}
            title="Back to Top"
          >
            <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Back to Top</div>
            </div>
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                activeSection === "" ? "animate-pulse bg-blue-400/30" : ""
              }`}
            ></div>
          </button>

          {/* Section Dots */}
          {principlesData.map((principle, index) => (
            <button
              key={principle.id}
              onClick={() => scrollToSection(principle.id)}
              className={`group relative w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                activeSection === principle.id
                  ? `${principle.color.replace("bg-gradient-to-br", "bg-gradient-to-r")} shadow-lg`
                  : "bg-white/30 hover:bg-white/50"
              }`}
              title={principle.title}
              style={{
                boxShadow:
                  activeSection === principle.id ? `0 0 20px ${getPrincipleColor(principle.color)}` : undefined,
              }}
            >
              {/* Tooltip */}
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 -translate-x-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-2">
                <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
                  <div className="flex items-center space-x-2">
                    <principle.icon className="w-4 h-4" />
                    <span>{principle.title}</span>
                  </div>
                  <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
                    <div className="w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Active indicator ring */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  activeSection === principle.id ? "animate-pulse bg-white/20 scale-150" : ""
                }`}
              ></div>

              {/* Progress ring for active section */}
              {activeSection === principle.id && (
                <div className="absolute -inset-1 rounded-full border-2 border-white/30 animate-spin-slow"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Section Counter */}
      <div className="bg-white/10 backdrop-blur-lg rounded-full px-3 py-2 border border-white/20 shadow-xl">
        <div className="text-white text-xs font-medium">
          {activeSection === "" ? "Top" : `${principlesData.findIndex((p) => p.id === activeSection) + 1}/5`}
        </div>
      </div>
    </div>
  )
}

// Helper function to extract color for glow effect
function getPrincipleColor(colorClass: string): string {
  const colorMap: { [key: string]: string } = {
    "from-blue-500": "#3b82f6",
    "from-green-500": "#10b981",
    "from-purple-500": "#8b5cf6",
    "from-orange-500": "#f97316",
    "from-teal-500": "#14b8a6",
  }

  for (const [key, value] of Object.entries(colorMap)) {
    if (colorClass.includes(key)) {
      return value + "50" // Add transparency
    }
  }

  return "#3b82f650"
}
