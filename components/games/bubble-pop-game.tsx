'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, CheckCircle2, Mic, MicOff, Sparkles, Star, TrendingUp, AlertCircle } from 'lucide-react'
import MouthPositionGuide from '@/components/mouth-position-guide'

interface UserProfile {
  userType: 'child' | 'parent'
  languages: string[]
  age?: number
  disorders: string[]
  completedAssessment: boolean
}

interface BubblePopGameProps {
  userProfile: UserProfile
  onBack: () => void
  language?: 'english' | 'arabic'
}

type FeedbackType = 'success' | 'partial' | 'error' | null

export default function BubblePopGame({ userProfile, onBack, language = 'english' }: BubblePopGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const recognitionRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  
  const [currentLevel, setCurrentLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [consecutive, setConsecutive] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [lastSpoken, setLastSpoken] = useState('')
  const [feedback, setFeedback] = useState('')
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null)
  const [bubblesPopped, setBubblesPopped] = useState(0)
  const [pronunciationScore, setPronunciationScore] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  
  const [currentBubbleIndex, setCurrentBubbleIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [bubbleX, setBubbleX] = useState(0)
  const [bubbleY, setBubbleY] = useState(0)
  
  const scoreRef = useRef(0)
  const consecutiveRef = useRef(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Age-based targets based on ASHA milestones
  const getSoundTargets = () => {
    const age = userProfile.age || 5
    
    if (language === 'arabic') {
      // Arabic sounds progression
      if (age <= 3) {
        return {
          1: ['ب', 'م', 'ن', 'و', 'ل', 'ي'],
          2: ['با', 'ما', 'نا', 'وا', 'لا', 'يا'],
          3: ['بابا', 'ماما', 'نور', 'ولد', 'ليل', 'يوم'],
          4: ['بابا كبير', 'ماما حلوة', 'ولد صغير', 'نور جميل'],
        }
      } else if (age <= 5) {
        return {
          1: ['س', 'ش', 'ث', 'ف', 'ز', 'ح'],
          2: ['سا', 'شا', 'ثا', 'فا', 'زا', 'حا'],
          3: ['سمك', 'شمس', 'ثعلب', 'فيل', 'زهرة', 'حليب'],
          4: ['الشمس مشرقة', 'السمك في البحر', 'الفيل كبير', 'الزهرة جميلة'],
        }
      } else {
        return {
          1: ['ر', 'ع', 'غ', 'خ', 'ق', 'ط'],
          2: ['را', 'عا', 'غا', 'خا', 'قا', 'طا'],
          3: ['رمضان', 'عصفور', 'غيمة', 'خروف', 'قمر', 'طائر'],
          4: ['القمر مضيء', 'العصفور يغرد', 'الخروف أبيض', 'الطائر يطير'],
        }
      }
    }
    
    // English sounds (original code)
    // Early sounds (ages 2-3)
    if (age <= 3) {
      return {
        1: ['p', 'b', 'm', 'n', 'w', 'h'],
        2: ['ba', 'ma', 'pa', 'wa', 'na', 'ha'],
        3: ['mama', 'papa', 'baby', 'water', 'hello', 'happy'],
        4: ['I want water', 'Hello mama', 'Baby happy', 'Papa play', 'More please', 'Thank you'],
      }
    }
    // Middle sounds (ages 4-5)
    else if (age <= 5) {
      return {
        1: ['s', 'sh', 'th', 'f', 'v', 'z'],
        2: ['sa', 'sha', 'tha', 'fa', 'va', 'za'],
        3: ['sun', 'shoe', 'think', 'fish', 'very', 'zoo'],
        4: ['The sun is bright', 'I see a fish', 'My shoe is red', 'Very good job', 'Zoo animals', 'Think carefully'],
      }
    }
    // Advanced sounds (ages 6+)
    else {
      return {
        1: ['r', 'l', 'ch', 'j', 'th', 'zh'],
        2: ['ra', 'la', 'cha', 'ja', 'tha', 'zha'],
        3: ['rabbit', 'lamp', 'chair', 'jump', 'think', 'measure'],
        4: ['The rabbit runs fast', 'Lamp lights the room', 'Chair is comfortable', 'Jump high and far', 'Think before speaking', 'Measure carefully'],
      }
    }
  }

  const soundTargets = getSoundTargets()
  const currentTargets = soundTargets[Math.min(currentLevel, 4) as keyof typeof soundTargets]
  const currentTarget = currentTargets[currentBubbleIndex] || currentTargets[0]

  const getBubbleSize = () => {
    const textLength = currentTarget.length
    if (textLength <= 2) return 80
    if (textLength <= 5) return 100
    if (textLength <= 10) return 120
    return 140
  }

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = language === 'arabic' ? 'ar-SA' : 'en-US'
      recognition.maxAlternatives = 3

      recognition.onstart = () => {
        setIsListening(true)
        setFeedback('Listening...')
        setFeedbackType(null)
        startAudioVisualization()
      }

      recognition.onresult = (event: any) => {
        const results = event.results
        const transcript = results[results.length - 1][0].transcript.toLowerCase().trim()
        const confidence = results[results.length - 1][0].confidence || 0.5
        
        setLastSpoken(transcript)
        checkPronunciation(transcript, confidence)
      }

      recognition.onerror = (event: any) => {
        setIsListening(false)
        stopAudioVisualization()
        if (event.error === 'no-speech') {
          setFeedback('No speech detected. Try again!')
          setFeedbackType('error')
        } else if (event.error === 'audio-capture') {
          setFeedback('Microphone not found. Please check your settings.')
          setFeedbackType('error')
        } else {
          setFeedback('Something went wrong. Try again!')
          setFeedbackType('error')
        }
      }

      recognition.onend = () => {
        setIsListening(false)
        stopAudioVisualization()
      }

      recognitionRef.current = recognition
    } else {
      setFeedback('Speech recognition not supported in this browser')
      setFeedbackType('error')
    }
  }, [])

  // Initialize audio visualization
  const startAudioVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)
      
      analyser.fftSize = 256
      microphone.connect(analyser)
      
      audioContextRef.current = audioContext
      analyserRef.current = analyser
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      
      const updateAudioLevel = () => {
        if (analyserRef.current && isListening) {
          analyserRef.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          setAudioLevel(Math.min(average / 255, 1))
          animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
        }
      }
      
      updateAudioLevel()
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopAudioVisualization = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    setAudioLevel(0)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      setBubbleX(canvas.offsetWidth / 2)
      setBubbleY(canvas.offsetHeight / 2)
    }
  }, [currentLevel])

  useEffect(() => {
    setTimeRemaining(30)
    setFeedback('')
    setFeedbackType(null)
    setPronunciationScore(0)
    setShowCelebration(false)

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          moveToNextBubble()
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentBubbleIndex, currentLevel])

  // Improved pronunciation checking with Levenshtein distance
  const calculateSimilarity = (spoken: string, target: string): number => {
    const normalize = (str: string) => str.toLowerCase().trim().replace(/[^a-z0-9]/g, '')
    const spokenNorm = normalize(spoken)
    const targetNorm = normalize(target)

    // Exact match
    if (spokenNorm === targetNorm) return 1.0

    // Contains match
    if (spokenNorm.includes(targetNorm) || targetNorm.includes(spokenNorm)) return 0.85

    // Levenshtein distance for similarity
    const distance = levenshteinDistance(spokenNorm, targetNorm)
    const maxLen = Math.max(spokenNorm.length, targetNorm.length)
    const similarity = 1 - distance / maxLen

    // For single sounds/letters, be more lenient
    if (targetNorm.length <= 2) {
      return spokenNorm.includes(targetNorm[0]) ? 0.8 : similarity
    }

    return similarity
  }

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = []
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2[i - 1] === str1[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        }
      }
    }
    return matrix[str2.length][str1.length]
  }

  const checkPronunciation = (transcript: string, confidence: number) => {
    const target = currentTarget.toLowerCase()
    const similarity = calculateSimilarity(transcript, target)
    const finalScore = (similarity * 0.7 + confidence * 0.3) * 100

    setPronunciationScore(Math.round(finalScore))

    if (similarity >= 0.8) {
      // Success!
      setFeedback('Excellent pronunciation!')
      setFeedbackType('success')
      setShowCelebration(true)
      
      const multiplier = 1 + consecutiveRef.current * 0.15
      const points = Math.round(50 * multiplier)
      
      scoreRef.current += points
      setScore(scoreRef.current)
      
      consecutiveRef.current += 1
      setConsecutive(consecutiveRef.current)
      
      setBubblesPopped((prev) => prev + 1)

      if (timerRef.current) clearInterval(timerRef.current)
      
      setTimeout(() => {
        setShowCelebration(false)
        moveToNextBubble()
      }, 2000)
    } else if (similarity >= 0.6) {
      // Partial success
      setFeedback(`Good try! You're close. Say "${currentTarget}" more clearly.`)
      setFeedbackType('partial')
    } else {
      // Needs improvement
      setFeedback(`Try again! Focus on saying "${currentTarget}" clearly.`)
      setFeedbackType('error')
      consecutiveRef.current = 0
      setConsecutive(0)
    }
  }

  const moveToNextBubble = () => {
    consecutiveRef.current = 0
    setConsecutive(0)

    if (currentBubbleIndex < currentTargets.length - 1) {
      setCurrentBubbleIndex(currentBubbleIndex + 1)
      setFeedback('')
      setFeedbackType(null)
      setLastSpoken('')
      setPronunciationScore(0)
    } else {
      if (currentLevel < 4) {
        setCurrentLevel(currentLevel + 1)
        setCurrentBubbleIndex(0)
        setFeedback('')
        setFeedbackType(null)
        setLastSpoken('')
        setPronunciationScore(0)
      } else {
        setCompleted(true)
      }
    }
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
      recognitionRef.current.start()
      } catch (error) {
        setFeedback('Please wait a moment before trying again')
        setFeedbackType('error')
      }
    }
  }

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationFrameId: number
    let offsetY = 0
    const floatSpeed = 0.03

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#E6FBF8')
      gradient.addColorStop(1, '#FFF4ED')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      offsetY += floatSpeed
      const y = bubbleY + Math.sin(offsetY) * 25

      const bubbleSize = getBubbleSize()

      // Draw bubble with brand colors
      ctx.beginPath()
      ctx.arc(bubbleX, y, bubbleSize, 0, Math.PI * 2)

      const bubbleGradient = ctx.createRadialGradient(
        bubbleX - bubbleSize / 3,
        y - bubbleSize / 3,
        0,
        bubbleX,
        y,
        bubbleSize
      )
      bubbleGradient.addColorStop(0, '#4ADEC0')
      bubbleGradient.addColorStop(0.5, '#2A9896')
      bubbleGradient.addColorStop(1, '#EE8B44')
      ctx.fillStyle = bubbleGradient
      ctx.fill()

      ctx.strokeStyle = '#152341'
      ctx.lineWidth = 4
      ctx.stroke()

      // Draw text
      const fontSize = Math.max(28, bubbleSize * 0.35)
      ctx.fillStyle = '#152341'
      ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(currentTarget.toUpperCase(), bubbleX, y)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationFrameId)
  }, [bubbleX, bubbleY, currentTarget, currentBubbleIndex])

  if (completed) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 animate-slide-up">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#2A9896] to-[#4ADEC0] mb-4">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[#152341]">Amazing Work!</h1>
            <p className="text-[#6B7280] text-lg">You completed all levels!</p>
          </div>

          <div className="bg-white border-2 border-[#E5E7EB] rounded-2xl p-8 shadow-lg space-y-6">
            <div className="text-center">
              <p className="text-sm text-[#6B7280] mb-2">Total Score</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-5xl font-bold bg-gradient-to-r from-[#EE8B44] to-[#FFA366] bg-clip-text text-transparent">
                  {score}
                </p>
                <Star className="w-8 h-8 text-[#EE8B44] fill-[#EE8B44]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-[#E6FBF8] rounded-xl border border-[#4ADEC0]/20">
                <p className="text-xs text-[#6B7280] mb-1">Bubbles Popped</p>
                <p className="text-2xl font-bold text-[#2A9896]">{bubblesPopped}</p>
              </div>
              <div className="text-center p-4 bg-[#FFF4ED] rounded-xl border border-[#EE8B44]/20">
                <p className="text-xs text-[#6B7280] mb-1">Best Streak</p>
                <p className="text-2xl font-bold text-[#EE8B44]">{consecutive}x</p>
            </div>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full bg-gradient-to-r from-[#EE8B44] to-[#FFA366] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Back to Learning Path
          </button>
        </div>
      </div>
    )
  }

  const levelNames = {
    1: 'Sounds',
    2: 'Syllables',
    3: 'Words',
    4: 'Sentences'
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={onBack} 
            className="p-2 hover:bg-[#F5F7FA] rounded-lg transition-colors text-[#152341]"
          >
            <ArrowLeft className="w-5 h-5" />
        </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-[#152341]">Bubble Pop Challenge</h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Level {currentLevel}/4: {levelNames[currentLevel as keyof typeof levelNames]}
            </p>
          </div>
          <div className="w-9" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border-2 border-[#E5E7EB] text-center shadow-sm">
            <p className="text-xs text-[#6B7280] mb-1">Score</p>
            <p className="text-2xl font-bold text-[#EE8B44]">{score}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border-2 border-[#E5E7EB] text-center shadow-sm">
            <p className="text-xs text-[#6B7280] mb-1">Streak</p>
            <p className="text-2xl font-bold text-[#2A9896]">{consecutive}x</p>
          </div>
          <div className="bg-white p-4 rounded-xl border-2 border-[#E5E7EB] text-center shadow-sm">
            <p className="text-xs text-[#6B7280] mb-1">Popped</p>
            <p className="text-2xl font-bold text-[#4ADEC0]">{bubblesPopped}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-b from-[#E6FBF8] to-[#FFF4ED] rounded-2xl border-2 border-[#E5E7EB] shadow-lg overflow-hidden relative">
              {showCelebration && (
                <div className="absolute inset-0 flex items-center justify-center z-10 animate-celebrate bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-12 h-12 text-[#EE8B44]" />
                    <CheckCircle2 className="w-16 h-16 text-[#2A9896]" />
                    <Sparkles className="w-12 h-12 text-[#4ADEC0]" />
                  </div>
                </div>
              )}
              <canvas
                ref={canvasRef}
                className="w-full border-0"
                style={{ height: '450px' }}
              />
            </div>
          </div>

          {/* Mouth Position Guide - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <MouthPositionGuide target={currentTarget} />
          </div>
        </div>

        {/* Pronunciation Feedback Card */}
        <div className="bg-white p-6 rounded-2xl border-2 border-[#E5E7EB] shadow-lg space-y-4">
          <div className="text-center space-y-2">
            <h3 className="font-bold text-[#152341] text-lg">
              Say this: <span className="text-[#EE8B44] text-xl">{currentTarget}</span>
          </h3>
            <p className="text-xs text-[#6B7280]">
              {currentBubbleIndex + 1} of {currentTargets.length} • {timeRemaining}s remaining
            </p>
          </div>

          {/* Audio Level Indicator */}
          {isListening && (
            <div className="space-y-2">
              <p className="text-xs text-[#6B7280] text-center">Speaking...</p>
              <div className="w-full bg-[#F5F7FA] rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4ADEC0] to-[#2A9896] rounded-full transition-all duration-100"
                  style={{ width: `${audioLevel * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Pronunciation Score */}
          {pronunciationScore > 0 && !isListening && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#6B7280]">
                <span>Pronunciation Accuracy</span>
                <span className="font-semibold">{pronunciationScore}%</span>
              </div>
              <div className="w-full bg-[#F5F7FA] rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    pronunciationScore >= 80
                      ? 'bg-gradient-to-r from-[#4ADEC0] to-[#2A9896]'
                      : pronunciationScore >= 60
                      ? 'bg-gradient-to-r from-[#EE8B44] to-[#FFA366]'
                      : 'bg-gradient-to-r from-[#EF4444] to-[#F87171]'
                  }`}
                  style={{ width: `${pronunciationScore}%` }}
                />
              </div>
            </div>
          )}

          {/* Speak Button */}
          <div className="flex justify-center">
            <button
              onClick={startListening}
              disabled={isListening}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                isListening
                  ? 'bg-gradient-to-r from-[#2A9896] to-[#3DB5B3] text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#EE8B44] to-[#FFA366] text-white hover:shadow-xl hover:scale-[1.02]'
              }`}
            >
              {isListening ? (
                <>
                  <Mic className="w-6 h-6 animate-pulse" />
                  <span>Listening...</span>
                </>
              ) : (
                <>
                  <Mic className="w-6 h-6" />
                  <span>Tap to Speak</span>
                </>
              )}
            </button>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-4 rounded-xl text-center font-medium ${
                feedbackType === 'success'
                  ? 'bg-gradient-to-r from-[#E6FBF8] to-[#D0F0EF] text-[#2A9896] border-2 border-[#4ADEC0]'
                  : feedbackType === 'partial'
                  ? 'bg-[#FFF4ED] text-[#EE8B44] border-2 border-[#EE8B44]'
                  : 'bg-[#FEE2E2] text-[#EF4444] border-2 border-[#EF4444]'
              }`}
            >
              {feedback}
            </div>
          )}

          {lastSpoken && feedbackType !== 'success' && (
            <p className="text-xs text-[#6B7280] text-center">
              You said: <span className="font-semibold text-[#152341]">"{lastSpoken}"</span>
            </p>
          )}

          <div className="flex items-start gap-2 pt-2 bg-[#F9FAFB] p-3 rounded-lg border border-[#E5E7EB]">
            <AlertCircle className="w-4 h-4 text-[#6B7280] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#6B7280]">
              Speak clearly and confidently. The bubble will pop when you pronounce it correctly!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
