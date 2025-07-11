"use client"

import React, { useState } from 'react';
import {
  Pen,
  Users,
  Download,
  Zap,
  Palette,
  Share2,
  Menu,
  X,
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Pen,
      title: "Intuitive Drawing",
      description: "Create beautiful diagrams and sketches with our easy-to-use drawing tools"
    },
    {
      icon: Users,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time, see changes instantly"
    },
    {
      icon: Download,
      title: "Export Anywhere",
      description: "Export your creations as PNG, SVG, or PDF with just one click"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed and performance, no lag even with complex drawings"
    },
    {
      icon: Palette,
      title: "Rich Styling",
      description: "Customize colors, fonts, and styles to match your creative vision"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your work with a simple link, no accounts required"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      content: "This tool has completely transformed how our team collaborates on design concepts. The real-time editing is seamless!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Software Engineer",
      content: "Perfect for technical diagrams and system architecture. Clean, fast, and exactly what we needed.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Project Manager",
      content: "Our brainstorming sessions are so much more productive now. Everyone can contribute visually in real-time.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Pen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ExceliDraw</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>

              {/* Sign In / Sign Up */}
              <a href="/signin" className="text-gray-700 hover:text-blue-600 font-medium">Sign In</a>
              <a href="/signup" className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#testimonials" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="/signin" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Sign In</a>
              <a href="/signup" className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Create, Collaborate, and
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Share Visually
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The ultimate drawing and diagramming tool for teams. Create beautiful sketches,
            flowcharts, and diagrams with real-time collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
