'use client'

import { useState } from 'react'

interface UserProfile {
  userType: 'child' | 'parent'
  languages: string[]
  age?: number
  disorders: string[]
  completedAssessment: boolean
}

interface WordChallengeGameProps {
  userProfile: UserProfile
  onBack: () => void
  language?: 'english' | 'arabic'
}

export default function WordChallengeGame({ userProfile, onBack, language = 'english' }: WordChallengeGameProps) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [accuracy, setAccuracy] = useState<number[]>([])

  const englishWords = [
    { word: 'Apple', syllables: 'AP-PUL', difficulty: 'easy' },
    { word: 'Butterfly', syllables: 'BUT-TER-FLY', difficulty: 'medium' },
    { word: 'Elephant', syllables: 'EL-E-FUNT', difficulty: 'medium' },
    { word: 'Refrigerator', syllables: 'REE-FRIJ-ER-AY-TER', difficulty: 'hard' },
    { word: 'Dinosaur', syllables: 'DYE-NO-SOR', difficulty: 'medium' },
  ]

  const arabicWords = [
    { word: 'تفاحة', transliteration: 'tuffaha', syllables: 'تُـ-فَّـ-حَة', difficulty: 'easy', meaning: 'Apple' },
    { word: 'فراشة', transliteration: 'farasha', syllables: 'فَـ-رَا-شَة', difficulty: 'medium', meaning: 'Butterfly' },
    { word: 'فيل', transliteration: 'feel', syllables: 'فِيـل', difficulty: 'easy', meaning: 'Elephant' },
    { word: 'ثلاجة', transliteration: 'thallaja', syllables: 'ثَـ-لَّا-جَة', difficulty: 'medium', meaning: 'Refrigerator' },
    { word: 'ديناصور', transliteration: 'deenasoor', syllables: 'دِي-نَا-صُور', difficulty: 'hard', meaning: 'Dinosaur' },
    { word: 'حاسوب', transliteration: 'hasoob', syllables: 'حَا-سُوب', difficulty: 'medium', meaning: 'Computer' },
  ]

  const words = language === 'arabic' ? arabicWords : englishWords
  const current = words[currentWordIdx]

  const handleRecordSimulation = (simulatedAccuracy: number) => {
    setAccuracy([...accuracy, simulatedAccuracy])
    
    if (currentWordIdx < words.length - 1) {
      setCurrentWordIdx(currentWordIdx + 1)
    } else {
      setCompleted(true)
    }
  }

  const handleSkip = () => {
    if (currentWordIdx < words.length - 1) {
      setCurrentWordIdx(currentWordIdx + 1)
    } else {
      setCompleted(true)
    }
  }

  const averageAccuracy = accuracy.length > 0
    ? Math.round(accuracy.reduce((a, b) => a + b, 0) / accuracy.length)
    : 0

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/5 to-background flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 animate-float">
          <div className="text-center space-y-4">
            <div className="text-6xl">🏆</div>
            <h1 className="text-3xl font-bold text-foreground">Excellent Work!</h1>
            <p className="text-muted-foreground">You completed Word Challenge!</p>
          </div>

          <div className="bg-card p-6 rounded-xl border-2 border-accent space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Average Accuracy</p>
              <p className="text-4xl font-bold text-accent">{averageAccuracy}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Words Practiced</p>
              <p className="text-2xl font-bold text-foreground">{words.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Points Earned</p>
              <p className="text-2xl font-bold text-primary">+75 ⭐</p>
            </div>
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
    <div className="min-h-screen bg-gradient-to-br from-accent/5 to-background pb-8">
      {/* Header */}
      <div className="bg-accent text-accent-foreground p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-2xl hover:opacity-80">
          ←
        </button>
        <h1 className="text-xl font-bold">Word Challenge</h1>
        <span className="text-sm bg-accent-foreground/20 px-3 py-1 rounded-full">
          {currentWordIdx + 1}/{words.length}
        </span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Word Display */}
        <div className="bg-card p-8 rounded-xl border-2 border-accent mb-8 text-center">
          <p className="text-muted-foreground text-sm mb-4">Repeat this word:</p>
          <p className="text-5xl font-bold text-foreground mb-4">{current.word}</p>
          <div className="bg-accent/10 p-4 rounded-lg inline-block">
            <p className="text-sm text-accent font-semibold">{current.syllables}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-4 capitalize">
            Difficulty: {current.difficulty}
          </p>
        </div>

        {/* Recording Interface */}
        <div className="bg-card p-8 rounded-xl border border-border mb-8 text-center space-y-4">
          <div className="space-y-3">
            <p className="text-foreground font-semibold">Listen & Repeat</p>
            <button className="bg-primary text-primary-foreground rounded-full p-6 mx-auto hover:bg-primary/90 transition-colors shadow-lg">
              <span className="text-3xl">🔊</span>
            </button>
            <p className="text-sm text-muted-foreground">Tap to hear the word</p>
          </div>

          <div className="h-px bg-border my-4"></div>

          <div className="space-y-3">
            <p className="text-foreground font-semibold">Now Your Turn</p>
            <button className="bg-red-500 text-white rounded-full p-6 mx-auto hover:bg-red-600 transition-colors shadow-lg">
              <span className="text-3xl">🎤</span>
            </button>
            <p className="text-sm text-muted-foreground">Tap to record</p>
          </div>
        </div>

        {/* Accuracy Simulation Buttons */}
        <div className="space-y-4 mb-8">
          <p className="text-center text-sm text-muted-foreground font-semibold">How did you do? (Demo)</p>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleRecordSimulation(65)}
              className="p-3 bg-orange-100 text-orange-900 rounded-lg font-semibold hover:bg-orange-200 transition-colors"
            >
              <span className="text-sm">Almost 65%</span>
            </button>
            <button
              onClick={() => handleRecordSimulation(85)}
              className="p-3 bg-yellow-100 text-yellow-900 rounded-lg font-semibold hover:bg-yellow-200 transition-colors"
            >
              <span className="text-sm">Good 85%</span>
            </button>
            <button
              onClick={() => handleRecordSimulation(95)}
              className="p-3 bg-green-100 text-green-900 rounded-lg font-semibold hover:bg-green-200 transition-colors"
            >
              <span className="text-sm">Perfect 95%</span>
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-accent h-3 rounded-full transition-all"
              style={{ width: `${((currentWordIdx + 1) / words.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="w-full bg-muted text-foreground py-3 rounded-lg font-semibold hover:bg-muted/80 transition-colors"
        >
          Skip Word
        </button>
      </div>
    </div>
  )
}
