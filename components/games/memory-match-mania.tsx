'use client'

import { useState, useEffect } from 'react'

interface UserProfile {
  userType: 'child' | 'parent'
  languages: string[]
  age?: number
  disorders: string[]
  completedAssessment: boolean
}

interface MemoryMatchManiaProps {
  userProfile: UserProfile
  onBack: () => void
  language?: 'english' | 'arabic'
}

interface Card {
  id: number
  word: string
  emoji: string
  matched: boolean
}

export default function MemoryMatchMania({ userProfile, onBack, language = 'english' }: MemoryMatchManiaProps) {
  const [cards, setCards] = useState<Card[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [isListening, setIsListening] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [gameTime, setGameTime] = useState(0)

  const englishWords = ['cat', 'dog', 'bird', 'fish', 'lion', 'bear', 'duck', 'pig']
  const arabicWords = ['قطة', 'كلب', 'طائر', 'سمكة', 'أسد', 'دب', 'بطة', 'خنزير']
  const words = language === 'arabic' ? arabicWords : englishWords

  useEffect(() => {
    initializeGame()
  }, [level])

  const initializeGame = () => {
    const shuffled = [...words, ...words].sort(() => Math.random() - 0.5)
    const newCards: Card[] = shuffled.map((word, idx) => ({
      id: idx,
      word,
      emoji: getEmoji(word),
      matched: false,
    }))
    setCards(newCards)
    setFlipped([])
    setMatches(0)
    setGameTime(0)
  }

  const getEmoji = (word: string) => {
    const emojiMap: Record<string, string> = {
      // English
      cat: '🐱',
      dog: '🐶',
      bird: '🐦',
      fish: '🐠',
      lion: '🦁',
      bear: '🐻',
      duck: '🦆',
      pig: '🐷',
      // Arabic
      'قطة': '🐱',
      'كلب': '🐶',
      'طائر': '🐦',
      'سمكة': '🐠',
      'أسد': '🦁',
      'دب': '🐻',
      'بطة': '🦆',
      'خنزير': '🐷',
    }
    return emojiMap[word] || '❓'
  }

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped
      if (cards[first].word === cards[second].word) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === first || card.id === second ? { ...card, matched: true } : card
          )
        )
        setMatches((m) => m + 1)
        setScore((s) => s + 20)
        setFlipped([])

        if (matches + 1 === words.length) {
          setFeedback('Level Complete! 🎉')
          setTimeout(() => {
            setLevel(level + 1)
          }, 1500)
        }
      } else {
        setTimeout(() => setFlipped([]), 800)
      }
    }
  }, [flipped])

  const handleCardClick = (id: number) => {
    if (flipped.includes(id) || cards[id].matched) return
    setFlipped([...flipped, id])

    // Automatically say the word when card is flipped
    if (flipped.length === 0) {
      handleSpeakWord(cards[id].word)
    }
  }

  const handleSpeakWord = async (word: string) => {
    setIsListening(true)
    setFeedback(`Say: ${word}`)

    try {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.language = 'en-US'
      recognition.start()

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase()
        if (transcript.includes(word.toLowerCase())) {
          setFeedback('Good! 🎉')
        }
        setIsListening(false)
      }
    } catch (error) {
      setIsListening(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/10 via-background to-accent/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-success to-success/80 text-foreground py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="text-2xl hover:scale-125 transition">←</button>
          <h1 className="text-2xl font-bold">Memory Match</h1>
          <div className="text-2xl font-bold">{score}</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Level Info */}
        <div className="bg-card border-2 border-success rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">LEVEL {level}</p>
          <p className="text-lg font-bold">
            {matches} of {words.length} Pairs Matched
          </p>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-lg font-bold text-2xl transition-all ${
                flipped.includes(card.id) || card.matched
                  ? 'bg-primary text-white scale-100'
                  : 'bg-card border-4 border-primary hover:scale-110'
              } ${card.matched ? 'opacity-50' : ''}`}
            >
              {flipped.includes(card.id) || card.matched ? card.emoji : '?'}
            </button>
          ))}
        </div>

        {feedback && (
          <p className="text-center text-xl font-bold text-primary">{feedback}</p>
        )}

        {matches === words.length && (
          <button
            onClick={() => setLevel(level + 1)}
            className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:scale-105 transition-all text-lg"
          >
            Next Level 🚀
          </button>
        )}
      </div>
    </div>
  )
}
