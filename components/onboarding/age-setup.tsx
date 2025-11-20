'use client'

import { useState } from 'react'

interface AgeSetupProps {
  onComplete: (data: { age: number }) => void
}

export default function AgeSetup({ onComplete }: AgeSetupProps) {
  const [age, setAge] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (age && parseInt(age) > 0 && parseInt(age) <= 120) {
      onComplete({ age: parseInt(age) })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">What's your age?</h2>
          <p className="text-muted-foreground">This helps us tailor content to your level</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm font-medium text-foreground">
              Age
            </label>
            <input
              id="age"
              type="number"
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-card text-foreground text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={!age || parseInt(age) <= 0}
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Start Practicing
          </button>
        </form>
      </div>
    </div>
  )
}
