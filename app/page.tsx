'use client'

import { useState } from 'react'
import OnboardingFlow from '@/components/onboarding/onboarding-flow'
import MainDashboard from '@/components/dashboard/main-dashboard'
import SoundShapingGame from '@/components/games/sound-shaping-game'
import WordChallengeGame from '@/components/games/word-challenge-game'
import ParentDashboard from '@/components/dashboard/parent-dashboard'
import BubblePopGame from '@/components/games/bubble-pop-game'
import WarmUpFlow from '@/components/warm-up/warm-up-flow'
import SoundSafariGame from '@/components/games/sound-safari-game'
import TurtleTalkAdventure from '@/components/games/turtle-talk-adventure'
import WordExplorerQuest from '@/components/games/word-explorer-quest'
import MemoryMatchMania from '@/components/games/memory-match-mania'
import BottomNav from '@/components/navigation/bottom-nav'
import ProfilePage from '@/components/profile/profile-page'
import DailyMissions from '@/components/missions/daily-missions'
import Leaderboard from '@/components/leaderboard/leaderboard'
import AvatarCustomization from '@/components/avatar-customization'
import { SchedulePreferences } from '@/components/onboarding/practice-scheduler'

type AppScreen = 'onboarding' | 'dashboard' | 'sound-shaping' | 'word-challenge' | 'bubble-pop' | 'warm-up' | 'parent-dashboard' | 'sound-safari' | 'turtle-talk' | 'word-explorer' | 'memory-match' | 'profile' | 'missions' | 'leaderboard' | 'avatar-customization'

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

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('onboarding')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [unreadMissions, setUnreadMissions] = useState(3)

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    setCurrentScreen('dashboard')
  }

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as AppScreen)
    
    // Clear mission badge when user visits missions
    if (screen === 'missions') {
      setUnreadMissions(0)
    }
  }

  const handleStartMission = (missionId: string) => {
    // Navigate to appropriate screen based on mission type
    if (missionId === 'daily-warmup') {
      setCurrentScreen('warm-up')
    } else if (missionId.includes('game')) {
      setCurrentScreen('bubble-pop')
    }
    // Add more mission-to-screen mappings as needed
  }

  const handleAvatarSave = (avatarData: any) => {
    // Save avatar data to user profile
    console.log('Avatar saved:', avatarData)
    setCurrentScreen('profile')
  }

  // Determine primary language for games - if user selected only Arabic, use Arabic throughout
  const primaryLanguage = (userProfile?.languages?.length === 1 && userProfile.languages[0] === 'arabic') 
    ? 'arabic' as const
    : userProfile?.languages?.includes('arabic') 
    ? 'arabic' as const 
    : 'english' as const

  // Screens that should show bottom navigation
  const showBottomNav = userProfile && !['onboarding', 'avatar-customization'].includes(currentScreen)

  return (
    <main className="min-h-screen bg-background relative">
      {currentScreen === 'onboarding' && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}

      {currentScreen === 'dashboard' && userProfile && (
        <MainDashboard
          userProfile={userProfile}
          onNavigate={handleNavigate}
        />
      )}

      {currentScreen === 'sound-shaping' && userProfile && (
        <SoundShapingGame
          userProfile={userProfile}
          onBack={() => setCurrentScreen('dashboard')}
          language={primaryLanguage}
        />
      )}

      {currentScreen === 'word-challenge' && userProfile && (
        <WordChallengeGame
          userProfile={userProfile}
          onBack={() => setCurrentScreen('dashboard')}
          language={primaryLanguage}
        />
      )}

      {currentScreen === 'bubble-pop' && userProfile && (
        <BubblePopGame
          userProfile={userProfile}
          onBack={() => setCurrentScreen('dashboard')}
          language={primaryLanguage}
        />
      )}

      {currentScreen === 'sound-safari' && userProfile && (
        <SoundSafariGame
          userProfile={userProfile}
          onBack={() => setCurrentScreen('dashboard')}
          language={primaryLanguage}
        />
      )}

      {currentScreen === 'turtle-talk' && userProfile && (
        <TurtleTalkAdventure
          userProfile={userProfile}
          onBack={() => setCurrentScreen('dashboard')}
          language={primaryLanguage}
        />
      )}

      {currentScreen === 'word-explorer' && userProfile && (
        <WordExplorerQuest
          userProfile={userProfile}
          onBack={() => setCurrentScreen('dashboard')}
          language={primaryLanguage}
        />
      )}

      {currentScreen === 'memory-match' && userProfile && (
        <MemoryMatchMania
          userProfile={userProfile}
          onBack={() => setCurrentScreen('dashboard')}
          language={primaryLanguage}
        />
      )}

      {currentScreen === 'warm-up' && userProfile && (
        <WarmUpFlow
          onBack={() => setCurrentScreen('dashboard')}
          language={primaryLanguage}
        />
      )}

      {currentScreen === 'parent-dashboard' && userProfile && (
        <ParentDashboard
          userProfile={userProfile}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'profile' && userProfile && (
        <ProfilePage
          userProfile={userProfile}
          onBack={() => setCurrentScreen('dashboard')}
          onEditAvatar={() => setCurrentScreen('avatar-customization')}
        />
      )}

      {currentScreen === 'missions' && userProfile && (
        <DailyMissions
          userProfile={userProfile}
          onBack={() => setCurrentScreen('dashboard')}
          onStartMission={handleStartMission}
        />
      )}

      {currentScreen === 'leaderboard' && userProfile && (
        <Leaderboard
          currentUserId="current-user-id"
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'avatar-customization' && userProfile && (
        <AvatarCustomization
          onSave={handleAvatarSave}
        />
      )}

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          unreadMissions={unreadMissions}
        />
      )}
    </main>
  )
}
