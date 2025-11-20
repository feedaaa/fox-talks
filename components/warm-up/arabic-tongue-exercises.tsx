'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, Play, Pause } from 'lucide-react'

interface ArabicTongueExercisesProps {
  onBack: () => void
}

const arabicTongueExercises = [
  {
    id: 1,
    name: 'تمرين الأسنان - Dental Practice',
    arabicName: 'تمرين الحروف الأسنانية',
    description: 'Practice letters formed with tongue against teeth',
    instruction: 'Say ت (taa) - د (daal) - ث (thaa). Tongue tip touches back of upper teeth.',
    sounds: ['ت', 'د', 'ث', 'ذ'],
    duration: 15,
    reps: 5,
  },
  {
    id: 2,
    name: 'تمرين اللثة - Alveolar Practice',
    arabicName: 'تمرين الحروف اللثوية',
    description: 'Practice letters with tongue on gum ridge',
    instruction: 'Say ن (noon) - ل (laam) - ر (raa). Tongue touches the ridge behind upper teeth.',
    sounds: ['ن', 'ل', 'ر'],
    duration: 15,
    reps: 5,
  },
  {
    id: 3,
    name: 'Rolling R Practice - حرف الراء',
    arabicName: 'تمرين حرف الراء',
    description: 'Practice the rolled ر sound',
    instruction: 'Say ررررر (rrrr). Lightly tap or roll your tongue. Try: رَمْضان (Ramadan)',
    sounds: ['ر'],
    duration: 12,
    reps: 6,
  },
  {
    id: 4,
    name: 'تمرين السين والشين - S and Sh Sounds',
    arabicName: 'تمرين السين والشين',
    description: 'Practice sibilant sounds',
    instruction: 'Alternate: س (seen) - ش (sheen). س like "s", ش like "sh". Try: شَمْس (shams - sun)',
    sounds: ['س', 'ش'],
    duration: 15,
    reps: 5,
  },
  {
    id: 5,
    name: 'تمرين اللام - L Sound Practice',
    arabicName: 'تمرين حرف اللام',
    description: 'Practice the ل sound',
    instruction: 'Say لَ لِ لُ (la li loo). Tongue stays firmly on roof of mouth. Try: لَيْمون (laymoon - lemon)',
    sounds: ['ل'],
    duration: 12,
    reps: 5,
  },
  {
    id: 6,
    name: 'Heavy vs Light Letters',
    arabicName: 'الحروف المُفخَّمة والمُرَقَّقة',
    description: 'Practice distinction between heavy and light sounds',
    instruction: 'Compare: ت (light t) vs ط (heavy t), د (light d) vs ض (heavy d). Feel throat position change.',
    sounds: ['ت', 'ط', 'د', 'ض'],
    duration: 18,
    reps: 5,
  },
]

export default function ArabicTongueExercises({ onBack }: ArabicTongueExercisesProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(arabicTongueExercises[0].duration)
  const [repsCompleted, setRepsCompleted] = useState(0)

  const exercise = arabicTongueExercises[currentExerciseIndex]

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
        if (currentExerciseIndex < arabicTongueExercises.length - 1) {
          setTimeout(() => {
            setCurrentExerciseIndex(currentExerciseIndex + 1)
            setRepsCompleted(0)
            setTimeLeft(arabicTongueExercises[currentExerciseIndex + 1].duration)
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
            Exercise {currentExerciseIndex + 1} of {arabicTongueExercises.length}
          </h2>
          <div className="flex gap-2">
            {arabicTongueExercises.map((_, index) => (
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
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 rounded-2xl p-8 text-center space-y-6">
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
            <div className="text-4xl font-bold text-accent">{timeLeft}s</div>
            <div className="text-sm text-muted-foreground">Time Left</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent">{repsCompleted + 1}/{exercise.reps}</div>
            <div className="text-sm text-muted-foreground">Repetition</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center">
          {!isActive ? (
            <button
              onClick={startExercise}
              className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition-all flex items-center gap-2 shadow-lg"
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
        <h4 className="font-semibold text-foreground mb-3">💡 Tips for Arabic Tongue Sounds</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• <strong>Dental (ت د ث ذ):</strong> Tongue tip touches back of upper teeth</li>
          <li>• <strong>Alveolar (ن ل ر س):</strong> Tongue touches gum ridge behind teeth</li>
          <li>• <strong>Heavy Letters (ط ظ ص ض):</strong> Same position but throat is lowered</li>
          <li>• <strong>ر (Raa):</strong> Lightly tap or roll tongue - practice makes perfect!</li>
          <li>• <strong>ل (Laam):</strong> Tongue stays firmly against roof of mouth</li>
        </ul>
      </div>
    </div>
  )
}
