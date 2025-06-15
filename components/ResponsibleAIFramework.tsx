"use client"

import { useEffect, useRef } from "react"
import { principlesData } from "@/data/principlesData"
import PrincipleSection from "./PrincipleSection"
import AnimatedBackground from "./AnimatedBackground"
import ScrollProgress from "./ScrollProgress"
import FloatingNavigation from "./FloatingNavigation"

export default function ResponsibleAIFramework() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset
        const parallax = scrolled * 0.5
        heroRef.current.style.transform = `translateY(${parallax}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <ScrollProgress />
      <FloatingNavigation />
      <AnimatedBackground />

      {/* Header Space - Reserved for future use */}
      <div className="h-20 bg-transparent relative z-10"></div>

      {/* Hero Section with Parallax */}
      <div ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent mb-8 animate-gradient-x">
              Responsible AI
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 animate-pulse"></div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 animate-fade-in-up animation-delay-300">
              Framework
            </h2>
          </div>

          <div className="animate-fade-in-up animation-delay-600">
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Our commitment to developing and deploying artificial intelligence systems that are
              <span className="text-blue-400 font-semibold"> ethical</span>,
              <span className="text-purple-400 font-semibold"> fair</span>, and
              <span className="text-teal-400 font-semibold"> beneficial</span> for all stakeholders and society as a
              whole.
            </p>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500/20 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-teal-500/20 rounded-full animate-float animation-delay-2000"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-32">
            {principlesData.map((principle, index) => (
              <PrincipleSection key={principle.id} principle={principle} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
