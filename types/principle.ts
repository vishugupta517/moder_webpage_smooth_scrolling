import type { ComponentType } from "react"

export interface KeyPoint {
  title: string
  description: string
}

export interface TestingMethod {
  title: string
  description: string
  how: string
  frequency: string
}

export interface Principle {
  id: string
  title: string
  icon: ComponentType<{ className?: string }>
  color: string
  whatItMeans: string
  keyPoints: KeyPoint[]
  whyItMatters: string
  testingMethods: TestingMethod[]
  whyTest: string
}
