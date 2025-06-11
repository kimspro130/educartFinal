"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Award, CheckCircle, ArrowRight, Users, Target } from "lucide-react"
import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment, Box } from "@react-three/drei"
import type * as THREE from "three"

// 3D Component - Must be inside Canvas
function FloatingExamElements() {
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
          <meshStandardMaterial color="#3b82f6" />
        </Box>
      </Float>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Box args={[0.8, 1.2, 0.15]} position={[0.8, 0.2, 0.3]}>
          <meshStandardMaterial color="#1d4ed8" />
        </Box>
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.2}>
        <Box args={[0.9, 1.3, 0.18]} position={[-0.6, -0.1, 0.2]}>
          <meshStandardMaterial color="#1e40af" />
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

export default function ExamAssistancePage() {
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
              <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6">Exam Assistance</h1>
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
              <FloatingExamElements />
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
              <Target className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6 animate-fadeInUp">Exam Assistance</h1>
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-8 animate-fadeInUp">
              Professional exam assistance services for students who need support with their assessments. We provide
              reliable, confidential, and high-quality assistance across various academic levels and subjects.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300 animate-fadeInUp"
            >
              Get Assistance
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Confidential Service",
                description: "Complete privacy and discretion guaranteed for all clients",
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Timely Delivery",
                description: "Always completed within the specified timeframe",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Quality Results",
                description: "High-quality work that meets academic standards",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Expert Team",
                description: "Qualified professionals across all academic disciplines",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 perspective-1000 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Assistance */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Types of Assistance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              We provide comprehensive assistance across various assessment types and academic levels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Online Exams",
                description: "Assistance with online examinations across all subjects and platforms",
                features: ["Real-time support", "Technical expertise", "Subject specialists", "Secure handling"],
              },
              {
                title: "Coursework Assessments",
                description: "Support with continuous assessment tasks and coursework submissions",
                features: ["Assignment completion", "Research assistance", "Quality assurance", "Timely delivery"],
              },
              {
                title: "Final Examinations",
                description: "Comprehensive support for end-of-semester and final year examinations",
                features: ["Subject mastery", "Exam strategies", "Time management", "Result optimization"],
              },
              {
                title: "Professional Certifications",
                description: "Assistance with professional certification exams and industry assessments",
                features: ["Industry expertise", "Certification knowledge", "Practice tests", "Success guarantee"],
              },
              {
                title: "Standardized Tests",
                description: "Support for standardized testing including entrance exams and aptitude tests",
                features: ["Test preparation", "Strategy development", "Practice sessions", "Score improvement"],
              },
              {
                title: "Practical Assessments",
                description: "Assistance with practical exams, lab work, and hands-on evaluations",
                features: ["Practical skills", "Lab expertise", "Equipment knowledge", "Safety protocols"],
              },
            ].map((type, index) => (
              <Card
                key={index}
                className="border-0 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 perspective-1000"
              >
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{type.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Transparent pricing based on complexity, duration, and academic level.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl shadow-lg">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-semibold text-gray-900 mb-4">Exam Assistance Pricing</h3>
                  <div className="text-5xl font-bold text-blue-600 mb-2">UGX 50K - 130K</div>
                  <p className="text-lg text-gray-600">per assessment</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Pricing Factors:</h4>
                    {[
                      "Academic level (Certificate to Masters)",
                      "Subject complexity and specialization",
                      "Duration and time requirements",
                      "Urgency and deadline constraints",
                    ].map((factor, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{factor}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h4>
                    {[
                      "Complete assessment handling",
                      "Subject matter expertise",
                      "Quality assurance checks",
                      "Confidential service delivery",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full w-full sm:w-auto"
                  >
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Contact Us",
                description: "Reach out with your assessment details and requirements",
              },
              {
                step: "02",
                title: "Quote & Agreement",
                description: "Receive a detailed quote and agree on terms and timeline",
              },
              {
                step: "03",
                title: "Secure Payment",
                description: "Make secure payment through our trusted payment channels",
              },
              {
                step: "04",
                title: "Delivery",
                description: "Receive your completed assessment within the agreed timeframe",
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 bg-yellow-50 border-l-4 border-yellow-400">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-yellow-800 mb-4">Important Notice</h3>
            <p className="text-yellow-700 leading-relaxed">
              Our exam assistance services are provided for educational support purposes. We encourage students to use
              our services responsibly and in accordance with their institution's academic policies. We recommend
              consulting with your academic advisor before using any assistance services.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">Need Exam Assistance?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto font-light">
            Get professional, confidential assistance for your assessments. Contact us today for a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300"
            >
              Get Started Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-rotate-1"
            >
              Contact for Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
