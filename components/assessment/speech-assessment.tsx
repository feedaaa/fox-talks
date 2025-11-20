'use client'

import { useState, useEffect } from 'react'
import { Mic, MicOff, Volume2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import MouthPositionGuide from '@/components/mouth-position-guide'

interface SpeechAssessmentProps {
  onComplete: (results: AssessmentResults) => void
  language: 'english' | 'arabic'
}

interface AssessmentResults {
  problemSounds: string[]
  strengths: string[]
  overallScore: number
  recommendedStartLevel: number
}

interface TestItem {
  sound: string
  word: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  transliteration?: string
}

export default function SpeechAssessment({ onComplete, language }: SpeechAssessmentProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [results, setResults] = useState<Record<string, boolean>>({})
  const [showGuide, setShowGuide] = useState(false)
  const [attemptsLeft, setAttemptsLeft] = useState(2)
  const [feedback, setFeedback] = useState('')

  const englishTests: TestItem[] = [
    // Basic sounds
    { sound: 'p', word: 'Pop', category: 'labial', difficulty: 'easy' },
    { sound: 'b', word: 'Baby', category: 'labial', difficulty: 'easy' },
    { sound: 'm', word: 'Mom', category: 'labial', difficulty: 'easy' },
    { sound: 's', word: 'Sun', category: 'alveolar', difficulty: 'easy' },
    { sound: 'f', word: 'Fish', category: 'labiodental', difficulty: 'easy' },
    
    // Medium sounds
    { sound: 'sh', word: 'Ship', category: 'palatal', difficulty: 'medium' },
    { sound: 'th', word: 'Think', category: 'dental', difficulty: 'medium' },
    { sound: 'l', word: 'Lake', category: 'alveolar', difficulty: 'medium' },
    { sound: 'r', word: 'Rabbit', category: 'alveolar', difficulty: 'medium' },
    
    // Challenging sounds
    { sound: 'ch', word: 'Chair', category: 'palatal', difficulty: 'hard' },
    { sound: 'j', word: 'Jump', category: 'palatal', difficulty: 'hard' },
    { sound: 'v', word: 'Very', category: 'labiodental', difficulty: 'hard' },
  ]

  const arabicTests: TestItem[] = [
    // Basic sounds
    { sound: 'ب', word: 'بابا', transliteration: 'baba', category: 'labial', difficulty: 'easy' },
    { sound: 'م', word: 'ماما', transliteration: 'mama', category: 'labial', difficulty: 'easy' },
    { sound: 'ن', word: 'نور', transliteration: 'noor', category: 'alveolar', difficulty: 'easy' },
    { sound: 'ل', word: 'ليل', transliteration: 'layl', category: 'alveolar', difficulty: 'easy' },
    
    // Medium sounds
    { sound: 'س', word: 'سمك', transliteration: 'samak', category: 'alveolar', difficulty: 'medium' },
    { sound: 'ش', word: 'شمس', transliteration: 'shams', category: 'palatal', difficulty: 'medium' },
    { sound: 'ف', word: 'فيل', transliteration: 'feel', category: 'labiodental', difficulty: 'medium' },
    { sound: 'ت', word: 'تفاحة', transliteration: 'tuffaha', category: 'dental', difficulty: 'medium' },
    
    // Challenging sounds
    { sound: 'ر', word: 'رمضان', transliteration: 'ramadan', category: 'alveolar', difficulty: 'hard' },
    { sound: 'ع', word: 'عصفور', transliteration: 'asfoor', category: 'guttural', difficulty: 'hard' },
    { sound: 'غ', word: 'غيمة', transliteration: 'ghayma', category: 'guttural', difficulty: 'hard' },
    { sound: 'ح', word: 'حليب', transliteration: 'haleeb', category: 'guttural', difficulty: 'hard' },
    { sound: 'خ', word: 'خروف', transliteration: 'kharoof', category: 'guttural', difficulty: 'hard' },
    { sound: 'ق', word: 'قمر', transliteration: 'qamar', category: 'velar', difficulty: 'hard' },
  ]

  const tests = language === 'arabic' ? arabicTests : englishTests
  const currentTest = tests[currentIndex]
  const progress = ((currentIndex + 1) / tests.length) * 100

  const handleListen = async () => {
    if (!currentTest) return
    
    setIsListening(true)
    setFeedback('Listening...')

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        setFeedback('Speech recognition not supported in your browser')
        setIsListening(false)
        return
      }

      const recognition = new SpeechRecognition()
      recognition.lang = language === 'arabic' ? 'ar-SA' : 'en-US'
      recognition.maxAlternatives = 3
      recognition.interimResults = false

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase()
        const confidence = event.results[0][0].confidence
        
        // Check if the word or sound was correctly produced
        const isCorrect = transcript.includes(currentTest.word.toLowerCase()) || 
                         transcript.includes(currentTest.sound.toLowerCase()) ||
                         confidence > 0.7

        if (isCorrect) {
          setResults(prev => ({ ...prev, [currentTest.sound]: true }))
          setFeedback('✅ Great job!')
          setTimeout(() => handleNext(true), 1500)
        } else {
          if (attemptsLeft > 0) {
            setAttemptsLeft(attemptsLeft - 1)
            setFeedback(`Try again! ${attemptsLeft} attempts left`)
          } else {
            setResults(prev => ({ ...prev, [currentTest.sound]: false }))
            setFeedback('Let\'s move on to the next one')
            setTimeout(() => handleNext(false), 1500)
          }
        }
        
        setIsListening(false)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setFeedback('Could not hear you. Please try again.')
        setIsListening(false)
      }

      recognition.start()
    } catch (error) {
      console.error('Speech recognition error:', error)
      setFeedback('Microphone error. Please check permissions.')
      setIsListening(false)
    }
  }

  const handleNext = (wasCorrect: boolean) => {
    if (currentIndex < tests.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setAttemptsLeft(2)
      setFeedback('')
      setShowGuide(false)
    } else {
      // Assessment complete - calculate results
      completeAssessment()
    }
  }

  const handleSkip = () => {
    setResults(prev => ({ ...prev, [currentTest.sound]: false }))
    handleNext(false)
  }

  const completeAssessment = () => {
    const problemSounds: string[] = []
    const strengths: string[] = []
    let correctCount = 0

    Object.entries(results).forEach(([sound, correct]) => {
      if (correct) {
        strengths.push(sound)
        correctCount++
      } else {
        problemSounds.push(sound)
      }
    })

    const overallScore = Math.round((correctCount / tests.length) * 100)
    const recommendedStartLevel = overallScore >= 80 ? 3 : overallScore >= 60 ? 2 : 1

    onComplete({
      problemSounds,
      strengths,
      overallScore,
      recommendedStartLevel,
    })
  }

  if (!currentTest) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === 'arabic' ? 'تقييم النطق - Speech Assessment' : 'Speech Assessment'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'arabic' 
              ? 'سنختبر نطقك لتخصيص تجربتك - Let\'s test your pronunciation to personalize your experience'
              : 'Let\'s test your pronunciation to personalize your experience'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Sound {currentIndex + 1} of {tests.length}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Test Card */}
        <div className="bg-card border-2 border-border rounded-2xl p-8 mb-6 shadow-lg">
          {/* Sound Display */}
          <div className="text-center mb-6">
            <div className="inline-block bg-primary/10 px-8 py-4 rounded-xl mb-4">
              <p className="text-6xl font-bold text-primary" dir={language === 'arabic' ? 'rtl' : 'ltr'}>
                {currentTest.sound}
              </p>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2" dir={language === 'arabic' ? 'rtl' : 'ltr'}>
              Say: {currentTest.word}
            </h2>
            {currentTest.transliteration && (
              <p className="text-lg text-muted-foreground">({currentTest.transliteration})</p>
            )}
            <p className="text-sm text-muted-foreground mt-2 capitalize">
              {currentTest.category} sound • {currentTest.difficulty}
            </p>
          </div>

          {/* Mouth Position Guide Toggle */}
          <div className="mb-6">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              {showGuide ? '▼ Hide' : '▶'} How to position your mouth
            </button>
          </div>

          {showGuide && (
            <div className="mb-6 animate-slide-up">
              <MouthPositionGuide 
                target={currentTest.sound} 
                language={language}
              />
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
              feedback.includes('✅') 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : feedback.includes('Try again')
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
            }`}>
              {feedback}
            </div>
          )}

          {/* Microphone Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleListen}
              disabled={isListening}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${
                isListening
                  ? 'bg-red-500 animate-pulse scale-110'
                  : 'bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95'
              }`}
            >
              {isListening ? (
                <MicOff className="w-10 h-10 text-white" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </button>
            
            <p className="text-sm text-muted-foreground">
              {isListening ? 'Listening...' : 'Tap to record'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSkip}
              disabled={isListening}
              className="flex-1 bg-muted text-foreground py-3 px-6 rounded-lg font-semibold hover:bg-muted/80 transition-colors disabled:opacity-50"
            >
              Skip
            </button>
            <button
              onClick={() => handleNext(false)}
              disabled={isListening}
              className="flex-1 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Next <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-accent" />
            Tips for best results:
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Speak clearly and at a normal volume</li>
            <li>• Make sure you're in a quiet environment</li>
            <li>• You have 2 attempts per sound</li>
            <li>• Click the guide if you need help with mouth position</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
