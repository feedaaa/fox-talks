'use client'

import { useState, useEffect } from 'react'

interface UserProfile {
  userType: 'child' | 'parent'
  languages: string[]
  age?: number
  disorders: string[]
  completedAssessment: boolean
}

interface TurtleTalkAdventureProps {
  userProfile: UserProfile
  onBack: () => void
  language?: 'english' | 'arabic'
}

export default function TurtleTalkAdventure({ userProfile, onBack, language = 'english' }: TurtleTalkAdventureProps) {
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [turtlePosition, setTurtlePosition] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [speechRate, setSpeechRate] = useState(0)
  const [feedback, setFeedback] = useState('')

  const englishPhrases = [
    'Hello friend',
    'The weather is nice today',
    'I like to play in the garden',
    'Can you help me find the lettuce',
  ]

  const arabicPhrases = [
    'مرحبا يا صديقي',
    'الطقس جميل اليوم',
    'أحب اللعب في الحديقة',
    'هل يمكنك مساعدتي في إيجاد الخس',
  ]

  const phrases = language === 'arabic' ? arabicPhrases : englishPhrases
  const targetPhrase = phrases[Math.min(level - 1, phrases.length - 1)]

  const handleMicrophoneClick = async () => {
    setIsListening(true)
    setFeedback('Listening for slow, smooth speech...')

    try {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.language = language === 'arabic' ? 'ar-SA' : 'en-US'
      recognition.start()

      const startTime = Date.now()

      recognition.onresult = (event: any) => {
        const endTime = Date.now()
        const duration = (endTime - startTime) / 1000
        const words = event.results[0][0].transcript.split(' ').length
        const wordsPerSecond = words / duration

        setSpeechRate(wordsPerSecond)

        // Slower speech (< 2 words per second) is better for fluency
        if (wordsPerSecond < 2.5) {
          const newPosition = Math.min(turtlePosition + 20, 100)
          setTurtlePosition(newPosition)
          setScore((s) => s + 15)
          setFeedback('Perfect pace! 🐢')

          if (newPosition === 100) {
            setFeedback('Level Complete! 🎉')
            setTimeout(() => {
              setLevel(level + 1)
              setTurtlePosition(0)
            }, 1500)
          }
        } else {
          setFeedback('Slow down! Speak more smoothly.')
        }

        setIsListening(false)
      }
    } catch (error) {
      setFeedback('Microphone not available')
      setIsListening(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-primary/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-accent/80 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="text-2xl hover:scale-125 transition">←</button>
          <h1 className="text-2xl font-bold">Turtle Talk Adventure</h1>
          <div className="text-2xl font-bold">{score}</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Level Info */}
        <div className="bg-card border-2 border-accent rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">LEVEL {level}</p>
          <p className="text-lg font-semibold">{targetPhrase}</p>
        </div>

        {/* Game Area */}
        <div className="bg-gradient-to-b from-green-100 to-green-50 rounded-3xl p-12 space-y-8 border-4 border-green-400">
          {/* Garden Scene */}
          <div className="relative h-32 bg-white rounded-lg border-4 border-green-300 overflow-hidden">
            {/* Lettuce */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-5xl">🥬</div>

            {/* Turtle */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300"
              style={{ left: `${turtlePosition}%` }}
            >
              <div className="text-5xl">🐢</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <p className="text-sm font-bold">Progress to Lettuce</p>
            <div className="w-full bg-white rounded-full h-3 border-2 border-green-400">
              <div
                className="h-3 bg-gradient-to-r from-accent to-pink-500 rounded-full transition-all"
                style={{ width: `${turtlePosition}%` }}
              ></div>
            </div>
          </div>

          {/* Speech Rate Meter */}
          {speechRate > 0 && (
            <div className="bg-white rounded-lg p-4 text-center border-2 border-green-300">
              <p className="text-sm text-muted-foreground">Speech Rate</p>
              <p className="text-2xl font-bold text-primary">{speechRate.toFixed(1)} words/sec</p>
              <p className="text-xs text-muted-foreground mt-1">
                {speechRate < 2.5 ? '✅ Good pace!' : '⚠️ Too fast!'}
              </p>
            </div>
          )}

          {/* Microphone Button */}
          <button
            onClick={handleMicrophoneClick}
            disabled={isListening}
            className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold transition-all ${
              isListening
                ? 'bg-red-500 text-white scale-110 animate-pulse'
                : 'bg-primary text-white hover:scale-110'
            }`}
          >
            🎤
          </button>

          {feedback && (
            <p className="text-xl font-bold text-center text-primary">{feedback}</p>
          )}
        </div>
      </div>
    </div>
  )
}
