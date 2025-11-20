'use client'

import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import LipExercises from './lip-exercises'
import TongueExercises from './tongue-exercises'
import ArabicLipExercises from './arabic-lip-exercises'
import ArabicTongueExercises from './arabic-tongue-exercises'

interface WarmUpFlowProps {
  onBack: () => void
  language?: 'english' | 'arabic'
}

export default function WarmUpFlow({ onBack, language = 'english' }: WarmUpFlowProps) {
  const [currentExercise, setCurrentExercise] = useState<'select' | 'lips' | 'tongue'>('select')

  const isArabic = language === 'arabic'

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">
              {isArabic ? 'تمارين الإحماء - Warm-up Exercises' : 'Warm-up Exercises'}
            </h1>
            <p className="text-primary-foreground/80 text-sm mt-1">
              {isArabic 
                ? 'جهّز فمك لممارسة النطق - Get your mouth ready for speaking practice!' 
                : 'Get your mouth ready for speaking practice!'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentExercise === 'select' && (
          <div className="space-y-6">
            <p className="text-foreground text-center">
              {isArabic ? 'اختر تمريناً للبدء - Choose an exercise to get started:' : 'Choose an exercise to get started:'}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Lip Exercises Card */}
              <button
                onClick={() => setCurrentExercise('lips')}
                className="group p-8 bg-card border-2 border-transparent hover:border-primary rounded-xl transition-all hover:shadow-lg hover:scale-105 text-left"
              >
                <div className="text-5xl mb-4">👄</div>
                <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {isArabic ? 'تمارين الشفاه - Lip Exercises' : 'Lip Exercises'}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {isArabic 
                    ? 'قوّي شفتيك بتمارين التمدد والضم والتبديل - Strengthen your lips with specialized movements'
                    : 'Strengthen your lips with retraction, protrusion, and alternating movements.'}
                </p>
                <p className="text-xs text-muted-foreground font-semibold">
                  {isArabic ? '4 تمارين • 3 دقائق' : '3 exercises • 2 min'}
                </p>
              </button>

              {/* Tongue Exercises Card */}
              <button
                onClick={() => setCurrentExercise('tongue')}
                className="group p-8 bg-card border-2 border-transparent hover:border-accent rounded-xl transition-all hover:shadow-lg hover:scale-105 text-left"
              >
                <div className="text-5xl mb-4">👅</div>
                <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                  {isArabic ? 'تمارين اللسان - Tongue Exercises' : 'Tongue Exercises'}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {isArabic
                    ? 'حسّن مرونة لسانك بتمارين متنوعة - Improve tongue flexibility with specialized movements'
                    : 'Improve tongue flexibility with extension, elevation, and lateralization.'}
                </p>
                <p className="text-xs text-muted-foreground font-semibold">
                  {isArabic ? '6 تمارين • 4 دقائق' : '3 exercises • 2 min'}
                </p>
              </button>
            </div>
          </div>
        )}

        {currentExercise === 'lips' && (
          isArabic ? (
            <ArabicLipExercises onBack={() => setCurrentExercise('select')} />
          ) : (
            <LipExercises onBack={() => setCurrentExercise('select')} />
          )
        )}

        {currentExercise === 'tongue' && (
          isArabic ? (
            <ArabicTongueExercises onBack={() => setCurrentExercise('select')} />
          ) : (
            <TongueExercises onBack={() => setCurrentExercise('select')} />
          )
        )}
      </div>
    </div>
  )
}
