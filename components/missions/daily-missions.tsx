'use client'

import { useState, useEffect } from 'react'
import { Target, CheckCircle2, Star, Trophy, Clock, Zap } from 'lucide-react'

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
}

interface Mission {
  id: string
  title: string
  description: string
  type: 'practice' | 'warmup' | 'game' | 'streak' | 'perfect'
  target: string | null
  progress: number
  goal: number
  reward: number
  completed: boolean
  icon: string
}

interface DailyMissionsProps {
  userProfile: UserProfile
  onBack: () => void
  onStartMission: (missionId: string) => void
}

export default function DailyMissions({ userProfile, onBack, onStartMission }: DailyMissionsProps) {
  const [missions, setMissions] = useState<Mission[]>([])
  const [totalStars, setTotalStars] = useState(0)

  useEffect(() => {
    // Generate personalized daily missions based on user profile
    const generatedMissions = generateDailyMissions(userProfile)
    setMissions(generatedMissions)
  }, [userProfile])

  const completedCount = missions.filter(m => m.completed).length
  const totalRewards = missions.reduce((sum, m) => sum + (m.completed ? m.reward : 0), 0)

  function generateDailyMissions(profile: UserProfile): Mission[] {
    const missions: Mission[] = []
    const isArabic = profile.languages.includes('arabic')
    
    // Mission 1: Practice problem sounds
    if (profile.problemSounds && profile.problemSounds.length > 0) {
      const targetSound = profile.problemSounds[0]
      missions.push({
        id: 'practice-problem-sound',
        title: `Master "${targetSound}"`,
        description: `Practice the sound "${targetSound}" 5 times correctly`,
        type: 'practice',
        target: targetSound,
        progress: 0,
        goal: 5,
        reward: 50,
        completed: false,
        icon: '🎯'
      })
    }

    // Mission 2: Daily warmup
    missions.push({
      id: 'daily-warmup',
      title: 'Warm Up Your Voice',
      description: isArabic 
        ? 'Complete Arabic lip and tongue exercises'
        : 'Complete the lip and tongue warm-up exercises',
      type: 'warmup',
      target: null,
      progress: 0,
      goal: 1,
      reward: 30,
      completed: false,
      icon: '🔥'
    })

    // Mission 3: Play games
    missions.push({
      id: 'play-games',
      title: 'Game Time!',
      description: 'Complete 3 pronunciation games',
      type: 'game',
      target: null,
      progress: 0,
      goal: 3,
      reward: 60,
      completed: false,
      icon: '🎮'
    })

    // Mission 4: Maintain streak
    missions.push({
      id: 'maintain-streak',
      title: 'Keep the Streak!',
      description: 'Practice today to maintain your streak',
      type: 'streak',
      target: null,
      progress: 0,
      goal: 1,
      reward: 40,
      completed: false,
      icon: '🔥'
    })

    // Mission 5: Perfect score challenge
    if (profile.strengths && profile.strengths.length > 0) {
      missions.push({
        id: 'perfect-score',
        title: 'Perfect Performance',
        description: 'Get 100% in any game using your strength sounds',
        type: 'perfect',
        target: null,
        progress: 0,
        goal: 1,
        reward: 100,
        completed: false,
        icon: '💯'
      })
    }

    // Bonus Mission: Practice diverse sounds
    missions.push({
      id: 'diverse-practice',
      title: 'Sound Explorer',
      description: 'Practice 10 different sounds today',
      type: 'practice',
      target: null,
      progress: 0,
      goal: 10,
      reward: 80,
      completed: false,
      icon: '🌟'
    })

    return missions
  }

  const handleMissionClick = (mission: Mission) => {
    if (!mission.completed) {
      onStartMission(mission.id)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-primary/5 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-primary text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <span className="text-2xl">←</span>
            </button>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-bold">{totalStars + totalRewards}</span>
            </div>
          </div>

          <div className="text-center">
            <Target className="w-16 h-16 mx-auto mb-3" />
            <h1 className="text-3xl font-bold mb-2">Daily Missions</h1>
            <p className="text-white/90 text-sm">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Progress Overview */}
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Daily Progress</span>
              <span className="text-sm font-bold">{completedCount} / {missions.length}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / missions.length) * 100}%` }}
              />
            </div>
            {completedCount === missions.length && (
              <div className="mt-3 text-center">
                <Trophy className="w-6 h-6 mx-auto mb-1 animate-bounce" />
                <p className="text-sm font-semibold">All missions complete! 🎉</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Missions List */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {missions.map((mission) => (
          <button
            key={mission.id}
            onClick={() => handleMissionClick(mission)}
            disabled={mission.completed}
            className={`w-full text-left bg-card border-2 rounded-xl p-4 transition-all ${
              mission.completed
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 opacity-90'
                : 'border-border hover:border-primary hover:shadow-lg hover:scale-[1.02]'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`text-4xl ${mission.completed && 'grayscale'}`}>
                {mission.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-foreground">{mission.title}</h3>
                  {mission.completed && (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-3">{mission.description}</p>

                {/* Progress Bar */}
                {!mission.completed && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">
                        {mission.progress} / {mission.goal}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                        style={{ width: `${(mission.progress / mission.goal) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Reward */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">+{mission.reward}</span>
                  </div>
                  
                  {mission.type === 'practice' && (
                    <div className="flex items-center gap-1 text-primary">
                      <Target className="w-4 h-4" />
                      <span className="font-semibold">Practice</span>
                    </div>
                  )}
                  
                  {mission.type === 'game' && (
                    <div className="flex items-center gap-1 text-accent">
                      <Zap className="w-4 h-4" />
                      <span className="font-semibold">Game</span>
                    </div>
                  )}
                  
                  {mission.type === 'warmup' && (
                    <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold">Warm-up</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}

        {/* Completion Bonus Card */}
        {completedCount === missions.length && (
          <div className="bg-gradient-to-r from-primary to-accent text-white rounded-xl p-6 text-center animate-pulse">
            <Trophy className="w-16 h-16 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Mission Complete!</h3>
            <p className="text-white/90 text-sm mb-4">
              You've completed all your daily missions. Amazing work!
            </p>
            <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full inline-flex">
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <span className="text-2xl font-bold">+{totalRewards}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
