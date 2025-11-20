'use client'

import { useState } from 'react'
import WelcomeScreen from './welcome-screen'
import UserTypeSelection from './user-type-selection'
import LanguageSelection from './language-selection'
import DisorderAssessment from './disorder-assessment'
import AgeSetup from './age-setup'
import SpeechAssessment from '../assessment/speech-assessment'
import PracticeScheduler, { SchedulePreferences } from './practice-scheduler'

interface UserProfile {
  userType: 'child' | 'parent'
  languages: string[]
  age?: number
  disorders: string[]
  completedAssessment: boolean
  problemSounds?: string[]
  strengths?: string[]
  assessmentScore?: number
  recommendedLevel?: number
  practiceSchedule?: SchedulePreferences
}

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void
}

type OnboardingStep = 'welcome' | 'userType' | 'language' | 'assessment' | 'ageSetup' | 'speechAssessment' | 'practiceSchedule'

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome')
  const [profile, setProfile] = useState<Partial<UserProfile>>({})

  const handleStepComplete = (data: any, nextStep: OnboardingStep) => {
    setProfile(prev => ({ ...prev, ...data }))
    setCurrentStep(nextStep)
  }

  const handleOnboardingFinish = (ageData: any) => {
    setProfile(prev => ({ ...prev, ...ageData }))
    setCurrentStep('speechAssessment')
  }

  const handleAssessmentComplete = (results: any) => {
    setProfile(prev => ({
      ...prev,
      problemSounds: results.problemSounds,
      strengths: results.strengths,
      assessmentScore: results.overallScore,
      recommendedLevel: results.recommendedStartLevel,
    }))
    setCurrentStep('practiceSchedule')
  }

  const handleScheduleComplete = (scheduleData: SchedulePreferences) => {
    const finalProfile: UserProfile = {
      userType: profile.userType as 'child' | 'parent',
      languages: profile.languages || [],
      age: profile.age,
      disorders: profile.disorders || [],
      completedAssessment: true,
      problemSounds: profile.problemSounds,
      strengths: profile.strengths,
      assessmentScore: profile.assessmentScore,
      recommendedLevel: profile.recommendedLevel,
      practiceSchedule: scheduleData,
    }
    onComplete(finalProfile)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {currentStep === 'welcome' && (
        <WelcomeScreen onContinue={() => handleStepComplete({}, 'userType')} />
      )}
      
      {currentStep === 'userType' && (
        <UserTypeSelection 
          onSelect={(userType) => handleStepComplete({ userType }, 'language')} 
        />
      )}
      
      {currentStep === 'language' && (
        <LanguageSelection
          onComplete={(languages) => handleStepComplete({ languages }, 'assessment')}
        />
      )}
      
      {currentStep === 'assessment' && (
        <DisorderAssessment
          userType={profile.userType as 'child' | 'parent'}
          onComplete={(disorders) => handleStepComplete({ disorders }, 'ageSetup')}
        />
      )}
      
      {currentStep === 'ageSetup' && (
        <AgeSetup onComplete={handleOnboardingFinish} />
      )}
      
      {currentStep === 'speechAssessment' && (
        <SpeechAssessment
          onComplete={handleAssessmentComplete}
          language={(profile.languages?.[0] === 'arabic' ? 'arabic' : 'english') as 'english' | 'arabic'}
        />
      )}
      
      {currentStep === 'practiceSchedule' && (
        <PracticeScheduler onComplete={handleScheduleComplete} />
      )}
    </div>
  )
}
