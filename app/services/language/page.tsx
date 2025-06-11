"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Users, CheckCircle, ArrowRight, BookOpen, Headphones, MessageCircle } from "lucide-react"
import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment, Sphere, Box } from "@react-three/drei"
import type * as THREE from "three"
import Link from "next/link"

// 3D Component - Must be inside Canvas
function FloatingLanguageElements() {
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
        <Sphere args={[0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#3b82f6" wireframe />
        </Sphere>
      </Float>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Box args={[0.6, 0.6, 0.6]} position={[1.5, 0.5, 0.5]}>
          <meshStandardMaterial color="#1d4ed8" />
        </Box>
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.2}>
        <Sphere args={[0.5]} position={[-1.2, -0.3, 0.8]}>
          <meshStandardMaterial color="#1e40af" />
        </Sphere>
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

export default function LanguageLearningPage() {
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
              <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6">Language Learning</h1>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section with 3D */}
      <section className="py-24 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 opacity-25">
          <Suspense fallback={<CanvasLoader />}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Environment preset="studio" />
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <FloatingLanguageElements />
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
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg transform hover:scale-110 hover:rotate-12 transition-all duration-300">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6 animate-fadeInUp">Language Learning</h1>
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-8 animate-fadeInUp">
              Master new languages with our immersive and interactive teaching methods. From English proficiency to
              local languages, we provide comprehensive language education for all levels.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300 animate-fadeInUp"
              >
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Languages Offered */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Languages We Teach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Comprehensive language programs designed for different proficiency levels and learning goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                language: "English",
                description: "Business English, Academic Writing, IELTS/TOEFL preparation",
                level: "Beginner to Advanced",
                flag: "🇬🇧",
              },
              {
                language: "French",
                description: "Conversational French, Grammar, Cultural immersion",
                level: "Beginner to Intermediate",
                flag: "🇫🇷",
              },
              {
                language: "Luganda",
                description: "Local language mastery, Cultural context, Business communication",
                level: "All Levels",
                flag: "🇺🇬",
              },
              {
                language: "Swahili",
                description: "East African lingua franca, Travel communication, Business Swahili",
                level: "Beginner to Advanced",
                flag: "🇰🇪",
              },
              {
                language: "Spanish",
                description: "Conversational Spanish, Grammar fundamentals, Cultural studies",
                level: "Beginner to Intermediate",
                flag: "🇪🇸",
              },
              {
                language: "German",
                description: "Technical German, Business communication, Academic German",
                level: "Beginner to Intermediate",
                flag: "🇩🇪",
              },
            ].map((lang, index) => (
              <Card
                key={index}
                className="border-0 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 perspective-1000 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{lang.flag}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{lang.language}</h3>
                  <p className="text-blue-600 font-medium mb-4">{lang.level}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{lang.description}</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Methods */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Our Teaching Methods</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Innovative approaches to language learning that make the process engaging and effective.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <MessageCircle className="h-8 w-8" />,
                title: "Conversational Practice",
                description: "Real-world dialogue practice with native speakers and experienced instructors",
              },
              {
                icon: <Headphones className="h-8 w-8" />,
                title: "Audio-Visual Learning",
                description: "Multimedia resources including podcasts, videos, and interactive content",
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Grammar Mastery",
                description: "Structured grammar lessons with practical application exercises",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Cultural Immersion",
                description: "Learn language in cultural context through stories, traditions, and customs",
              },
            ].map((method, index) => (
              <Card
                key={index}
                className="border-0 bg-white rounded-3xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{method.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Levels */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Course Levels</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Structured learning paths designed to take you from beginner to fluency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                level: "Beginner (A1-A2)",
                duration: "3-6 months",
                description: "Basic vocabulary, simple conversations, fundamental grammar",
                features: [
                  "Alphabet and pronunciation",
                  "Basic greetings and introductions",
                  "Numbers, dates, and time",
                  "Simple present tense",
                ],
              },
              {
                level: "Intermediate (B1-B2)",
                duration: "6-12 months",
                description: "Complex conversations, advanced grammar, reading comprehension",
                features: [
                  "Past and future tenses",
                  "Complex sentence structures",
                  "Reading short stories",
                  "Writing paragraphs",
                ],
              },
              {
                level: "Advanced (C1-C2)",
                duration: "12+ months",
                description: "Fluency, professional communication, cultural nuances",
                features: ["Business communication", "Academic writing", "Literature analysis", "Native-level fluency"],
              },
            ].map((course, index) => (
              <Card
                key={index}
                className={`border-0 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  index === 1 ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white" : "bg-white"
                }`}
              >
                <CardContent className="p-8">
                  <h3 className={`text-2xl font-semibold mb-3 ${index === 1 ? "text-white" : "text-gray-900"}`}>
                    {course.level}
                  </h3>
                  <p className={`text-lg font-medium mb-4 ${index === 1 ? "text-blue-100" : "text-blue-600"}`}>
                    {course.duration}
                  </p>
                  <p className={`leading-relaxed mb-6 ${index === 1 ? "text-blue-100" : "text-gray-600"}`}>
                    {course.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {course.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className={`h-5 w-5 ${index === 1 ? "text-blue-200" : "text-green-500"}`} />
                        <span className={index === 1 ? "text-blue-100" : "text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-full ${
                      index === 1
                        ? "bg-white text-blue-600 hover:bg-gray-100"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Language Learning Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Flexible pricing options to suit your learning goals and schedule.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Individual Classes",
                price: "UGX 40,000",
                period: "per session",
                features: [
                  "1-hour private lesson",
                  "Personalized curriculum",
                  "Flexible scheduling",
                  "Progress tracking",
                ],
              },
              {
                name: "Group Classes",
                price: "UGX 25,000",
                period: "per session",
                features: [
                  "Small group (4-6 students)",
                  "Interactive learning",
                  "Peer practice",
                  "Cultural activities",
                ],
              },
              {
                name: "Intensive Course",
                price: "UGX 300,000",
                period: "per month",
                features: ["Daily 2-hour sessions", "Rapid progress", "Immersive experience", "Certificate included"],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className="border-0 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-lg text-gray-600">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">Choose Plan</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">Ready to Start Your Language Journey?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto font-light">
            Join thousands of students who have successfully learned new languages with our expert instructors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300"
              >
                Schedule Free Trial
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-rotate-1"
            >
              View Course Catalog
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
