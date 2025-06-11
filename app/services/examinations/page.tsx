import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Monitor, Shield, Clock, BarChart, CheckCircle, ArrowRight, Users } from "lucide-react"

export default function ExaminationsPage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Monitor className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6">Online Examinations</h1>
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-8">
              Secure, efficient, and comprehensive online examination platform with real-time monitoring, automated
              grading, and detailed analytics for educational institutions.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
              Request Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Advanced examination technology designed for modern educational needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Secure Environment",
                description: "Advanced proctoring and anti-cheating measures ensure exam integrity",
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Real-time Monitoring",
                description: "Live supervision with AI-powered behavior analysis and alerts",
              },
              {
                icon: <BarChart className="h-8 w-8" />,
                title: "Instant Results",
                description: "Automated grading with detailed performance analytics",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Scalable Platform",
                description: "Support for thousands of concurrent examinees",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 bg-gray-50 rounded-3xl hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
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

      {/* Examination Types */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Examination Types</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Comprehensive support for all types of academic assessments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Multiple Choice",
                description: "Automated grading with instant feedback and detailed explanations",
                features: ["Auto-grading", "Question banks", "Randomization", "Time limits"],
              },
              {
                title: "Essay Questions",
                description: "AI-assisted evaluation with human review for comprehensive assessment",
                features: ["Plagiarism detection", "Rubric-based grading", "Peer review", "Version control"],
              },
              {
                title: "Practical Exams",
                description: "Interactive simulations and virtual labs for hands-on assessment",
                features: ["Virtual environments", "Screen recording", "File uploads", "Live demonstrations"],
              },
              {
                title: "Oral Examinations",
                description: "Video conferencing integration for face-to-face oral assessments",
                features: ["HD video calls", "Recording capability", "Multi-examiner support", "Scheduling tools"],
              },
              {
                title: "Group Projects",
                description: "Collaborative assessment tools for team-based evaluations",
                features: ["Team formation", "Progress tracking", "Peer evaluation", "Presentation tools"],
              },
              {
                title: "Certification Tests",
                description: "Professional certification exams with industry-standard security",
                features: ["Secure browser", "Identity verification", "Certificate generation", "Compliance reporting"],
              },
            ].map((type, index) => (
              <Card
                key={index}
                className="border-0 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{type.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
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

      {/* Security Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Uncompromising Security</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
                Our platform employs multiple layers of security to ensure the highest level of exam integrity and
                prevent academic dishonesty.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "AI Proctoring",
                    description: "Advanced AI monitors student behavior and flags suspicious activities",
                  },
                  {
                    title: "Browser Lockdown",
                    description: "Secure browser prevents access to external resources during exams",
                  },
                  {
                    title: "Identity Verification",
                    description: "Biometric and document verification ensures the right person takes the exam",
                  },
                  {
                    title: "Plagiarism Detection",
                    description: "Real-time content analysis prevents copying and unauthorized collaboration",
                  },
                ].map((security, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{security.title}</h3>
                      <p className="text-gray-600">{security.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <Shield className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Bank-Level Security</h3>
                <p className="text-gray-600">256-bit encryption and multi-factor authentication</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
                <p className="text-gray-600">Comprehensive insights and reporting</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Powerful Analytics</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
                Gain deep insights into student performance, question effectiveness, and examination trends with our
                comprehensive analytics dashboard.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Performance Metrics",
                    description: "Detailed analysis of individual and group performance patterns",
                  },
                  {
                    title: "Question Analytics",
                    description: "Identify difficult questions and optimize your question banks",
                  },
                  {
                    title: "Cheating Detection",
                    description: "Advanced algorithms detect and report potential academic dishonesty",
                  },
                  {
                    title: "Custom Reports",
                    description: "Generate tailored reports for administrators, teachers, and students",
                  },
                ].map((analytic, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{analytic.title}</h3>
                      <p className="text-gray-600">{analytic.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Pricing Plans</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Flexible pricing options for institutions of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "UGX 500,000",
                period: "per month",
                students: "Up to 100 students",
                features: ["Basic proctoring", "Multiple choice exams", "Standard reports", "Email support"],
              },
              {
                name: "Professional",
                price: "UGX 1,200,000",
                period: "per month",
                students: "Up to 500 students",
                features: [
                  "Advanced proctoring",
                  "All question types",
                  "Custom reports",
                  "Priority support",
                  "API access",
                ],
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "pricing",
                students: "Unlimited students",
                features: [
                  "Full feature access",
                  "Dedicated support",
                  "Custom integrations",
                  "SLA guarantee",
                  "Training included",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`border-0 rounded-3xl shadow-lg ${index === 1 ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white" : "bg-white"}`}
              >
                <CardContent className="p-8">
                  <h3 className={`text-2xl font-semibold mb-4 ${index === 1 ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className={`text-4xl font-bold ${index === 1 ? "text-white" : "text-gray-900"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ${index === 1 ? "text-blue-100" : "text-gray-600"}`}>/{plan.period}</span>
                  </div>
                  <p className={`mb-6 ${index === 1 ? "text-blue-100" : "text-gray-600"}`}>{plan.students}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className={`h-5 w-5 ${index === 1 ? "text-blue-200" : "text-green-500"}`} />
                        <span className={index === 1 ? "text-blue-100" : "text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-full ${index === 1 ? "bg-white text-blue-600 hover:bg-gray-100" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                  >
                    {index === 2 ? "Contact Sales" : "Get Started"}
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
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">Transform Your Examination Process</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto font-light">
            Join leading educational institutions using our platform to conduct secure, efficient online examinations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full">
              Schedule Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg rounded-full"
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
