"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Code, FileText, CheckCircle, ArrowRight, Users, Award, Target } from "lucide-react"
import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment, Box, Sphere } from "@react-three/drei"
import type * as THREE from "three"
import Link from "next/link"

// 3D Component - Must be inside Canvas
function FloatingProjectElements() {
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
        <Box args={[1.5, 1, 0.3]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#7c3aed" />
        </Box>
      </Float>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Sphere args={[0.6]} position={[1.5, 0.5, 0.5]}>
          <meshStandardMaterial color="#6d28d9" wireframe />
        </Sphere>
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.2}>
        <Box args={[0.8, 1.2, 0.2]} position={[-1.2, -0.3, 0.8]}>
          <meshStandardMaterial color="#5b21b6" />
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

export default function FinalYearProjectsPage() {
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
              <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6">Final Year Projects</h1>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section with 3D */}
      <section className="py-24 bg-gradient-to-br from-purple-100 via-violet-100 to-indigo-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 opacity-25">
          <Suspense fallback={<CanvasLoader />}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Environment preset="studio" />
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <FloatingProjectElements />
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
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg transform hover:scale-110 hover:rotate-12 transition-all duration-300">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6 animate-fadeInUp">Final Year Projects</h1>
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-8 animate-fadeInUp">
              Complete support for final year projects from conception to completion. Expert guidance for undergraduate
              and graduate research projects across all disciplines.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300 animate-fadeInUp"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Project Types We Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Comprehensive support across various academic disciplines and project types.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Research Projects",
                description: "Academic research projects with literature review, methodology, and analysis",
                icon: <FileText className="h-8 w-8" />,
                fields: ["Social Sciences", "Natural Sciences", "Business Studies", "Education"],
              },
              {
                title: "Software Development",
                description: "Complete software applications, web systems, and mobile applications",
                icon: <Code className="h-8 w-8" />,
                fields: ["Web Applications", "Mobile Apps", "Desktop Software", "Database Systems"],
              },
              {
                title: "Engineering Projects",
                description: "Technical projects including design, analysis, and implementation",
                icon: <Target className="h-8 w-8" />,
                fields: ["Civil Engineering", "Mechanical Design", "Electrical Systems", "Environmental"],
              },
              {
                title: "Business Plans",
                description: "Comprehensive business plans and entrepreneurship projects",
                icon: <Users className="h-8 w-8" />,
                fields: ["Market Analysis", "Financial Planning", "Strategy Development", "Operations"],
              },
              {
                title: "Data Analysis",
                description: "Statistical analysis, data mining, and visualization projects",
                icon: <Award className="h-8 w-8" />,
                fields: ["Statistical Analysis", "Machine Learning", "Data Visualization", "Predictive Modeling"],
              },
              {
                title: "Literature Review",
                description: "Comprehensive literature reviews and systematic reviews",
                icon: <FileText className="h-8 w-8" />,
                fields: ["Academic Writing", "Source Analysis", "Critical Review", "Synthesis"],
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="border-0 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 perspective-1000 group"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{project.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
                  <div className="space-y-2">
                    {project.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-purple-500" />
                        <span className="text-gray-700 text-sm">{field}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Our Project Development Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Structured approach ensuring successful project completion from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                phase: "01",
                title: "Project Planning",
                description: "Define objectives, scope, methodology, and timeline",
                duration: "1-2 weeks",
              },
              {
                phase: "02",
                title: "Research & Analysis",
                description: "Literature review, data collection, and preliminary analysis",
                duration: "3-4 weeks",
              },
              {
                phase: "03",
                title: "Development",
                description: "Implementation, coding, experimentation, or construction",
                duration: "6-8 weeks",
              },
              {
                phase: "04",
                title: "Documentation",
                description: "Final report writing, presentation preparation, and submission",
                duration: "2-3 weeks",
              },
            ].map((phase, index) => (
              <Card
                key={index}
                className="border-0 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto">
                    {phase.phase}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{phase.title}</h3>
                  <p className="text-purple-600 font-medium mb-4">{phase.duration}</p>
                  <p className="text-gray-600 leading-relaxed">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Comprehensive Project Support</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
                Everything you need to successfully complete your final year project with professional guidance and
                support.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Topic Selection & Approval",
                    description: "Help choosing viable topics and getting supervisor approval",
                  },
                  {
                    title: "Proposal Writing",
                    description: "Comprehensive project proposals with clear objectives and methodology",
                  },
                  {
                    title: "Research Guidance",
                    description: "Literature review, data collection, and analysis support",
                  },
                  {
                    title: "Implementation Support",
                    description: "Technical implementation, coding, and development assistance",
                  },
                  {
                    title: "Documentation",
                    description: "Professional report writing and presentation preparation",
                  },
                  {
                    title: "Defense Preparation",
                    description: "Presentation skills and defense question preparation",
                  },
                ].map((service, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <GraduationCap className="h-24 w-24 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                <p className="text-gray-600">Professional mentorship throughout your project journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Levels */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Academic Levels Supported</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Professional project support across all academic levels and disciplines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                level: "Undergraduate",
                degree: "Bachelor's Degree",
                duration: "3-6 months",
                features: ["Final year project", "Research methodology", "Data analysis", "Report writing"],
                price: "From UGX 500K",
              },
              {
                level: "Graduate",
                degree: "Master's Degree",
                duration: "6-12 months",
                features: ["Thesis research", "Advanced methodology", "Statistical analysis", "Publication support"],
                price: "From UGX 800K",
              },
              {
                level: "Postgraduate",
                degree: "PhD/Doctorate",
                duration: "1-3 years",
                features: [
                  "Dissertation research",
                  "Original contribution",
                  "Advanced analysis",
                  "Defense preparation",
                ],
                price: "Custom Quote",
              },
            ].map((level, index) => (
              <Card
                key={index}
                className={`border-0 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  index === 1 ? "bg-gradient-to-br from-purple-600 to-indigo-700 text-white" : "bg-white"
                }`}
              >
                <CardContent className="p-8">
                  <h3 className={`text-2xl font-semibold mb-2 ${index === 1 ? "text-white" : "text-gray-900"}`}>
                    {level.level}
                  </h3>
                  <p className={`text-lg font-medium mb-4 ${index === 1 ? "text-purple-100" : "text-purple-600"}`}>
                    {level.degree}
                  </p>
                  <p className={`mb-6 ${index === 1 ? "text-purple-100" : "text-gray-600"}`}>
                    Duration: {level.duration}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {level.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className={`h-5 w-5 ${index === 1 ? "text-purple-200" : "text-green-500"}`} />
                        <span className={index === 1 ? "text-purple-100" : "text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`text-2xl font-bold mb-6 ${index === 1 ? "text-white" : "text-purple-600"}`}>
                    {level.price}
                  </div>
                  <Button
                    className={`w-full rounded-full ${
                      index === 1
                        ? "bg-white text-purple-600 hover:bg-gray-100"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Our students have achieved remarkable success with their final year projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Namukasa",
                project: "E-Learning Platform for Rural Schools",
                degree: "Computer Science, Makerere University",
                achievement: "First Class Honors",
                quote:
                  "The guidance I received was exceptional. My project was not only successful but also got recognition from the faculty.",
              },
              {
                name: "James Okello",
                project: "Sustainable Water Management System",
                degree: "Civil Engineering, MUST",
                achievement: "Best Project Award",
                quote: "Professional support throughout the project. The methodology and analysis were top-notch.",
              },
              {
                name: "Grace Nakato",
                project: "Mobile Banking Security Framework",
                degree: "Information Technology, UCU",
                achievement: "Published in Conference",
                quote: "Not only did I graduate with distinction, but my project was also accepted for publication.",
              },
            ].map((story, index) => (
              <Card
                key={index}
                className="border-0 bg-gray-50 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto">
                    {story.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.name}</h3>
                  <p className="text-purple-600 font-medium mb-2">{story.project}</p>
                  <p className="text-gray-600 text-sm mb-3">{story.degree}</p>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                    {story.achievement}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{story.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">Ready to Excel in Your Final Year?</h2>
          <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto font-light">
            Get professional support for your final year project and graduate with confidence. Our expert team is here
            to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300"
              >
                Schedule Consultation
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-rotate-1"
            >
              View Project Samples
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
