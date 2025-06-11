"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Download, Video, FileText, Search, Calendar, ArrowRight, Play, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AnimatedButton } from "@/components/ui/animated-button"
import { useState } from "react"

export default function ResourcesPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const VideoModal = ({ videoUrl, onClose }: { videoUrl: string; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Educational Video</h3>
          <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </Button>
        </div>
        <div className="aspect-video">
          <iframe
            src={videoUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-thin text-gray-900 dark:text-gray-100 mb-6 transition-colors duration-300">Learning Resources</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-8 transition-colors duration-300">
              Access our comprehensive library of educational materials, study guides, practice tests, and learning
              tools designed to support your academic journey.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search resources..."
                className="pl-12 pr-4 py-3 rounded-full border-gray-200 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Study Guides",
                count: "150+ guides",
                description: "Comprehensive study materials for all subjects",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Video className="h-8 w-8" />,
                title: "Video Tutorials",
                count: "300+ videos",
                description: "Interactive video lessons and explanations",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <FileText className="h-8 w-8" />,
                title: "Practice Tests",
                count: "200+ tests",
                description: "Mock exams and practice questions",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: <Download className="h-8 w-8" />,
                title: "Downloads",
                count: "500+ files",
                description: "Worksheets, templates, and reference materials",
                color: "from-orange-500 to-red-500",
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="border-0 bg-gray-50 rounded-3xl hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-blue-600 font-medium mb-3">{category.count}</p>
                  <p className="text-gray-600 leading-relaxed">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 dark:text-gray-100 mb-6 transition-colors duration-300">Featured Resources</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light transition-colors duration-300">
              Our most popular and highly-rated educational materials.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                type: "Study Guide",
                title: "Advanced Mathematics for A-Level",
                description: "Comprehensive guide covering calculus, algebra, and statistics with worked examples.",
                downloads: "2.5K",
                rating: "4.9",
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop&crop=center",
                isVideo: false,
              },
              {
                type: "Video Series",
                title: "English Literature Analysis",
                description: "In-depth analysis of classic literature with expert commentary and insights.",
                downloads: "1.8K",
                rating: "4.8",
                image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&crop=center",
                isVideo: true,
                videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
                duration: "45:30",
              },
              {
                type: "Practice Test",
                title: "UNEB Physics Mock Exam",
                description: "Complete mock examination with detailed solutions and marking scheme.",
                downloads: "3.2K",
                rating: "4.9",
                image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop&crop=center",
                isVideo: false,
              },
              {
                type: "Worksheet",
                title: "Chemistry Lab Experiments",
                description: "Step-by-step laboratory procedures with safety guidelines and observations.",
                downloads: "1.5K",
                rating: "4.7",
                image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop&crop=center",
                isVideo: false,
              },
              {
                type: "Reference",
                title: "History Timeline Uganda",
                description: "Comprehensive timeline of Uganda's history from pre-colonial to modern times.",
                downloads: "2.1K",
                rating: "4.8",
                image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=250&fit=crop&crop=center",
                isVideo: false,
              },
              {
                type: "Tutorial",
                title: "Programming Fundamentals",
                description: "Learn programming basics with Python through interactive examples and exercises.",
                downloads: "2.8K",
                rating: "4.9",
                image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=250&fit=crop&crop=center",
                isVideo: true,
                videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
                duration: "1:20:15",
              },
            ].map((resource, index) => (
              <Card
                key={index}
                className="border-0 bg-white dark:bg-gray-700 rounded-3xl shadow-lg hover:shadow-xl dark:hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => {
                  if (resource.isVideo && resource.videoUrl) {
                    setSelectedVideo(resource.videoUrl)
                  }
                }}
              >
                <div className="relative">
                  <Image
                    src={resource.image || "/placeholder.svg"}
                    alt={resource.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Video Play Button Overlay */}
                  {resource.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="h-6 w-6 text-blue-600 ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Video Duration Badge */}
                  {resource.isVideo && resource.duration && (
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                        {resource.duration}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      resource.isVideo
                        ? 'bg-red-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}>
                      {resource.type}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">{resource.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">{resource.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{resource.downloads} downloads</span>
                      <span className="text-sm text-yellow-500 dark:text-yellow-400 transition-colors duration-300">★ {resource.rating}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-full transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (resource.isVideo && resource.videoUrl) {
                        setSelectedVideo(resource.videoUrl)
                      }
                    }}
                  >
                    {resource.isVideo ? (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Watch Video
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download Resource
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Video Library */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Video Library</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Access our comprehensive collection of educational videos covering all subjects and grade levels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                title: "Advanced Calculus Explained",
                subject: "Mathematics",
                duration: "32:15",
                views: "15.2K",
                thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop&crop=center",
                videoUrl: "https://www.youtube.com/embed/WUvTyaaNkzM",
              },
              {
                title: "Organic Chemistry Basics",
                subject: "Chemistry",
                duration: "28:45",
                views: "12.8K",
                thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop&crop=center",
                videoUrl: "https://www.youtube.com/embed/GOK1tKFFIQI",
              },
              {
                title: "Physics: Laws of Motion",
                subject: "Physics",
                duration: "41:20",
                views: "18.5K",
                thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&h=200&fit=crop&crop=center",
                videoUrl: "https://www.youtube.com/embed/kKKM8Y-u7ds",
              },
              {
                title: "Essay Writing Techniques",
                subject: "English",
                duration: "25:10",
                views: "9.7K",
                thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop&crop=center",
                videoUrl: "https://www.youtube.com/embed/ziE3kTdc2r8",
              },
              {
                title: "World War II History",
                subject: "History",
                duration: "52:30",
                views: "22.1K",
                thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=300&h=200&fit=crop&crop=center",
                videoUrl: "https://www.youtube.com/embed/Q78COTwT7nE",
              },
              {
                title: "Python Programming Intro",
                subject: "Computer Science",
                duration: "1:15:45",
                views: "31.4K",
                thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=200&fit=crop&crop=center",
                videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
              },
              {
                title: "Biology: Cell Structure",
                subject: "Biology",
                duration: "35:20",
                views: "14.6K",
                thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&crop=center",
                videoUrl: "https://www.youtube.com/embed/URUJD5NEXC8",
              },
              {
                title: "Geography: Climate Change",
                subject: "Geography",
                duration: "38:15",
                views: "11.3K",
                thumbnail: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=300&h=200&fit=crop&crop=center",
                videoUrl: "https://www.youtube.com/embed/dcBrI_KwBdE",
              },
            ].map((video, index) => (
              <Card
                key={index}
                className="border-0 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedVideo(video.videoUrl)}
              >
                <div className="relative">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-5 w-5 text-red-600 ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2">
                    <span className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                      {video.duration}
                    </span>
                  </div>

                  {/* Subject Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {video.subject}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{video.views} views</span>
                    <span className="flex items-center">
                      <Video className="h-3 w-3 mr-1" />
                      HD
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 rounded-full border-blue-300 hover:border-blue-400 hover:bg-blue-50"
            >
              View All Videos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">Latest Articles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Stay updated with the latest educational insights, study tips, and academic news.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "10 Effective Study Techniques for Better Retention",
                excerpt: "Discover proven methods to improve your memory and study more efficiently.",
                date: "March 15, 2024",
                readTime: "5 min read",
                category: "Study Tips",
              },
              {
                title: "Preparing for UNEB Examinations: A Complete Guide",
                excerpt: "Everything you need to know about preparing for Uganda's national examinations.",
                date: "March 12, 2024",
                readTime: "8 min read",
                category: "Exam Prep",
              },
              {
                title: "The Future of Online Learning in Uganda",
                excerpt: "How digital education is transforming the learning landscape in Uganda.",
                date: "March 10, 2024",
                readTime: "6 min read",
                category: "Education",
              },
            ].map((article, index) => (
              <Card
                key={index}
                className="border-0 bg-gray-50 rounded-3xl hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 rounded-full border-gray-300 hover:border-gray-400"
            >
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-3xl mx-auto font-light">
            Subscribe to our newsletter and get the latest educational resources, study tips, and updates delivered to
            your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/70"
                />
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 rounded-full">Subscribe</Button>
              </div>
              <Link href="/pricing">
                <AnimatedButton
                  variant="pulse"
                  size="lg"
                  className="bg-white/20 text-white hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg rounded-full backdrop-blur-sm group"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </AnimatedButton>
              </Link>
            </div>
            <p className="text-indigo-200 text-sm mt-4">No spam, unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  )
}
