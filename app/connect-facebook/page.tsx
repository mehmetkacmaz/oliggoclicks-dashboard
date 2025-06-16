"use client"

import Image from "next/image"
import { Facebook, ChevronDown, User, Settings, LogOut } from "lucide-react"
import { useState } from "react"

export default function ConnectFacebookPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <div className="min-h-screen w-full bg-gray-50 relative">
      {/* Integrated Header */}
      <div className="w-full bg-white shadow-sm px-6 py-4 flex justify-end">
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/images/profile.png"
                alt="John Tristan Ward"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-800 font-medium hidden sm:block">John Tristan Ward</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/images/profile.png"
                      alt="John Tristan Ward"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">John Tristan Ward</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <hr className="my-2 border-gray-100" />
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-red-600">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - remove the min-h-[calc(100vh-80px)] and make it full height */}
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-6xl h-[600px] flex rounded-2xl overflow-hidden shadow-2xl">
          {/* Left panel with blue gradient and Facebook animation */}
          <div className="hidden md:block w-3/5 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden group cursor-pointer transition-all duration-700 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
            <div className="absolute top-8 left-8 flex items-center z-10 transition-all duration-500 group-hover:scale-110 group-hover:translate-x-2">
              <Image
                src="/images/logo.png"
                alt="Oliggo Logo"
                width={40}
                height={40}
                className="mr-3 transition-transform duration-500 group-hover:rotate-12"
              />
              <span className="text-white text-3xl font-medium transition-all duration-500 group-hover:text-blue-100">
                Oliggo
              </span>
            </div>

            {/* Facebook-themed geometric shapes */}
            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
              {/* Large O shape in the center-left */}
              <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 group-hover:rotate-12 group-hover:scale-110">
                <div className="w-80 h-80 rounded-full border-[60px] border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-1000 group-hover:animate-pulse"></div>
              </div>

              {/* Facebook "f" letter animation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 group-hover:scale-150 group-hover:rotate-6">
                <div className="text-white/20 text-9xl font-bold transition-all duration-1000 group-hover:text-white/40">
                  f
                </div>
              </div>

              {/* Facebook connection nodes */}
              <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-blue-400/30 rounded-full transition-all duration-1000 group-hover:bg-blue-300/60 group-hover:scale-150 group-hover:-translate-y-4">
                <div className="w-full h-full rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all duration-1000"></div>
              </div>

              <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-blue-300/25 rounded-full transition-all duration-1000 group-hover:bg-blue-200/50 group-hover:scale-125 group-hover:translate-x-8">
                <div className="w-full h-full rounded-full border-2 border-white/25 group-hover:border-white/50 transition-all duration-1000"></div>
              </div>

              <div className="absolute top-1/4 left-2/3 w-4 h-4 bg-blue-400/35 rounded-full transition-all duration-1000 group-hover:bg-blue-300/70 group-hover:scale-200 group-hover:translate-y-6">
                <div className="w-full h-full rounded-full border-2 border-white/35 group-hover:border-white/70 transition-all duration-1000"></div>
              </div>

              {/* Connection lines */}
              <div className="absolute top-1/3 left-1/2 w-32 h-0.5 bg-white/20 transform rotate-45 transition-all duration-1000 group-hover:bg-white/40 group-hover:scale-110"></div>
              <div className="absolute bottom-1/3 left-1/3 w-24 h-0.5 bg-white/15 transform -rotate-12 transition-all duration-1000 group-hover:bg-white/30 group-hover:scale-125"></div>

              {/* Floating social icons */}
              <div className="absolute top-1/4 right-1/3 transition-all duration-1000 group-hover:translate-y-4 group-hover:scale-110">
                <Facebook className="w-6 h-6 text-white/30 group-hover:text-white/60 transition-all duration-1000" />
              </div>

              {/* Pulsing dots for network effect */}
              <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-white/40 rounded-full transition-all duration-1000 group-hover:scale-300 group-hover:animate-ping"></div>
              <div className="absolute bottom-1/2 left-1/2 w-3 h-3 bg-white/30 rounded-full transition-all duration-1000 group-hover:scale-200 group-hover:animate-pulse"></div>
            </div>
          </div>

          {/* Right panel with Facebook connection form */}
          <div className="w-full md:w-2/5 bg-white p-8 md:p-12 flex flex-col justify-center">
            <div className="md:hidden flex items-center mb-8">
              <Image src="/images/logo.png" alt="Oliggo Logo" width={36} height={36} className="mr-2" />
              <span className="text-blue-600 text-2xl font-medium">Oliggo</span>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold mb-4 text-gray-800">Sign in to Facebook Ads</h1>
              <p className="text-gray-600 text-lg">Connect to your facebook account</p>
            </div>

            <div className="space-y-6">
              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition duration-200 text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <Facebook className="w-6 h-6" />
                <span>Sign In with Facebook</span>
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  By connecting, you agree to our terms of service and privacy policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
