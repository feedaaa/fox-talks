'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface LanguageSelectionProps {
  onComplete: (languages: string[]) => void
}

const LANGUAGES = [
  {
    id: 'english',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇺🇸',
    description: 'Practice English pronunciation and sounds'
  },
  {
    id: 'arabic',
    label: 'Arabic',
    nativeLabel: 'العربية',
    flag: '🇦🇪',
    description: 'Practice Arabic pronunciation and letters'
  }
]

export default function LanguageSelection({ onComplete }: LanguageSelectionProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  const handleLanguageToggle = (languageId: string) => {
    if (selectedLanguages.includes(languageId)) {
      setSelectedLanguages(selectedLanguages.filter(id => id !== languageId))
    } else {
      setSelectedLanguages([...selectedLanguages, languageId])
    }
  }

  const handleContinue = () => {
    if (selectedLanguages.length > 0) {
      onComplete(selectedLanguages)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Which language(s) are spoken at home?
          </h2>
          <p className="text-muted-foreground">
            Select at least one language to personalize your learning experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {LANGUAGES.map(language => {
            const isSelected = selectedLanguages.includes(language.id)
            
            return (
              <button
                key={language.id}
                onClick={() => handleLanguageToggle(language.id)}
                className={`group relative p-8 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-lg scale-105'
                    : 'border-border hover:border-primary/50 hover:shadow-md hover:scale-102'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                )}
                
                <div className="space-y-4 text-center">
                  <div className="text-6xl">{language.flag}</div>
                  
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-foreground">
                      {language.label}
                    </h3>
                    <p className="text-xl text-muted-foreground font-medium">
                      {language.nativeLabel}
                    </p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {language.description}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Selected: {selectedLanguages.length} language{selectedLanguages.length !== 1 ? 's' : ''}
          </p>
          
          <button
            onClick={handleContinue}
            disabled={selectedLanguages.length === 0}
            className="w-full bg-gradient-to-r from-[#FF6B35] to-[#EE8B44] text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
