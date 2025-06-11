"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isMobileMenuOpen])

  if (!mounted) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/images/educart-logo-new.png" alt="EDUCART UGANDA" className="h-12 w-auto" />
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-amber-50/95 dark:bg-amber-900/95 backdrop-blur-xl shadow-sm border-b border-amber-200 dark:border-amber-700/30"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Made Bigger */}
          <Link href="/" className="flex items-center space-x-2 group">
            <img
              src="/images/educart-logo-new.png"
              alt="EDUCART UGANDA"
              className="h-12 sm:h-14 w-auto group-hover:scale-105 transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-all duration-300 hover:scale-105">
                <span>Services</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-amber-50/95 dark:bg-amber-900/95 backdrop-blur-xl border-amber-200 dark:border-amber-700/30 shadow-xl rounded-2xl">
                <DropdownMenuItem asChild>
                  <Link
                    href="/services/tutoring"
                    className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    Subject Tutoring
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/services/language"
                    className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    Language Learning
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/services/assessments"
                    className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    Holiday Assessments
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/services/examinations"
                    className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    Online Examinations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/services/exam-assistance"
                    className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    Exam Assistance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/services/projects"
                    className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    Final Year Projects
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/services/web-design"
                    className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    Web Design
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/about"
              className="text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-all duration-300 hover:scale-105"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-all duration-300 hover:scale-105"
            >
              Pricing
            </Link>
            <Link
              href="/resources"
              className="text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-all duration-300 hover:scale-105"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-all duration-300 hover:scale-105"
            >
              Contact
            </Link>
          </div>

          {/* Theme Toggle and CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/payment">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-600 dark:to-amber-700 dark:hover:from-amber-700 dark:hover:to-amber-800 text-white rounded-full px-4 xl:px-6 py-2 text-sm xl:text-base transition-all duration-300 transform hover:scale-105 hover:rotate-1 shadow-lg hover:shadow-xl">
                Pay Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300 hover:scale-110 touch-manipulation"
              onClick={(e) => {
                e.stopPropagation()
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-amber-600" /> : <Menu className="h-6 w-6 text-amber-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden bg-amber-50/95 dark:bg-amber-900/95 backdrop-blur-xl border-t border-amber-200 dark:border-amber-700/30 rounded-b-2xl shadow-xl transform animate-slideInLeft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {/* Services Dropdown for Mobile */}
              <div className="space-y-2">
                <div className="px-3 py-2 text-amber-700 dark:text-amber-400 font-medium">Services</div>
                <div className="pl-6 space-y-1">
                  <Link
                    href="/services/tutoring"
                    className="block px-3 py-2 text-sm text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Subject Tutoring
                  </Link>
                  <Link
                    href="/services/language"
                    className="block px-3 py-2 text-sm text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Language Learning
                  </Link>
                  <Link
                    href="/services/assessments"
                    className="block px-3 py-2 text-sm text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Holiday Assessments
                  </Link>
                  <Link
                    href="/services/examinations"
                    className="block px-3 py-2 text-sm text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Online Examinations
                  </Link>
                  <Link
                    href="/services/exam-assistance"
                    className="block px-3 py-2 text-sm text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Exam Assistance
                  </Link>
                  <Link
                    href="/services/projects"
                    className="block px-3 py-2 text-sm text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Final Year Projects
                  </Link>
                  <Link
                    href="/services/web-design"
                    className="block px-3 py-2 text-sm text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Web Design
                  </Link>
                </div>
              </div>

              <Link
                href="/about"
                className="block px-3 py-2 text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/resources"
                className="block px-3 py-2 text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-3 py-4">
                <Link href="/payment">
                  <Button
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full transform hover:scale-105 transition-all duration-300 py-3 text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pay Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
