"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle authentication
    // For now, we'll just navigate to the home page
    router.push('/home')
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[600px] flex rounded-2xl overflow-hidden shadow-2xl">
        {/* Left panel with blue gradient and geometric design */}
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

          {/* Large geometric shapes matching the design */}
          <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
            {/* Large O shape in the center-left */}
            <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 group-hover:rotate-12 group-hover:scale-110">
              <div className="w-80 h-80 rounded-full border-[60px] border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-1000 group-hover:animate-pulse"></div>
            </div>

            {/* Additional geometric elements */}
            <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full transition-all duration-1000 group-hover:bg-blue-400/40 group-hover:scale-125 group-hover:-translate-y-4"></div>
            <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-blue-400/15 rounded-full transition-all duration-1000 group-hover:bg-blue-300/30 group-hover:scale-90 group-hover:translate-x-8"></div>

            {/* Angular shapes */}
            <div className="absolute top-1/4 left-1/2 w-32 h-32 bg-blue-500/25 transform rotate-45 transition-all duration-1000 group-hover:rotate-180 group-hover:bg-blue-400/40 group-hover:scale-110"></div>
            <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-blue-400/20 transform rotate-12 transition-all duration-1000 group-hover:rotate-45 group-hover:bg-blue-300/35 group-hover:translate-y-6"></div>

            {/* Floating particles effect */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-white/30 rounded-full transition-all duration-1000 group-hover:scale-150 group-hover:translate-y-12 group-hover:translate-x-8"></div>
            <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-white/40 rounded-full transition-all duration-1000 group-hover:scale-200 group-hover:-translate-y-8 group-hover:-translate-x-4"></div>
            <div className="absolute bottom-1/2 left-1/2 w-4 h-4 bg-white/20 rounded-full transition-all duration-1000 group-hover:scale-125 group-hover:translate-x-12"></div>
          </div>
        </div>

        {/* Right panel with login form */}
        <div className="w-full md:w-2/5 bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="md:hidden flex items-center mb-8">
            <Image src="/images/logo.png" alt="Oliggo Logo" width={36} height={36} className="mr-2" />
            <span className="text-blue-600 text-2xl font-medium">Oliggo</span>
          </div>

          <h1 className="text-3xl font-semibold text-center mb-10 text-gray-800">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="Type email here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password*
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Type password here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                <Checkbox id="stay-signed-in" />
                <Label htmlFor="stay-signed-in" className="ml-2 text-sm text-gray-600">
                  Stay signed in
                </Label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
