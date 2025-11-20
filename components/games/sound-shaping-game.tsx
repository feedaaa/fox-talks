'use client'

import { useState } from 'react'

interface UserProfile {
  userType: 'child' | 'parent'
  languages: string[]
  age?: number
  disorders: string[]
  completedAssessment: boolean
}

interface SoundShapingGameProps {
  userProfile: UserProfile
  onBack: () => void
  language?: 'english' | 'arabic'
}

export default function SoundShapingGame({ userProfile, onBack, language = 'english' }: SoundShapingGameProps) {
  const [currentSound, setCurrentSound] = useState(0)
  const [completed, setCompleted] = useState(false)

  const englishSounds = [
    {
      id: 1,
      sound: '/s/',
      word: 'Sun',
      description: 'Position your tongue between your teeth, slightly forward',
      tips: ['Keep your lips slightly apart', 'Air flows through the small gap', 'Should sound like a gentle hissing'],
    },
    {
      id: 2,
      sound: '/sh/',
      word: 'Ship',
      description: 'Round your lips and position your tongue at the roof of your mouth',
      tips: ['Lips form an "O" shape', 'Tongue is further back', 'Sounds like a quiet shhhhh'],
    },
    {
      id: 3,
      sound: '/th/',
      word: 'Think',
      description: 'Place your tongue between your front teeth',
      tips: ['Tongue touches the front teeth', 'Let air flow around sides', 'Gentle and slow'],
    },
  ]

  const arabicSounds = [
    {
      id: 1,
      sound: 'ب',
      word: 'بابا (Baba)',
      description: 'Press your lips together, then release with voice',
      tips: ['Both lips meet completely', 'Similar to English "b"', 'Feel vibration in your lips'],
    },
    {
      id: 2,
      sound: 'ت',
      word: 'تفاحة (Tuffaha - Apple)',
      description: 'Touch tongue tip to back of upper teeth',
      tips: ['Tongue touches teeth, not gum ridge', 'Lighter than English "t"', 'Quick tap and release'],
    },
    {
      id: 3,
      sound: 'ث',
      word: 'ثعلب (Thaʿlab - Fox)',
      description: 'Place tongue between your teeth like English "th" in "think"',
      tips: ['Tongue slightly between teeth', 'Breathe air out gently', 'No voice - just air'],
    },
    {
      id: 4,
      sound: 'ح',
      word: 'حليب (Haleeb - Milk)',
      description: 'Strong breathy sound from deep in throat',
      tips: ['Deeper than English "h"', 'Feel it in your throat', 'More force than هـ'],
    },
    {
      id: 5,
      sound: 'ر',
      word: 'رمضان (Ramadan)',
      description: 'Lightly tap or roll your tongue',
      tips: ['Tongue taps gum ridge', 'Can be single tap or rolled', 'Practice makes perfect!'],
    },
    {
      id: 6,
      sound: 'ع',
      word: 'عصفور (ʿAsfoor - Bird)',
      description: 'Sound from deep in throat - unique to Arabic',
      tips: ['Tighten throat muscles', 'No equivalent in English', 'Practice with a teacher'],
    },
  ]

  const sounds = language === 'arabic' ? arabicSounds : englishSounds
  const current = sounds[currentSound]

  const handleNext = () => {
    if (currentSound < sounds.length - 1) {
      setCurrentSound(currentSound + 1)
    } else {
      setCompleted(true)
    }
  }

  const handlePrev = () => {
    if (currentSound > 0) {
      setCurrentSound(currentSound - 1)
    }
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 animate-float">
          <div className="text-6xl">🎉</div>
          <h1 className="text-3xl font-bold text-foreground">Great Job!</h1>
          <p className="text-muted-foreground">You completed Sound Shaping lesson!</p>
          <div className="bg-card p-6 rounded-xl border border-border">
            <p className="text-2xl font-bold text-accent">+50 Points</p>
            <p className="text-sm text-muted-foreground mt-2">Achievement: Sound Explorer Unlocked!</p>
          </div>
          <button
            onClick={onBack}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background pb-8">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-2xl hover:opacity-80">
          ←
        </button>
        <h1 className="text-xl font-bold">
          {language === 'arabic' ? 'تشكيل الأصوات - Sound Shaping' : 'Sound Shaping'}
        </h1>
        <span className="text-sm bg-primary-foreground/20 px-3 py-1 rounded-full">
          {currentSound + 1}/{sounds.length}
        </span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Visual Mouth Animation */}
        <div className="bg-card p-8 rounded-xl border-2 border-primary mb-8 text-center">
          <div className="text-7xl mb-4 animate-bounce">{current.id === 1 ? '👅' : current.id === 2 ? '👄' : '👃'}</div>
          <p className="text-3xl font-bold text-primary mb-4" dir={language === 'arabic' ? 'rtl' : 'ltr'}>
            {current.sound}
          </p>
          <p className="text-lg font-semibold text-foreground mb-2" dir={language === 'arabic' ? 'rtl' : 'ltr'}>
            {current.word}
          </p>
          <p className="text-muted-foreground">{current.description}</p>
        </div>

        {/* Tips */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-bold text-foreground">Tips for Success:</h3>
          {current.tips.map((tip, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-accent/10 rounded-lg border border-accent/30">
              <span className="text-accent font-bold">✓</span>
              <p className="text-foreground">{tip}</p>
            </div>
          ))}
        </div>

        {/* Interactive Recording Simulation */}
        <div className="bg-card p-6 rounded-xl border border-border mb-8 text-center">
          <button className="bg-red-500 text-white rounded-full p-6 mx-auto mb-4 hover:bg-red-600 transition-colors shadow-lg">
            <span className="text-3xl">🎤</span>
          </button>
          <p className="text-foreground font-semibold">Record Your Sound</p>
          <p className="text-xs text-muted-foreground mt-1">Tap to listen to the example, then try to repeat it</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${((currentSound + 1) / sounds.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currentSound === 0}
            className="flex-1 bg-muted text-foreground py-3 rounded-lg font-semibold hover:bg-muted/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {currentSound === sounds.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
