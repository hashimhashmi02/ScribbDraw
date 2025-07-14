"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Pen,
  Users,
  Download,
  Zap,
  Palette,
  Share2,
  Menu,
  X,
  Github,
  Twitter,
  Mail,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { 
      icon: Pen, 
      title: "Intuitive Drawing", 
      description: "Create beautiful diagrams and sketches with our advanced drawing tools",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Users, 
      title: "Live Collaboration", 
      description: "Work together seamlessly with real-time multiplayer editing",
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      icon: Download, 
      title: "Export Anywhere", 
      description: "Export to PNG, SVG, or PDF with professional quality",
      gradient: "from-green-500 to-teal-500"
    },
    { 
      icon: Zap, 
      title: "Lightning Fast", 
      description: "Experience zero lag even with the most complex diagrams",
      gradient: "from-yellow-500 to-orange-500"
    },
    { 
      icon: Palette, 
      title: "Custom Styles", 
      description: "Personalize with unlimited colors, fonts, and stroke styles",
      gradient: "from-red-500 to-rose-500"
    },
    { 
      icon: Share2, 
      title: "Instant Sharing", 
      description: "Share your work with a simple link - no account required",
      gradient: "from-indigo-500 to-blue-500"
    },
  ];

  const testimonials = [
    {
      name: "Aarushi Bandhu",
      role: "Product Designer",
      company: "TechFlow",
      content: "ScribDraw has revolutionized our design process. The real-time collaboration feels magical!",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Aaquib Ansari",
      role: "Software Engineer",
      company: "BuildRight",
      content: "Perfect for creating system architecture diagrams. Clean, fast, and incredibly intuitive.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Mohid Hashmi",
      role: "Project Manager",
      company: "InnovateLab",
      content: "Our brainstorming sessions are 10x more productive. Everyone can contribute visually.",
      rating: 5,
      avatar: "EJ"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
     
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-white/20' 
          : 'bg-white/80 backdrop-blur-sm'
      } text-sm`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <Pen className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-2 h-2 text-yellow-500 animate-pulse" />
              </div>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              ScribDraw
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Features
            </a>
            <a href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Testimonials
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Pricing
            </a>
            <Link href="/signin" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>
          
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
       
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200 px-6 py-4 space-y-4">
            <a href="#features" className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <Link href="/signin" className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-center text-sm font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

    
      <section className="pt-24 pb-20 px-6 relative overflow-hidden">
       
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 border border-blue-200/50">
            <Sparkles className="w-3 h-3 mr-2" />
            The future of visual collaboration is here
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-black">Create, Collaborate &</span>{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
              Share Visually
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            The ultimate whiteboarding experience for modern teams. Create stunning diagrams, 
            collaborate in real-time, and bring your ideas to life.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
            <Link
              href="/signup"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Start Creating Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="#pricing"
              className="group bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-lg font-semibold text-sm hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200/50"
            >
              View Pricing
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
         
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 mb-1">5k+</div>
              <div className="text-sm text-gray-600">Diagrams Created</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 mb-1">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Every Team
              </span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, collaborate, and share your visual ideas with the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, gradient }, i) => (
              <div
                key={i}
                className="group p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100/50"
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Loved by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
            <p className="text-base text-gray-600">
              See what our users have to say about their ScribDraw experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100/50"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-xs text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Simple{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-base text-gray-600">
              Start for free, no need to spend that '₹' rupee.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Free Forever</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">$0</span>
                  <span className="text-sm text-gray-600 ml-2">forever</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {[
                  "Unlimited whiteboards",
                  "Solo workspace",
                  "All drawing tools",
                  "Basic export options",
                  "Community support"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href="/signup"
                className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Creating Now
              </Link>
            </div>
          </div>
        </div>
      </section>

  
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Pen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">ScribDraw</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/hashimhashmi02"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-1 text-sm text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/Hashim_dev?t=HHV4cYwj4crzDLEvXL7g1A&s=08"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-1 text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Twitter</span>
              </a>
              <a
                href="mailto: hashimhashmi86@gmail.com"
                className="group flex items-center space-x-1 text-sm text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>hashimhashmi86@gmail.com</span>
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-4 text-center">
            <p className="text-sm text-gray-400">
              Created with ❤️ by{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                #im
              </span>
            </p>
            <p className="text-gray-500 text-xs mt-1">
              © 2025 ScribDraw. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}