'use client'

import { useState } from 'react'

interface UserProfile {
  userType: 'child' | 'parent'
  languages: string[]
  age?: number
  disorders: string[]
  completedAssessment: boolean
}

interface WordExplorerQuestProps {
  userProfile: UserProfile
  onBack: () => void
  language?: 'english' | 'arabic'
}

const englishWorlds = [
  {
    id: 'farm',
    name: 'Farm',
    emoji: '🚜',
    words: [
      { word: 'cow', emoji: '🐄' },
      { word: 'pig', emoji: '🐷' },
      { word: 'horse', emoji: '🐴' },
      { word: 'chicken', emoji: '🐔' },
    ],
  },
  {
    id: 'city',
    name: 'City',
    emoji: '🏙️',
    words: [
      { word: 'car', emoji: '🚗' },
      { word: 'bus', emoji: '🚌' },
      { word: 'building', emoji: '🏢' },
      { word: 'tree', emoji: '🌳' },
    ],
  },
  {
    id: 'ocean',
    name: 'Ocean',
    emoji: '🌊',
    words: [
      { word: 'fish', emoji: '🐠' },
      { word: 'crab', emoji: '🦀' },
      { word: 'starfish', emoji: '⭐' },
      { word: 'coral', emoji: '🪸' },
    ],
  },
]

const arabicWorlds = [
  {
    id: 'farm',
    name: 'المزرعة (Farm)',
    emoji: '🚜',
    words: [
      { word: 'بقرة', transliteration: 'baqara', meaning: 'cow', emoji: '🐄' },
      { word: 'خروف', transliteration: 'kharoof', meaning: 'sheep', emoji: '🐑' },
      { word: 'حصان', transliteration: 'hisaan', meaning: 'horse', emoji: '🐴' },
      { word: 'دجاجة', transliteration: 'dajaaja', meaning: 'chicken', emoji: '🐔' },
    ],
  },
  {
    id: 'nature',
    name: 'الطبيعة (Nature)',
    emoji: '🌳',
    words: [
      { word: 'شمس', transliteration: 'shams', meaning: 'sun', emoji: '☀️' },
      { word: 'قمر', transliteration: 'qamar', meaning: 'moon', emoji: '🌙' },
      { word: 'نجمة', transliteration: 'najma', meaning: 'star', emoji: '⭐' },
      { word: 'زهرة', transliteration: 'zahra', meaning: 'flower', emoji: '🌸' },
    ],
  },
  {
    id: 'food',
    name: 'الطعام (Food)',
    emoji: '🍎',
    words: [
      { word: 'تفاحة', transliteration: 'tuffaha', meaning: 'apple', emoji: '🍎' },
      { word: 'موز', transliteration: 'mawz', meaning: 'banana', emoji: '🍌' },
      { word: 'برتقال', transliteration: 'burtuqaal', meaning: 'orange', emoji: '🍊' },
      { word: 'ماء', transliteration: 'maaʾ', meaning: 'water', emoji: '💧' },
    ],
  },
]

export default function WordExplorerQuest({ userProfile, onBack, language = 'english' }: WordExplorerQuestProps) {
  const [currentWorldIdx, setCurrentWorldIdx] = useState(0)
  const [collectedWords, setCollectedWords] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [feedback, setFeedback] = useState('')

  const worlds = language === 'arabic' ? arabicWorlds : englishWorlds
  const currentWorld = worlds[currentWorldIdx]
  const uncollectedWords = currentWorld.words.filter((w) => !collectedWords.includes(w.word))
  const currentWord = uncollectedWords[Math.floor(Math.random() * uncollectedWords.length)]

  const handleMicrophoneClick = async () => {
    if (!currentWord) return

    setIsListening(true)
    setFeedback('Listening...')

    try {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.language = language === 'arabic' ? 'ar-SA' : 'en-US'
      recognition.start()

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase()

        if (transcript.includes(currentWord.word.toLowerCase())) {
          setCollectedWords((prev) => [...prev, currentWord.word])
          setScore((s) => s + 10)
          setFeedback('Collected! 🎉')

          if (collectedWords.length + 1 === currentWorld.words.length) {
            setFeedback('World Complete! 🌍')
            setTimeout(() => {
              setCurrentWorldIdx((idx) => (idx + 1) % worlds.length)
              setCollectedWords([])
            }, 1500)
          }
        } else {
          setFeedback(`Try saying "${currentWord.word}"`)
        }

        setIsListening(false)
      }
    } catch (error) {
      setFeedback('Microphone not available')
      setIsListening(false)
    }
  }

  const worldProgress = (collectedWords.length / currentWorld.words.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="text-2xl hover:scale-125 transition">←</button>
          <h1 className="text-2xl font-bold">Word Explorer</h1>
          <div className="text-2xl font-bold">{score}</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* World Selector */}
        <div className="flex gap-4 justify-center">
          {worlds.map((world, idx) => (
            <button
              key={world.id}
              onClick={() => {
                setCurrentWorldIdx(idx)
                setCollectedWords([])
              }}
              className={`p-4 rounded-lg font-bold transition-all ${
                currentWorldIdx === idx
                  ? 'bg-primary text-white scale-110'
                  : 'bg-card border-2 border-border'
              }`}
            >
              <div className="text-3xl">{world.emoji}</div>
              <p className="text-sm mt-2">{world.name}</p>
            </button>
          ))}
        </div>

        {/* Game Area */}
        <div className="bg-card border-4 border-primary rounded-3xl p-12 text-center space-y-8">
          {currentWord ? (
            <>
              <div className="text-7xl">{currentWord.emoji}</div>
              <h2 className="text-2xl font-bold text-muted-foreground">Can you say this?</h2>

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

              {/* Collected Words */}
              <div className="mt-8 space-y-2">
                <p className="text-sm font-bold text-muted-foreground">COLLECTED</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {collectedWords.map((word) => (
                    <span key={word} className="bg-success text-foreground px-4 py-2 rounded-full font-bold">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-2xl font-bold">🎉 World Complete!</p>
          )}

          {/* Progress */}
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="h-3 bg-success rounded-full transition-all"
                style={{ width: `${worldProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">
              {collectedWords.length} of {currentWorld.words.length} words
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
