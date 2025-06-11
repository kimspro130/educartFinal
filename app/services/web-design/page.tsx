"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Monitor, Smartphone, Palette, CheckCircle, ArrowRight, Code, Zap, Globe } from "lucide-react"
import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment, Box, Sphere } from "@react-three/drei"
import type * as THREE from "three"
import Link from "next/link"

// 3D Component - Must be inside Canvas
function FloatingWebElements() {
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
        <Box args={[1.8, 1.2, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#10b981" />
        </Box>
      </Float>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Box args={[0.6, 1, 0.05]} position={[1.5, 0.3, 0.3]}>
          <meshStandardMaterial color="#059669" />
        </Box>
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.2}>
        <Sphere args={[0.4]} position={[-1.2, -0.5, 0.5]}>
          <meshStandardMaterial color="#047857" wireframe />
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

export default function WebDesignPage() {
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
              <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6">Web Design</h1>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section with 3D */}
      <section className="py-24 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 opacity-25">
          <Suspense fallback={<CanvasLoader />}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Environment preset="studio" />
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <FloatingWebElements />
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
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg transform hover:scale-110 hover:rotate-12 transition-all duration-300">
              <Monitor className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6 animate-fadeInUp">Web Design Services</h1>
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-8 animate-fadeInUp">
              Professional web design and development services for educational institutions, businesses, and
              organizations. Create stunning, responsive websites that engage your audience.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300 animate-fadeInUp"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Our Web Design Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Comprehensive web solutions tailored to your specific needs and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Educational Websites",
                description: "Custom websites for schools, universities, and educational institutions",
                icon: <Globe className="h-8 w-8" />,
                features: ["Student portals", "Course management", "Online enrollment", "Resource libraries"],
              },
              {
                title: "Business Websites",
                description: "Professional websites that showcase your business and drive growth",
                icon: <Monitor className="h-8 w-8" />,
                features: ["Corporate design", "Service showcases", "Contact forms", "SEO optimization"],
              },
              {
                title: "E-commerce Solutions",
                description: "Online stores with secure payment processing and inventory management",
                icon: <Zap className="h-8 w-8" />,
                features: ["Product catalogs", "Shopping carts", "Payment gateways", "Order management"],
              },
              {
                title: "Portfolio Websites",
                description: "Showcase your work and achievements with stunning portfolio sites",
                icon: <Palette className="h-8 w-8" />,
                features: ["Gallery displays", "Project showcases", "Client testimonials", "Contact integration"],
              },
              {
                title: "Mobile Applications",
                description: "Responsive mobile apps for iOS and Android platforms",
                icon: <Smartphone className="h-8 w-8" />,
                features: ["Cross-platform", "User-friendly UI", "Push notifications", "Offline functionality"],
              },
              {
                title: "Custom Development",
                description: "Tailored web applications built to your specific requirements",
                icon: <Code className="h-8 w-8" />,
                features: [
                  "Custom functionality",
                  "Database integration",
                  "API development",
                  "Third-party integrations",
                ],
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="border-0 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 perspective-1000 group"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
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

      {/* Design Process */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Our Design Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              A systematic approach to creating exceptional web experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your goals, audience, and requirements",
                duration: "1 week",
              },
              {
                step: "02",
                title: "Design",
                description: "Creating wireframes, mockups, and visual designs",
                duration: "2-3 weeks",
              },
              {
                step: "03",
                title: "Development",
                description: "Building responsive, functional websites",
                duration: "3-6 weeks",
              },
              {
                step: "04",
                title: "Launch",
                description: "Testing, optimization, and deployment",
                duration: "1 week",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="border-0 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-green-600 font-medium mb-4">{step.duration}</p>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Technologies We Use</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Modern technologies and frameworks for cutting-edge web solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                category: "Frontend",
                technologies: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
              },
              {
                category: "Backend",
                technologies: ["Node.js", "Python", "PHP", "Express.js", "Laravel"],
              },
              {
                category: "Database",
                technologies: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase"],
              },
              {
                category: "Tools",
                technologies: ["Git", "Docker", "AWS", "Vercel", "Figma"],
              },
            ].map((tech, index) => (
              <Card
                key={index}
                className="border-0 bg-gray-50 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">{tech.category}</h3>
                  <ul className="space-y-3">
                    {tech.technologies.map((technology, techIndex) => (
                      <li key={techIndex} className="text-gray-700 font-medium">
                        {technology}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Web Design Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Flexible pricing options to suit different project requirements and budgets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic Website",
                price: "UGX 800,000",
                description: "Perfect for small businesses and personal websites",
                features: ["Up to 5 pages", "Responsive design", "Contact form", "Basic SEO", "1 month support"],
              },
              {
                name: "Professional Website",
                price: "UGX 1,500,000",
                description: "Ideal for growing businesses and organizations",
                features: [
                  "Up to 15 pages",
                  "Custom design",
                  "CMS integration",
                  "Advanced SEO",
                  "3 months support",
                  "Analytics setup",
                ],
                popular: true,
              },
              {
                name: "Enterprise Solution",
                price: "Custom Quote",
                description: "Comprehensive solutions for large organizations",
                features: [
                  "Unlimited pages",
                  "Custom functionality",
                  "Database integration",
                  "API development",
                  "6 months support",
                  "Training included",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`border-0 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  plan.popular ? "bg-gradient-to-br from-green-600 to-emerald-700 text-white scale-105" : "bg-white"
                }`}
              >
                <CardContent className="p-8">
                  {plan.popular && (
                    <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 text-center">
                      Most Popular
                    </div>
                  )}
                  <h3 className={`text-2xl font-semibold mb-4 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-green-600"}`}>
                      {plan.price}
                    </span>
                  </div>
                  <p className={`mb-6 ${plan.popular ? "text-green-100" : "text-gray-600"}`}>{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className={`h-5 w-5 ${plan.popular ? "text-green-200" : "text-green-500"}`} />
                        <span className={plan.popular ? "text-green-100" : "text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-full ${
                      plan.popular
                        ? "bg-white text-green-600 hover:bg-gray-100"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {plan.price.includes("Custom") ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Our Recent Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Showcasing some of our latest web design and development projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Kampala International School",
                category: "Educational Website",
                description: "Modern school website with student portal and online enrollment system",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Uganda Coffee Exports",
                category: "Business Website",
                description: "Professional website showcasing coffee products and export services",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Makerere Research Portal",
                category: "Academic Platform",
                description: "Research publication platform for university faculty and students",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "East Africa Crafts",
                category: "E-commerce",
                description: "Online marketplace for traditional African crafts and artwork",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Dr. Sarah Clinic",
                category: "Healthcare Website",
                description: "Medical practice website with appointment booking system",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Tech Innovators Hub",
                category: "Portfolio Website",
                description: "Technology company portfolio showcasing innovative solutions",
                image: "/placeholder.svg?height=300&width=400",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="border-0 bg-gray-50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <Monitor className="h-16 w-16 text-green-600" />
                </div>
                <CardContent className="p-6">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">Ready to Build Your Website?</h2>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto font-light">
            Let's create a stunning website that represents your brand and achieves your business goals. Contact us
            today to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300"
              >
                Schedule Consultation
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-rotate-1"
            >
              View Full Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
