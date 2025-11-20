'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, Play, Pause } from 'lucide-react'

interface ArabicLipExercisesProps {
  onBack: () => void
}

const arabicLipExercises = [
  {
    id: 1,
    name: 'تمرين الشفاه - Labial Practice',
    arabicName: 'تمرين حروف الشفتين',
    description: 'Practice Arabic letters formed with the lips',
    instruction: 'Say ب (baa) - م (meem) - و (waw) slowly. Feel your lips close completely.',
    sounds: ['ب', 'م', 'و'],
    duration: 15,
    reps: 5,
  },
  {
    id: 2,
    name: 'تمرين الفاء - Labiodental F',
    arabicName: 'تمرين حرف الفاء',
    description: 'Practice the ف sound with teeth on lower lip',
    instruction: 'Say ف (faa) repeatedly. Upper teeth touch lower lip gently. Try: فيل (feel - elephant)',
    sounds: ['ف'],
    duration: 12,
    reps: 5,
  },
  {
    id: 3,
    name: 'Alternating Lip Positions',
    arabicName: 'تبادل حركات الشفاه',
    description: 'Switch between different Arabic lip sounds',
    instruction: 'Alternate: ب - و - ف - م. Notice how your lips move differently for each.',
    sounds: ['ب', 'و', 'ف', 'م'],
    duration: 15,
    reps: 8,
  },
  {
    id: 4,
    name: 'Rounded Lip Practice',
    arabicName: 'تمرين الشفاه المدورة',
    description: 'Practice rounded lip position for و',
    instruction: 'Say وَ وِ وُ (wa wi woo). Keep lips rounded like saying "oo".',
    sounds: ['و'],
    duration: 12,
    reps: 5,
  },
]

export default function ArabicLipExercises({ onBack }: ArabicLipExercisesProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(arabicLipExercises[0].duration)
  const [repsCompleted, setRepsCompleted] = useState(0)

  const exercise = arabicLipExercises[currentExerciseIndex]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false)
      if (repsCompleted < exercise.reps - 1) {
        setRepsCompleted(repsCompleted + 1)
        setTimeLeft(exercise.duration)
      } else {
        // Exercise complete
        if (currentExerciseIndex < arabicLipExercises.length - 1) {
          setTimeout(() => {
            setCurrentExerciseIndex(currentExerciseIndex + 1)
            setRepsCompleted(0)
            setTimeLeft(arabicLipExercises[currentExerciseIndex + 1].duration)
          }, 1000)
        }
      }
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, repsCompleted, currentExerciseIndex, exercise])

  const startExercise = () => {
    setIsActive(true)
  }

  const pauseExercise = () => {
    setIsActive(false)
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
      >
        <ChevronLeft size={20} />
        Back to Exercise Selection
      </button>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-foreground">
            Exercise {currentExerciseIndex + 1} of {arabicLipExercises.length}
          </h2>
          <div className="flex gap-2">
            {arabicLipExercises.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentExerciseIndex ? 'bg-primary w-8' : 
                  index < currentExerciseIndex ? 'bg-primary/50' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Card */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl p-8 text-center space-y-6">
        {/* Arabic Letters Display */}
        <div className={`text-7xl transition-transform ${isActive ? 'animate-pulse' : ''}`} dir="rtl">
          {exercise.sounds.join(' ')}
        </div>

        <div>
          <h3 className="text-3xl font-bold text-foreground mb-2">{exercise.name}</h3>
          <p className="text-xl text-muted-foreground mb-2" dir="rtl">{exercise.arabicName}</p>
          <p className="text-muted-foreground">{exercise.description}</p>
        </div>

        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
          <p className="text-foreground font-medium">{exercise.instruction}</p>
        </div>

        {/* Timer and Reps */}
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{timeLeft}s</div>
            <div className="text-sm text-muted-foreground">Time Left</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{repsCompleted + 1}/{exercise.reps}</div>
            <div className="text-sm text-muted-foreground">Repetition</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center">
          {!isActive ? (
            <button
              onClick={startExercise}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg"
            >
              <Play size={24} />
              Start
            </button>
          ) : (
            <button
              onClick={pauseExercise}
              className="bg-amber-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition-all flex items-center gap-2 shadow-lg"
            >
              <Pause size={24} />
              Pause
            </button>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-card border-2 border-border rounded-xl p-6">
        <h4 className="font-semibold text-foreground mb-3">💡 Tips for Arabic Lip Sounds</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• <strong>ب (Baa):</strong> Press both lips together firmly, then release with voice</li>
          <li>• <strong>م (Meem):</strong> Like ب but the sound comes through your nose</li>
          <li>• <strong>و (Waw):</strong> Round your lips like saying "oo" in "moon"</li>
          <li>• <strong>ف (Faa):</strong> Upper teeth gently touch lower lip, like "f" in "fun"</li>
        </ul>
      </div>
    </div>
  )
}
