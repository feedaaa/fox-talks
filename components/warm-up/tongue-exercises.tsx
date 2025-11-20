'use client'

import { useState } from 'react'
import { ChevronLeft, Play } from 'lucide-react'

interface TongueExercisesProps {
  onBack: () => void
}

const tongueExercises = [
  {
    id: 1,
    name: 'Tongue Extension',
    description: 'Stick your tongue out as far as possible',
    instruction: 'Stick your tongue out as far as you can. Hold for 3 seconds then relax.',
    duration: 10,
    reps: 5,
  },
  {
    id: 2,
    name: 'Tongue Elevation',
    description: 'Touch your tongue to different spots',
    instruction: 'Touch your tongue to the roof of your mouth. Hold for 2 seconds. Repeat.',
    duration: 12,
    reps: 6,
  },
  {
    id: 3,
    name: 'Tongue Lateralization',
    description: 'Move your tongue side to side',
    instruction: 'Move your tongue from one side of your mouth to the other. Do this 10 times.',
    duration: 15,
    reps: 10,
  },
]

export default function TongueExercises({ onBack }: TongueExercisesProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(tongueExercises[0].duration)
  const [repsLeft, setRepsLeft] = useState(tongueExercises[0].reps)

  const exercise = tongueExercises[currentExerciseIndex]

  const startExercise = () => {
    setIsActive(true)
    setTimeLeft(exercise.duration)
    setRepsLeft(exercise.reps)
  }

  const completeExercise = () => {
    setIsActive(false)
    if (currentExerciseIndex < tongueExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      setTimeLeft(tongueExercises[currentExerciseIndex + 1].duration)
    }
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-semibold"
      >
        <ChevronLeft size={20} />
        Back to Exercise Selection
      </button>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-foreground">Exercise {currentExerciseIndex + 1} of {tongueExercises.length}</h2>
          <div className="flex gap-2">
            {tongueExercises.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index <= currentExerciseIndex ? 'bg-accent w-8' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Card */}
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 rounded-2xl p-8 text-center space-y-6">
        {/* Emoji Animation */}
        <div className={`text-7xl transition-transform ${isActive ? 'animate-pulse' : ''}`}>
          👅
        </div>

        <div>
          <h3 className="text-3xl font-bold text-foreground mb-2">{exercise.name}</h3>
          <p className="text-muted-foreground">{exercise.description}</p>
        </div>

        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
          <p className="text-foreground font-medium">{exercise.instruction}</p>
        </div>

        {!isActive && (
          <button
            onClick={startExercise}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <Play size={20} />
            Start Exercise
          </button>
        )}

        {isActive && (
          <div className="space-y-4">
            <div className="text-5xl font-bold text-accent">{repsLeft} / {exercise.reps}</div>
            <p className="text-muted-foreground">Almost there! Keep it up!</p>
            <button
              onClick={completeExercise}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg mx-auto transition-colors"
            >
              Done!
            </button>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <p className="text-sm font-semibold text-foreground mb-2">Tips:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Move gently and deliberately</li>
          <li>• Don't force it - only go as far as comfortable</li>
          <li>• Practice daily for best results</li>
        </ul>
      </div>
    </div>
  )
}
