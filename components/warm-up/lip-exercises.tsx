'use client'

import { useState } from 'react'
import { ChevronLeft, Play } from 'lucide-react'

interface LipExercisesProps {
  onBack: () => void
}

const lipExercises = [
  {
    id: 1,
    name: 'Lip Retraction',
    description: 'Smile widely to stretch your lip muscles',
    instruction: 'Pull the corners of your mouth back as if smiling widely. Hold for 3 seconds.',
    duration: 10,
    reps: 5,
  },
  {
    id: 2,
    name: 'Lip Protrusion',
    description: 'Pucker your lips in a kissing motion',
    instruction: 'Push your lips forward as if making a kissing motion. Hold for 3 seconds.',
    duration: 10,
    reps: 5,
  },
  {
    id: 3,
    name: 'Alternating Smile & Pucker',
    description: 'Switch between smiling and puckering',
    instruction: 'Alternate between a wide smile and a pucker. Do this 10 times slowly.',
    duration: 15,
    reps: 10,
  },
]

export default function LipExercises({ onBack }: LipExercisesProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(lipExercises[0].duration)
  const [repsLeft, setRepsLeft] = useState(lipExercises[0].reps)

  const exercise = lipExercises[currentExerciseIndex]

  const startExercise = () => {
    setIsActive(true)
    setTimeLeft(exercise.duration)
    setRepsLeft(exercise.reps)
  }

  const completeExercise = () => {
    setIsActive(false)
    if (currentExerciseIndex < lipExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      setTimeLeft(lipExercises[currentExerciseIndex + 1].duration)
    }
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
          <h2 className="text-lg font-semibold text-foreground">Exercise {currentExerciseIndex + 1} of {lipExercises.length}</h2>
          <div className="flex gap-2">
            {lipExercises.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index <= currentExerciseIndex ? 'bg-primary w-8' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Card */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl p-8 text-center space-y-6">
        {/* Emoji Animation */}
        <div className={`text-7xl transition-transform ${isActive ? 'animate-bounce' : ''}`}>
          {exercise.id === 1 ? '😊' : exercise.id === 2 ? '😘' : '😄'}
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
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <Play size={20} />
            Start Exercise
          </button>
        )}

        {isActive && (
          <div className="space-y-4">
            <div className="text-5xl font-bold text-primary">{repsLeft} / {exercise.reps}</div>
            <p className="text-muted-foreground">Keep going! You've got this!</p>
            <button
              onClick={completeExercise}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-6 rounded-lg mx-auto transition-colors"
            >
              Done!
            </button>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <p className="text-sm font-semibold text-foreground mb-2">Tips:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Move slowly and controlled</li>
          <li>• Breathe normally throughout</li>
          <li>• Do this 1-2 times per day for best results</li>
        </ul>
      </div>
    </div>
  )
}
