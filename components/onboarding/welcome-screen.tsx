'use client'

import { ArrowRight, LogIn } from 'lucide-react'

interface WelcomeScreenProps {
  onContinue: () => void
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6FBF8] via-white to-[#FFF4ED] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-10 animate-slide-up">
        {/* Logo and Brand */}
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/chatter-fox.png"
                alt="Fox Talks Logo"
                className="w-64 h-64 object-contain drop-shadow-lg"
                onError={(e) => {
                  // Fallback if logo doesn't exist yet
                  e.currentTarget.style.display = 'none'
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement
                  if (fallback) fallback.style.display = 'flex'
                }}
              />
              {/* Fallback logo if image doesn't exist */}
              <div className="hidden w-32 h-32 rounded-3xl bg-gradient-to-br from-[#FF6B35] to-[#2A9896] shadow-2xl items-center justify-center">
                <span className="text-white font-bold text-3xl">CF</span>
              </div>
            </div>
          </div>
          
          {/* App Name */}
          <div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-[#FF6B35] via-[#EE8B44] to-[#2A9896] bg-clip-text text-transparent mb-2">
              Fox Talks
            </h1>
            <p className="text-lg text-[#152341] font-medium">
              Build confidence through speech practice
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-[#FF6B35] to-[#EE8B44] text-white py-5 px-6 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
          >
            <span>Get Started</span>
          </button>

          <button
            onClick={onContinue}
            className="w-full bg-white border-3 border-[#2A9896] text-[#2A9896] py-5 px-6 rounded-2xl font-bold text-lg hover:bg-[#2A9896] hover:text-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 shadow-md"
            style={{ borderWidth: '3px' }}
          >
            <span>Already have an Acoount</span>
          </button>
        </div>
      </div>
    </div>
  )
}
