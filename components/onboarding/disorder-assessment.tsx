'use client'

import { useState } from 'react'

interface DisorderAssessmentProps {
  userType: 'child' | 'parent'
  onComplete: (disorders: string[]) => void
}

const DISORDERS = [
  { id: 'asd', label: 'Autism Spectrum Disorder (ASD)'},
  { id: 'apraxia', label: 'Apraxia of Speech'},
  { id: 'adhd', label: 'ADHD'},
  { id: 'brain_injury', label: 'Brain Injury'},
  { id: 'cerebral_palsy', label: 'Cerebral Palsy'},
  { id: 'dyspraxia', label: 'Dyspraxia (Developmental Coordination Disorder)'},
  { id: 'dysarthria', label: 'Dysarthria'},
  { id: 'stuttering', label: 'Stuttering'},
  { id: 'none', label: 'I have no diagnosed disorder'},
  { id: 'other', label: 'Other/Multiple conditions'},
]

export default function DisorderAssessment({ userType, onComplete }: DisorderAssessmentProps) {
  const [selected, setSelected] = useState<string[]>([])

  const handleSelect = (id: string) => {
    // If "none" or "other" is selected, clear others and select only that
    if (id === 'none' || id === 'other') {
      setSelected([id])
    } else {
      // If selecting specific disorders, remove "none" if present
      const updated = selected.includes(id)
        ? selected.filter(item => item !== id)
        : [...selected.filter(item => item !== 'none' && item !== 'other'), id]
      setSelected(updated)
    }
  }

  const handleContinue = () => {
    if (selected.length > 0) {
      onComplete(selected)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            {userType === 'child' 
              ? 'Have you been diagnosed with any speech or communication challenges?'
              : 'Does your child have any diagnosed speech or communication challenges?'}
          </h2>
          <p className="text-muted-foreground">This helps us personalize your experience</p>
        </div>

        <div className="grid gap-3">
          {DISORDERS.map(disorder => (
            <button
              key={disorder.id}
              onClick={() => handleSelect(disorder.id)}
              className={`p-4 text-left rounded-lg border-2 transition-all ${
                selected.includes(disorder.id)
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected.includes(disorder.id)}
                  readOnly
                  className="w-5 h-5"
                />
                <span className="text-2xl">{disorder.icon}</span>
                <span className="font-medium text-foreground">{disorder.label}</span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
