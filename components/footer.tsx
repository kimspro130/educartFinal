import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-amber-900 dark:bg-amber-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              {/* Larger logo in footer */}
              <img src="/images/educart-logo-new.png" alt="EDUCART UGANDA" className="h-16 w-auto" />
            </div>
            <p className="text-amber-200 leading-relaxed text-sm sm:text-base">
              Transforming education in Uganda through innovative learning solutions and personalized academic support.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-amber-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-amber-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-amber-300 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-amber-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-300">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/tutoring"
                  className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Subject Tutoring
                </Link>
              </li>
              <li>
                <Link
                  href="/services/language"
                  className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Language Learning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/assessments"
                  className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Holiday Assessments
                </Link>
              </li>
              <li>
                <Link
                  href="/services/examinations"
                  className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Online Examinations
                </Link>
              </li>
              <li>
                <Link
                  href="/services/exam-assistance"
                  className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Exam Assistance
                </Link>
              </li>
              <li>
                <Link
                  href="/services/projects"
                  className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Final Year Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/services/web-design"
                  className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Web Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base">
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-amber-200 hover:text-white transition-colors text-sm sm:text-base">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-300">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-amber-200 text-sm sm:text-base">Kampala, Uganda</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <span className="text-amber-200 text-sm sm:text-base">+256 700 123 456</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-amber-200 text-sm sm:text-base break-all">info@educartuganda.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 dark:border-amber-900 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-amber-300 text-sm sm:text-base">
            © {new Date().getFullYear()} EDUCART UGANDA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
