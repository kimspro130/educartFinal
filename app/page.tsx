"use client"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingActionButton } from "@/components/ui/floating-action-button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, Globe, GraduationCap, Users, Award, Zap, Phone, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment, Sphere, Box } from "@react-three/drei"
import * as THREE from "three"

// 3D Components - These must be used ONLY inside Canvas
function FloatingEducationElements() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Box args={[1.5, 2, 0.3]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#3b82f6" />
        </Box>
        <Box args={[1.4, 1.9, 0.02]} position={[0, 0, 0.16]}>
          <meshStandardMaterial color="#f8fafc" />
        </Box>
      </Float>

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere args={[0.5]} position={[2, 1, -1]}>
          <meshStandardMaterial color="#1d4ed8" wireframe />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
        <Box args={[0.8, 0.8, 0.8]} position={[-2, -1, 1]}>
          <meshStandardMaterial color="#1e40af" />
        </Box>
      </Float>
    </group>
  )
}

function InteractiveServiceCards() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1
          child.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1
        }
      })
    }
  })

  const services = [
    { position: [-3, 1, 0], color: "#3b82f6" },
    { position: [0, 1, 0], color: "#2563eb" },
    { position: [3, 1, 0], color: "#1d4ed8" },
    { position: [-1.5, -1, 0], color: "#1e40af" },
    { position: [1.5, -1, 0], color: "#1e3a8a" },
  ]

  return (
    <group ref={groupRef}>
      {services.map((service, index) => (
        <Float key={index} speed={1 + index * 0.2} rotationIntensity={0.2} floatIntensity={0.3}>
          <Box args={[0.8, 1, 0.1]} position={service.position as [number, number, number]}>
            <meshStandardMaterial color={service.color} />
          </Box>
        </Float>
      ))}
    </group>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 100

  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#3b82f6" transparent opacity={0.6} />
    </points>
  )
}

