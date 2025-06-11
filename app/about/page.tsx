import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Globe } from "lucide-react"
import Link from "next/link"
import { AnimatedButton } from "@/components/ui/animated-button"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300 pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100 dark:from-gray-900 dark:via-amber-900/20 dark:to-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-thin text-blue-900 dark:text-amber-400 mb-6 transition-colors duration-300">About EDUCART</h1>
            <p className="text-xl text-blue-800 dark:text-amber-200 leading-relaxed font-light transition-colors duration-300">
              We are Uganda's premier educational platform, dedicated to transforming learning experiences through
              innovative technology and personalized academic support.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-semibold text-blue-900 dark:text-amber-400 mb-6 transition-colors duration-300">Our Mission</h2>
              <p className="text-blue-800 dark:text-amber-200 leading-relaxed text-lg transition-colors duration-300">
                To democratize quality education in Uganda by providing accessible, innovative, and personalized
                learning solutions that empower students to achieve their full academic potential and contribute
                meaningfully to society.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-semibold text-blue-900 dark:text-amber-400 mb-6 transition-colors duration-300">Our Vision</h2>
              <p className="text-blue-800 dark:text-amber-200 leading-relaxed text-lg transition-colors duration-300">
                To be the leading educational technology platform in East Africa, recognized for excellence in academic
                support, innovation in learning methodologies, and our commitment to educational equity and
                accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-amber-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-blue-900 dark:text-amber-400 mb-6 transition-colors duration-300">Our Values</h2>
            <p className="text-xl text-blue-800 dark:text-amber-200 max-w-3xl mx-auto font-light transition-colors duration-300">
              The principles that guide everything we do at EDUCART Uganda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Award className="h-8 w-8" />,
                title: "Excellence",
                description: "We strive for the highest standards in everything we deliver.",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Accessibility",
                description: "Quality education should be available to every student, regardless of background.",
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Innovation",
                description: "We continuously evolve our methods to enhance learning experiences.",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Integrity",
                description: "We maintain the highest ethical standards in all our interactions.",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="border-0 bg-white dark:bg-gray-700 rounded-3xl shadow-lg hover:shadow-xl dark:hover:shadow-amber-500/10 transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 dark:text-amber-400 mb-4 transition-colors duration-300">{value.title}</h3>
                  <p className="text-blue-800 dark:text-amber-200 leading-relaxed transition-colors duration-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-blue-900 dark:text-amber-400 mb-6 transition-colors duration-300">Our Leadership</h2>
            <p className="text-xl text-blue-800 dark:text-amber-200 max-w-3xl mx-auto font-light transition-colors duration-300">
              Meet the passionate educators and innovators driving EDUCART's mission forward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Dr. Sarah Namukasa",
                role: "Founder & CEO",
                bio: "Former university lecturer with 15+ years in educational technology and curriculum development.",
              },
              {
                name: "James Okello",
                role: "Head of Academic Affairs",
                bio: "Educational consultant specializing in assessment design and learning analytics.",
              },
              {
                name: "Grace Nakato",
                role: "Director of Technology",
                bio: "Software engineer passionate about creating innovative educational platforms.",
              },
            ].map((member, index) => (
              <Card
                key={index}
                className="border-0 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl dark:hover:shadow-amber-500/10 transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-white text-2xl font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 dark:text-amber-400 mb-2 transition-colors duration-300">{member.name}</h3>
                  <p className="text-amber-600 dark:text-amber-300 font-medium mb-4 transition-colors duration-300">{member.role}</p>
                  <p className="text-blue-800 dark:text-amber-200 leading-relaxed transition-colors duration-300">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-amber-600 to-blue-700 dark:from-amber-600 dark:via-blue-600 dark:to-amber-700 transition-colors duration-300">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">Join Our Educational Revolution</h2>
          <p className="text-xl text-blue-100 dark:text-amber-100 mb-12 max-w-3xl mx-auto font-light transition-colors duration-300">
            Be part of Uganda's educational transformation. Whether you're a student, educator, or institution, we have
            solutions for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <AnimatedButton
                variant="magnetic"
                size="lg"
                className="bg-white text-blue-600 dark:text-amber-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg animate-bounce-in group transition-colors duration-300"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" />
              </AnimatedButton>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 dark:hover:text-amber-600 px-8 py-4 text-lg rounded-full transition-colors duration-300"
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
