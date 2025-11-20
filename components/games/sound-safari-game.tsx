'use client'

import { useState, useEffect } from 'react'

interface UserProfile {
  userType: 'child' | 'parent'
  languages: string[]
  age?: number
  disorders: string[]
  completedAssessment: boolean
}

interface SoundSafariGameProps {
  userProfile: UserProfile
  onBack: () => void
  language?: 'english' | 'arabic'
}

const englishEnvironments = [
  {
    id: 'jungle',
    name: 'Jungle',
    emoji: '🌴',
    animals: [
      { name: 'Lion', sound: 'R', emoji: '🦁' },
      { name: 'Snake', sound: 'S', emoji: '🐍' },
      { name: 'Parrot', sound: 'AE', emoji: '🦜' },
    ],
  },
  {
    id: 'ocean',
    name: 'Ocean',
    emoji: '🌊',
    animals: [
      { name: 'Dolphin', sound: 'L', emoji: '🐬' },
      { name: 'Shark', sound: 'SH', emoji: '🦈' },
      { name: 'Whale', sound: 'W', emoji: '🐋' },
    ],
  },
]

const arabicEnvironments = [
  {
    id: 'jungle',
    name: 'الغابة (Jungle)',
    emoji: '🌴',
    animals: [
      { name: 'أسد', transliteration: 'asad', sound: 'س', emoji: '🦁' },
      { name: 'ثعبان', transliteration: 'thoʿban', sound: 'ث', emoji: '🐍' },
      { name: 'ببغاء', transliteration: 'babaghaʾ', sound: 'غ', emoji: '🦜' },
    ],
  },
  {
    id: 'ocean',
    name: 'المحيط (Ocean)',
    emoji: '🌊',
    animals: [
      { name: 'دولفين', transliteration: 'dolfeen', sound: 'د', emoji: '🐬' },
      { name: 'قرش', transliteration: 'qirsh', sound: 'ق', emoji: '🦈' },
      { name: 'حوت', transliteration: 'hoot', sound: 'ح', emoji: '🐋' },
    ],
  },
]

export default function SoundSafariGame({ userProfile, onBack, language = 'english' }: SoundSafariGameProps) {
  const [currentEnvIndex, setCurrentEnvIndex] = useState(0)
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [badges, setBadges] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [feedback, setFeedback] = useState('')

  const environments = language === 'arabic' ? arabicEnvironments : englishEnvironments
  const currentEnvironment = environments[currentEnvIndex]
  const currentAnimal = currentEnvironment.animals[currentAnimalIndex]

  const handleMicrophoneClick = async () => {
    setIsListening(true)
    setFeedback('Listening...')

    try {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.language = language === 'arabic' ? 'ar-SA' : 'en-US'
      recognition.start()

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase()
        const soundMatch =
          transcript.includes(currentAnimal.sound.toLowerCase()) ||
          transcript.includes(currentAnimal.name.toLowerCase())

        if (soundMatch) {
          setScore((s) => s + 10)
          setFeedback('Great job! 🎉')
          setBadges((prev) => [...new Set([...prev, currentAnimal.name])])

          setTimeout(() => {
            if (currentAnimalIndex < currentEnvironment.animals.length - 1) {
              setCurrentAnimalIndex(currentAnimalIndex + 1)
            } else if (currentEnvIndex < environments.length - 1) {
              setCurrentEnvIndex(currentEnvIndex + 1)
              setCurrentAnimalIndex(0)
            }
            setFeedback('')
            setIsListening(false)
          }, 1500)
        } else {
          setFeedback('Try again!')
          setIsListening(false)
        }
      }
    } catch (error) {
      setFeedback('Microphone not available')
      setIsListening(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/10 via-background to-accent/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-success to-success/80 text-foreground py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="text-2xl hover:scale-125 transition">←</button>
          <h1 className="text-2xl font-bold">Sound Safari</h1>
          <div className="text-2xl font-bold">{score}</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Environment Selector */}
        <div className="flex gap-4 mb-8">
          {environments.map((env, idx) => (
            <button
              key={env.id}
              onClick={() => {
                setCurrentEnvIndex(idx)
                setCurrentAnimalIndex(0)
              }}
              className={`p-4 rounded-lg font-bold transition-all ${
                currentEnvIndex === idx
                  ? 'bg-success text-foreground scale-105'
                  : 'bg-card border-2 border-border'
              }`}
            >
              <div className="text-3xl">{env.emoji}</div>
              <p className="text-sm mt-2">{env.name}</p>
            </button>
          ))}
        </div>

        {/* Main Game Area */}
        <div className="bg-card border-4 border-success rounded-3xl p-12 text-center space-y-8">
          <div className="text-6xl">{currentAnimal.emoji}</div>
          <h2 className="text-3xl font-bold">{currentAnimal.name}</h2>
          <p className="text-lg text-muted-foreground">Sound: {currentAnimal.sound}</p>

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
            <p className="text-xl font-bold text-primary">{feedback}</p>
          )}

          {/* Badges */}
          {badges.length > 0 && (
            <div className="mt-8 space-y-2">
              <p className="text-sm font-bold text-muted-foreground">UNLOCKED BADGES</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {badges.map((badge) => (
                  <span key={badge} className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
