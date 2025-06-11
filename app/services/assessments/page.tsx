"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Award, CheckCircle, ArrowRight, BookOpen } from "lucide-react"
import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment, Box } from "@react-three/drei"
import type * as THREE from "three"
import Link from "next/link"

// 3D Component - Must be inside Canvas
function FloatingAssessmentElements() {
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
        <Box args={[1.2, 1.6, 0.2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#f59e0b" />
        </Box>
      </Float>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Box args={[1, 1.4, 0.15]} position={[1, 0.3, 0.5]}>
          <meshStandardMaterial color="#d97706" />
        </Box>
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.2}>
        <Box args={[0.8, 1.2, 0.18]} position={[-0.8, -0.2, 0.3]}>
          <meshStandardMaterial color="#b45309" />
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

export default function HolidayAssessmentsPage() {
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
              <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6">Holiday Assessments</h1>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section with 3D */}
      <section className="py-24 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 opacity-25">
          <Suspense fallback={<CanvasLoader />}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Environment preset="studio" />
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <FloatingAssessmentElements />
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
            <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-amber-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg transform hover:scale-110 hover:rotate-12 transition-all duration-300">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6 animate-fadeInUp">Holiday Assessments</h1>
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-8 animate-fadeInUp">
              Comprehensive holiday work evaluation and support services for primary and secondary students. Keep your
              academic progress on track during school breaks.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300 animate-fadeInUp"
              >
                Get Assessment Support
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Academic Levels */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Academic Levels Covered</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Tailored holiday assessment support for every educational stage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                level: "Kindergarten",
                ages: "Ages 3-5",
                subjects: ["Basic literacy", "Numeracy", "Creative activities", "Motor skills"],
                price: "UGX 30,000",
              },
              {
                level: "Upper Primary",
                ages: "P4-P7",
                subjects: ["Mathematics", "English", "Science", "Social Studies"],
                price: "UGX 30,000",
              },
              {
                level: "Middle Primary",
                ages: "P1-P3",
                subjects: ["Reading", "Writing", "Basic Math", "Environmental Science"],
                price: "UGX 30,000",
              },
              {
                level: "Secondary",
                ages: "S1-S6",
                subjects: ["Core subjects", "Sciences", "Languages", "Humanities"],
                price: "UGX 30,000",
              },
            ].map((level, index) => (
              <Card
                key={index}
                className="border-0 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 perspective-1000 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-700 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{level.level}</h3>
                  <p className="text-orange-600 font-medium mb-4">{level.ages}</p>
                  <div className="text-2xl font-bold text-orange-600 mb-4">{level.price}</div>
                  <ul className="space-y-2 mb-6">
                    {level.subjects.map((subject, subIndex) => (
                      <li key={subIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 text-sm">{subject}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-full">
                    Select Level
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Our Holiday Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Comprehensive support to ensure productive and educational holiday periods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Holiday Work Completion",
                description: "Complete assistance with all holiday assignments across subjects",
                features: ["All subjects covered", "Quality assurance", "Timely delivery", "Original work"],
              },
              {
                title: "Revision Programs",
                description: "Structured revision sessions to reinforce previous term's learning",
                features: ["Topic summaries", "Practice exercises", "Weak area focus", "Progress tracking"],
              },
              {
                title: "Preparatory Classes",
                description: "Get ahead with next term's curriculum through preview sessions",
                features: ["Curriculum preview", "Concept introduction", "Study materials", "Learning strategies"],
              },
              {
                title: "Assessment Evaluation",
                description: "Professional evaluation and feedback on completed holiday work",
                features: ["Detailed feedback", "Grade improvement tips", "Error analysis", "Recommendations"],
              },
              {
                title: "Study Skills Training",
                description: "Develop effective study habits and time management skills",
                features: ["Study techniques", "Time management", "Note-taking skills", "Exam strategies"],
              },
              {
                title: "Subject Tutoring",
                description: "Intensive tutoring in challenging subjects during holidays",
                features: ["Expert tutors", "Personalized approach", "Flexible scheduling", "Progress monitoring"],
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="border-0 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-orange-500" />
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

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Simple steps to get comprehensive holiday assessment support.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Submit Requirements",
                description: "Send us your holiday work requirements and academic level details",
              },
              {
                step: "02",
                title: "Assessment & Quote",
                description: "We evaluate the work scope and provide a detailed quote",
              },
              {
                step: "03",
                title: "Work Completion",
                description: "Our experts complete the assignments with quality assurance",
              },
              {
                step: "04",
                title: "Review & Delivery",
                description: "Final review and timely delivery of completed work",
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">
                Why Choose Our Holiday Assessment Services?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
                Ensure your child's academic progress continues during school breaks with our professional support
                services.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Academic Continuity",
                    description: "Maintain learning momentum during holiday periods",
                  },
                  {
                    title: "Quality Assurance",
                    description: "All work reviewed by qualified educators",
                  },
                  {
                    title: "Time Management",
                    description: "Efficient completion allowing time for rest and recreation",
                  },
                  {
                    title: "Skill Development",
                    description: "Learn new study techniques and academic skills",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <Award className="h-24 w-24 text-orange-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600">Professional academic support you can trust</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Holiday Assessment Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Affordable pricing for comprehensive holiday work support.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 bg-gradient-to-r from-orange-100 to-amber-100 rounded-3xl shadow-lg">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-semibold text-gray-900 mb-4">Holiday Works Package</h3>
                  <div className="text-5xl font-bold text-orange-600 mb-2">UGX 30,000</div>
                  <p className="text-lg text-gray-600">per academic level</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h4>
                    {[
                      "Complete holiday assignments",
                      "All subjects for the level",
                      "Quality assurance checks",
                      "Timely delivery guarantee",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Additional Benefits:</h4>
                    {[
                      "Progress feedback reports",
                      "Study tips and recommendations",
                      "Next term preparation notes",
                      "Academic consultation included",
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full w-full sm:w-auto"
                    >
                      Get Started Today
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">Make This Holiday Productive</h2>
          <p className="text-xl text-orange-100 mb-12 max-w-3xl mx-auto font-light">
            Don't let holiday work stress you out. Get professional support and enjoy your break while staying
            academically prepared.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300"
              >
                Schedule Consultation
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-rotate-1"
            >
              View Sample Work
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
