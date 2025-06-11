"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Clock, Award, CheckCircle, ArrowRight } from "lucide-react"
import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment, Box } from "@react-three/drei"
import type * as THREE from "three"

// 3D Component - Must be inside Canvas
function FloatingBooks() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Box args={[1, 1.4, 0.2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#64748b" />
        </Box>
      </Float>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Box args={[0.8, 1.2, 0.15]} position={[0.8, 0.2, 0.3]}>
          <meshStandardMaterial color="#475569" />
        </Box>
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.2}>
        <Box args={[0.9, 1.3, 0.18]} position={[-0.6, -0.1, 0.2]}>
          <meshStandardMaterial color="#334155" />
        </Box>
      </Float>
    </group>
  )
}

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  )
}

export default function TutoringPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <section className="py-24 bg-gradient-to-br from-gray-100 to-slate-200">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6">Subject Tutoring</h1>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 pt-16">
      {/* Hero Section with 3D */}
      <section className="py-24 bg-gradient-to-br from-amber-100 via-blue-100 to-amber-200 dark:from-gray-900 dark:via-amber-900/20 dark:to-gray-800 relative overflow-hidden transition-colors duration-300">
        <div className="absolute right-0 top-0 w-96 h-96 opacity-25">
          <Suspense fallback={<CanvasLoader />}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Environment preset="studio" />
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <FloatingBooks />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                enableDamping
                dampingFactor={0.05}
              />
            </Canvas>
          </Suspense>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg transform hover:scale-110 hover:rotate-12 transition-all duration-300">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-thin text-blue-900 dark:text-amber-400 mb-6 animate-fadeInUp transition-colors duration-300">Subject Tutoring</h1>
            <p className="text-xl text-blue-800 dark:text-amber-200 leading-relaxed font-light mb-8 animate-fadeInUp transition-colors duration-300">
              Personalized one-on-one and group tutoring across all academic subjects, designed to help students excel
              in their studies and build lasting confidence.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-blue-600 hover:from-amber-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300 animate-fadeInUp"
            >
              Book a Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features with 3D hover effects */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Users className="h-8 w-8" />,
                title: "Expert Tutors",
                description: "Qualified educators with proven track records in their subjects",
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Flexible Scheduling",
                description: "Sessions available 7 days a week to fit your schedule",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Proven Results",
                description: "98% of students improve their grades within 3 months",
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "All Subjects",
                description: "From primary to university level across all disciplines",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 bg-amber-50 dark:bg-gray-800 rounded-3xl hover:shadow-xl dark:hover:shadow-amber-500/10 transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 perspective-1000 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 dark:text-amber-400 mb-4 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-blue-800 dark:text-amber-200 leading-relaxed transition-colors duration-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Covered */}
      <section className="py-24 bg-amber-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-blue-900 dark:text-amber-400 mb-6 transition-colors duration-300">Subjects We Cover</h2>
            <p className="text-xl text-blue-800 dark:text-amber-200 max-w-3xl mx-auto font-light transition-colors duration-300">
              Comprehensive tutoring across all academic levels and disciplines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                category: "STEM Subjects",
                subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Engineering"],
              },
              {
                category: "Languages & Literature",
                subjects: ["English", "Literature", "Luganda", "French", "Swahili", "Creative Writing"],
              },
              {
                category: "Social Sciences",
                subjects: ["History", "Geography", "Economics", "Political Science", "Psychology", "Sociology"],
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="border-0 bg-white dark:bg-gray-700 rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-amber-500/10 transition-all duration-500 transform hover:scale-105 hover:rotate-1 perspective-1000"
              >
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-blue-900 dark:text-amber-400 mb-6 transition-colors duration-300">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.subjects.map((subject, subIndex) => (
                      <li
                        key={subIndex}
                        className="flex items-center space-x-3 transform hover:translate-x-2 transition-transform duration-200"
                      >
                        <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        <span className="text-blue-800 dark:text-amber-200 transition-colors duration-300">{subject}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Assessment",
                description: "We evaluate your current level and identify areas for improvement",
              },
              {
                step: "02",
                title: "Matching",
                description: "We pair you with the perfect tutor based on your needs and learning style",
              },
              {
                step: "03",
                title: "Learning",
                description: "Engage in personalized sessions designed to maximize your understanding",
              },
              {
                step: "04",
                title: "Progress",
                description: "Track your improvement with regular assessments and feedback",
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Tutoring Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Flexible pricing options to suit every budget and learning need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "UGX 50,000",
                period: "per session",
                features: ["1-hour session", "Subject specialist tutor", "Progress tracking", "Study materials"],
              },
              {
                name: "Premium",
                price: "UGX 180,000",
                period: "per month",
                features: [
                  "4 sessions per month",
                  "Priority tutor selection",
                  "Homework support",
                  "Progress reports",
                  "Exam preparation",
                ],
              },
              {
                name: "Elite",
                price: "UGX 320,000",
                period: "per month",
                features: [
                  "8 sessions per month",
                  "Dedicated tutor",
                  "24/7 support",
                  "Custom study plans",
                  "University prep",
                  "Career guidance",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`border-0 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  index === 1 ? "bg-gradient-to-br from-gray-800 to-slate-900 text-white scale-105" : "bg-white"
                }`}
              >
                <CardContent className="p-8">
                  <h3 className={`text-2xl font-semibold mb-4 ${index === 1 ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${index === 1 ? "text-white" : "text-gray-900"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ${index === 1 ? "text-gray-300" : "text-gray-600"}`}>/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className={`h-5 w-5 ${index === 1 ? "text-gray-300" : "text-slate-600"}`} />
                        <span className={index === 1 ? "text-gray-300" : "text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-full transition-all duration-300 ${
                      index === 1
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">Ready to Excel in Your Studies?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-light">
            Join thousands of students who have transformed their academic performance with our expert tutoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300"
            >
              Book Free Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-rotate-1"
            >
              View All Tutors
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
