"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronRightIcon, SparklesIcon } from "@heroicons/react/24/outline"
import type { Principle } from "@/types/principle"

interface PrincipleSectionProps {
  principle: Principle
  index: number
}

export default function PrincipleSection({ principle, index }: PrincipleSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isEven = index % 2 === 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      id={principle.id}
      ref={sectionRef}
      className={`relative transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl"></div>

      <div
        className={`relative ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} flex flex-col lg:flex gap-12 items-start`}
      >
        {/* Principle Icon and Title */}
        <div className="lg:w-1/3 mb-8 lg:mb-0">
          <div className="sticky top-8">
            <div
              className={`group relative inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 ${principle.color} transform transition-all duration-500 hover:scale-110 hover:rotate-6`}
            >
              <principle.icon className="w-10 h-10 text-white transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <SparklesIcon className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 animate-gradient-text">{principle.title}</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-2/3">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8 hover:bg-white/15 transition-all duration-500">
            {/* What it Means */}
            <section
              className="group cursor-pointer"
              onClick={() => setActiveSection(activeSection === "meaning" ? null : "meaning")}
            >
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center group-hover:text-blue-400 transition-colors duration-300">
                <ChevronRightIcon
                  className={`w-6 h-6 text-blue-400 mr-3 transition-transform duration-300 ${activeSection === "meaning" ? "rotate-90" : ""}`}
                />
                What it Means
                <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
              </h3>
              <div
                className={`overflow-hidden transition-all duration-500 ${activeSection === "meaning" ? "max-h-96 opacity-100" : "max-h-20 opacity-70"}`}
              >
                <p className="text-gray-300 leading-relaxed">{principle.whatItMeans}</p>
              </div>
            </section>

            {/* Key Points */}
            <section
              className="group cursor-pointer"
              onClick={() => setActiveSection(activeSection === "keypoints" ? null : "keypoints")}
            >
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center group-hover:text-purple-400 transition-colors duration-300">
                <ChevronRightIcon
                  className={`w-6 h-6 text-purple-400 mr-3 transition-transform duration-300 ${activeSection === "keypoints" ? "rotate-90" : ""}`}
                />
                Key Points
                <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
              </h3>
              <div
                className={`grid gap-4 transition-all duration-500 ${activeSection === "keypoints" ? "opacity-100" : "opacity-70"}`}
              >
                {principle.keyPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border-l-4 border-blue-400 transform transition-all duration-500 hover:scale-105 hover:bg-white/20 ${
                      isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <h4 className="font-semibold text-white mb-3 text-lg">{point.title}</h4>
                    <p className="text-gray-300 leading-relaxed">{point.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Why it Matters */}
            <section
              className="group cursor-pointer"
              onClick={() => setActiveSection(activeSection === "matters" ? null : "matters")}
            >
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center group-hover:text-teal-400 transition-colors duration-300">
                <ChevronRightIcon
                  className={`w-6 h-6 text-teal-400 mr-3 transition-transform duration-300 ${activeSection === "matters" ? "rotate-90" : ""}`}
                />
                Why it Matters
                <div className="ml-auto w-2 h-2 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
              </h3>
              <div
                className={`bg-gradient-to-r from-teal-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-6 border border-teal-400/30 transition-all duration-500 ${activeSection === "matters" ? "opacity-100" : "opacity-70"}`}
              >
                <p className="text-gray-200 leading-relaxed">{principle.whyItMatters}</p>
              </div>
            </section>

            {/* Testing Methods */}
            <section
              className="group cursor-pointer"
              onClick={() => setActiveSection(activeSection === "testing" ? null : "testing")}
            >
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center group-hover:text-orange-400 transition-colors duration-300">
                <ChevronRightIcon
                  className={`w-6 h-6 text-orange-400 mr-3 transition-transform duration-300 ${activeSection === "testing" ? "rotate-90" : ""}`}
                />
                Testing Methods
                <div className="ml-auto w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
              </h3>
              <div
                className={`space-y-6 transition-all duration-500 ${activeSection === "testing" ? "opacity-100" : "opacity-70"}`}
              >
                {principle.testingMethods.map((method, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                  >
                    <h4 className="font-semibold text-white mb-3 text-lg">{method.title}</h4>
                    <p className="text-gray-300 mb-4 leading-relaxed">{method.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-lg p-4 border border-green-400/30 hover:border-green-400/50 transition-all duration-300">
                        <span className="text-sm font-medium text-green-300">How:</span>
                        <p className="text-sm text-green-200 mt-1">{method.how}</p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg p-4 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300">
                        <span className="text-sm font-medium text-purple-300">Frequency:</span>
                        <p className="text-sm text-purple-200 mt-1">{method.frequency}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why TEST? */}
            <section
              className="group cursor-pointer"
              onClick={() => setActiveSection(activeSection === "whytest" ? null : "whytest")}
            >
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center group-hover:text-pink-400 transition-colors duration-300">
                <ChevronRightIcon
                  className={`w-6 h-6 text-pink-400 mr-3 transition-transform duration-300 ${activeSection === "whytest" ? "rotate-90" : ""}`}
                />
                Why TEST?
                <div className="ml-auto w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
              </h3>
              <div
                className={`bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-pink-400/30 transition-all duration-500 ${activeSection === "whytest" ? "opacity-100" : "opacity-70"}`}
              >
                <p className="text-gray-200 leading-relaxed">{principle.whyTest}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