// Loading fallback component
function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  )
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-thin text-blue-900 mb-6 tracking-tight">
              Education
              <span className="block font-light bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Floating Action Button */}
      <FloatingActionButton
        actions={[
          {
            icon: <Phone className="h-5 w-5" />,
            label: "Call Us",
            onClick: () => window.open("tel:+256700123456"),
            color: "bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 text-white",
          },
          {
            icon: <Mail className="h-5 w-5" />,
            label: "Email Us",
            onClick: () => window.open("mailto:info@educartuganda.com"),
            color: "bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 text-white",
          },
          {
            icon: <MessageCircle className="h-5 w-5" />,
            label: "Chat",
            onClick: () => console.log("Open chat"),
            color: "bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 text-white",
          },
        ]}
      />

      {/* Hero Section with 3D */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-amber-50 to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* 3D Background */}
        <div className="absolute inset-0 opacity-30">
          <Suspense fallback={<CanvasLoader />}>
            <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
              <Environment preset="studio" />
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <directionalLight position={[-10, -10, -5]} intensity={0.3} />
              <FloatingEducationElements />
              <ParticleField />
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

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Large Logo Display in Hero Section */}
            <div className="flex justify-center mb-8">
              <img
                src="/images/educart-logo-new.png"
                alt="EDUCART UGANDA"
                className="h-24 sm:h-32 w-auto animate-fadeInUp"
              />
            </div>
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-thin text-blue-900 dark:text-amber-400 mb-6 tracking-tight animate-fadeInUp transition-colors duration-300"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
              }}
            >
              Education
              <span className="block font-light bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl text-blue-800 dark:text-amber-200 mb-12 font-light leading-relaxed max-w-3xl mx-auto animate-fadeInUp transition-colors duration-300"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
                animationDelay: "0.2s",
              }}
            >
              Uganda's premier educational platform offering world-class tutoring, assessment, and academic support
              services for every learning journey.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp"
              style={{
                animationDelay: "0.4s",
              }}
            >
              <Link href="/pricing">
                <AnimatedButton
                  variant="gradient"
                  size="lg"
                  className="px-8 py-4 text-lg rounded-full text-white shadow-lg group animate-pulse-slow hover:animate-none bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                </AnimatedButton>
              </Link>
              <AnimatedButton
                variant="magnetic"
                size="lg"
                className="px-8 py-4 text-lg rounded-full border-blue-600 dark:border-amber-400 hover:border-blue-700 dark:hover:border-amber-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90 text-blue-800 dark:text-amber-400 transition-colors duration-300"
              >
                Explore Services
              </AnimatedButton>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400 dark:border-amber-500 rounded-full flex justify-center transition-colors duration-300">
            <div className="w-1 h-3 bg-amber-400 dark:bg-amber-500 rounded-full mt-2 animate-pulse transition-colors duration-300"></div>
          </div>
        </div>
      </section>

      {/* Services Overview with 3D Cards */}
      <section className="py-24 bg-white dark:bg-gray-900 relative transition-colors duration-300">
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-96 h-96 opacity-20 dark:opacity-10">
          <Suspense fallback={<CanvasLoader />}>
            <Canvas camera={{ position: [0, 0, 6] }}>
              <Environment preset="studio" />
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} />
              <InteractiveServiceCards />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} enableDamping />
            </Canvas>
          </Suspense>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-thin text-blue-900 dark:text-amber-400 mb-6 transition-colors duration-300">Our Services</h2>
            <p className="text-xl text-blue-800 dark:text-amber-200 max-w-3xl mx-auto font-light transition-colors duration-300">
              Comprehensive educational solutions designed to elevate your academic journey and unlock your full
              potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Subject Tutoring",
                description: "Expert tutoring across all academic subjects with personalized learning approaches.",
                color: "from-amber-400 to-amber-600",
                href: "/services/tutoring",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Language Learning",
                description: "Master new languages with our immersive and interactive teaching methods.",
                color: "from-blue-500 to-blue-600",
                href: "/services/language",
              },
              {
                icon: <GraduationCap className="h-8 w-8" />,
                title: "Holiday Assessments",
                description: "Comprehensive holiday work evaluation for primary and secondary students.",
                color: "from-amber-500 to-amber-700",
                href: "/services/assessments",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Online Examinations",
                description: "Secure and efficient online examination platform with real-time monitoring.",
                color: "from-blue-600 to-blue-700",
                href: "/services/examinations",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Final Year Projects",
                description: "Complete support for final year projects from conception to completion.",
                color: "from-amber-600 to-amber-800",
                href: "/services/projects",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Web Design",
                description: "Professional web design services for educational institutions and businesses.",
                color: "from-blue-700 to-blue-800",
                href: "/services/web-design",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl dark:hover:shadow-amber-500/10 transition-all duration-500 border-0 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden transform hover:-translate-y-2 perspective-1000"
                style={{
                  transform: `translateY(${scrollY * 0.02 * (index % 2 === 0 ? 1 : -1)}px) rotateX(${Math.sin(scrollY * 0.01 + index) * 2}deg)`,
                }}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-blue-900 dark:text-amber-400 mb-4 transition-colors duration-300">{service.title}</h3>
                  <p className="text-blue-800 dark:text-amber-200 leading-relaxed mb-6 transition-colors duration-300">{service.description}</p>
                  <AnimatedButton
                    variant="ripple"
                    asChild
                    className="text-amber-600 dark:text-amber-400 font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-colors bg-transparent hover:bg-amber-50 dark:hover:bg-amber-900/20 p-0 h-auto"
                  >
                    <Link href={service.href} className="inline-flex items-center">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </AnimatedButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Parallax */}
      <section className="py-24 bg-gradient-to-r from-amber-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden transition-colors duration-300">
        <div
          className="absolute inset-0 bg-gradient-to-r from-amber-200 to-blue-200 dark:from-gray-800 dark:to-gray-700 transition-colors duration-300"
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0001})`,
          }}
        ></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { number: "10,000+", label: "Students Taught" },
              { number: "500+", label: "Expert Tutors" },
              { number: "50+", label: "Subjects Covered" },
              { number: "98%", label: "Success Rate" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center transform transition-all duration-500 hover:scale-110"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.01 + index) * 10}px)`,
                }}
              >
                <div className="text-5xl md:text-6xl font-thin text-blue-900 dark:text-amber-400 mb-2 animate-heartbeat transition-colors duration-300">{stat.number}</div>
                <div className="text-blue-800 dark:text-amber-300 text-lg font-light transition-colors duration-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with 3D Effects */}
      <section className="py-24 bg-white dark:bg-gray-900 relative transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-thin text-blue-900 dark:text-amber-400 mb-6 transition-colors duration-300">What Students Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "EDUCART transformed my understanding of mathematics. The personalized approach made complex concepts simple.",
                author: "Sarah Nakato",
                role: "University Student",
              },
              {
                quote:
                  "The online examination platform is incredibly user-friendly and secure. It made our school assessments seamless.",
                author: "Dr. James Okello",
                role: "School Administrator",
              },
              {
                quote:
                  "Their final year project support was exceptional. I graduated with distinction thanks to their guidance.",
                author: "Michael Ssebunya",
                role: "Engineering Graduate",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 bg-amber-50 dark:bg-gray-800 rounded-3xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-amber-500/10 perspective-1000 animate-bounce-in"
                style={{
                  transform: `rotateY(${Math.sin(scrollY * 0.005 + index) * 5}deg) translateZ(${Math.cos(scrollY * 0.005 + index) * 20}px)`,
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <CardContent className="p-8">
                  <p className="text-blue-800 dark:text-amber-200 text-lg leading-relaxed mb-6 italic transition-colors duration-300">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-blue-900 dark:text-amber-400 transition-colors duration-300">{testimonial.author}</div>
                    <div className="text-blue-700 dark:text-amber-300 transition-colors duration-300">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-amber-600 dark:via-amber-500 dark:to-amber-600 relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2
            className="text-5xl md:text-6xl font-thin text-white dark:text-gray-900 mb-6 transition-colors duration-300"
            style={{
              transform: `translateY(${Math.sin(scrollY * 0.01) * 10}px)`,
            }}
          >
            Ready to Excel?
          </h2>
          <p
            className="text-xl text-blue-100 dark:text-gray-800 mb-12 max-w-3xl mx-auto font-light transition-colors duration-300"
            style={{
              transform: `translateY(${Math.cos(scrollY * 0.01) * 5}px)`,
            }}
          >
            Join thousands of students who have transformed their academic journey with EDUCART Uganda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <AnimatedButton
                variant="glow"
                size="lg"
                className="bg-amber-400 dark:bg-gray-900 text-gray-900 dark:text-amber-400 hover:bg-amber-500 dark:hover:bg-gray-800 px-8 py-4 text-lg rounded-full shadow-lg animate-heartbeat hover:animate-none transition-colors duration-300"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </AnimatedButton>
            </Link>
            <AnimatedButton
              variant="pulse"
              size="lg"
              className="border-white dark:border-gray-900 text-white dark:text-gray-900 hover:bg-white dark:hover:bg-gray-900 hover:text-blue-700 dark:hover:text-amber-400 px-8 py-4 text-lg rounded-full bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm transition-colors duration-300"
            >
              Contact Us
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
