'use client'

import { useState } from 'react'
import { Flame, Star, ChevronRight, Lock, CheckCircle2, Circle, TrendingUp } from 'lucide-react'

import { SchedulePreferences } from '../onboarding/practice-scheduler'

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

interface MainDashboardProps {
  userProfile: UserProfile
  onNavigate: (screen: string) => void
}

interface LessonNode {
  id: string
  title: string
  type: 'warm-up' | 'practice' | 'challenge'
  game: string
  completed: boolean
  locked: boolean
  level: number
}

export default function MainDashboard({ userProfile, onNavigate }: MainDashboardProps) {
  const [streak, setStreak] = useState(5)
  const [stars, setStars] = useState(240)

  // Path-based lessons (Duolingo style)
  const lessons: LessonNode[] = [
    {
      id: 'warm-up',
      title: 'Warm Up',
      type: 'warm-up',
      game: 'warm-up',
      completed: false,
      locked: false,
      level: 1,
    },
    {
      id: 'bubble-pop-1',
      title: 'Bubble Pop',
      type: 'practice',
      game: 'bubble-pop',
      completed: false,
      locked: false,
      level: 2,
    },
    {
      id: 'bubble-pop-2',
      title: 'Advanced Sounds',
      type: 'practice',
      game: 'bubble-pop',
      completed: false,
      locked: true,
      level: 3,
    },
    {
      id: 'challenge-1',
      title: 'Speed Challenge',
      type: 'challenge',
      game: 'bubble-pop',
      completed: false,
      locked: true,
      level: 4,
    },
  ]

  const getNodeColor = (lesson: LessonNode) => {
    if (lesson.locked) return '#E5E7EB'
    if (lesson.completed) return '#2A9896'
    if (lesson.type === 'warm-up') return '#4ADEC0'
    if (lesson.type === 'practice') return '#EE8B44'
    return '#152341'
  }

  const getNodeBgColor = (lesson: LessonNode) => {
    if (lesson.locked) return '#F5F7FA'
    if (lesson.completed) return '#E0F5F4'
    if (lesson.type === 'warm-up') return '#E6FBF8'
    if (lesson.type === 'practice') return '#FFF4ED'
    return '#F5F7FA'
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#00B8A3] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm">CB</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#6B7280] font-medium truncate">{getGreeting()}</p>
                <p className="text-xs sm:text-sm font-semibold text-[#152341] truncate">Ready to practice?</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak */}
              <div className="flex items-center gap-1 sm:gap-1.5 bg-[#FFF4ED] px-2 sm:px-3 py-1.5 rounded-full border border-[#EE8B44]/20">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EE8B44]" />
                <span className="text-xs sm:text-sm font-bold text-[#152341]">{streak}</span>
            </div>

            {/* Stars */}
              <div className="flex items-center gap-1 sm:gap-1.5 bg-[#E0F5F4] px-2 sm:px-3 py-1.5 rounded-full border border-[#2A9896]/20">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2A9896] fill-[#2A9896]" />
                <span className="text-xs sm:text-sm font-bold text-[#152341]">{stars}</span>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Path View */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress Overview */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-[#152341]">Your Learning Path</h1>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#6B7280]">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>2 of 4 lessons completed</span>
            </div>
          </div>
          <div className="w-full bg-[#F5F7FA] rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#EE8B44] to-[#2A9896] rounded-full transition-all duration-500"
              style={{ width: '50%' }}
            />
          </div>
        </div>

        {/* Learning Path */}
        <div className="relative">
          {/* Path Line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-[#E5E7EB] hidden sm:block" 
               style={{ marginTop: '32px', marginBottom: '32px' }} />

          {/* Lesson Nodes */}
          <div className="space-y-6">
            {lessons.map((lesson, index) => {
              const nodeColor = getNodeColor(lesson)
              const nodeBgColor = getNodeBgColor(lesson)
              const isLast = index === lessons.length - 1

              return (
                <div key={lesson.id} className="relative flex items-start sm:items-center gap-3 sm:gap-6">
                  {/* Node Circle */}
                  <div className="relative z-10 flex-shrink-0">
          <button
                      onClick={() => !lesson.locked && onNavigate(lesson.game)}
                      disabled={lesson.locked}
                      className={`
                        w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center
                        transition-all duration-300
                        ${lesson.locked 
                          ? 'bg-[#F5F7FA] border-2 border-[#E5E7EB] cursor-not-allowed' 
                          : lesson.completed
                          ? 'bg-[#00B8A3] border-2 border-[#00B8A3] shadow-lg active:scale-95 sm:hover:scale-110'
                          : 'bg-white border-2 border-[#FF6B35] shadow-md active:scale-95 sm:hover:scale-110 sm:hover:shadow-xl'
                        }
                      `}
            style={{
                        borderColor: lesson.locked ? '#E5E7EB' : nodeColor,
                      }}
                    >
                      {lesson.completed ? (
                        <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      ) : lesson.locked ? (
                        <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-[#9CA3AF]" />
                      ) : (
                        <div 
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                          style={{ backgroundColor: nodeColor }}
                        />
                      )}
                    </button>
                    
                    {/* Level Badge */}
                    {!lesson.locked && (
                      <div 
                        className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-white"
                        style={{ backgroundColor: nodeColor }}
                      >
                        {lesson.level}
                      </div>
                    )}
                  </div>

                  {/* Lesson Card */}
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => !lesson.locked && onNavigate(lesson.game)}
                      disabled={lesson.locked}
                      className={`
                        w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-300
                        ${lesson.locked
                          ? 'bg-[#F9FAFB] border-[#E5E7EB] cursor-not-allowed'
                          : lesson.completed
                          ? 'bg-[#E0F5F4] border-[#00B8A3] active:scale-[0.98] sm:hover:shadow-lg sm:hover:scale-[1.02]'
                          : 'bg-white border-[#FF6B35] active:scale-[0.98] sm:hover:shadow-xl sm:hover:scale-[1.01]'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span 
                              className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-1 rounded"
                              style={{
                                backgroundColor: lesson.locked ? '#F5F7FA' : nodeBgColor,
                                color: lesson.locked ? '#9CA3AF' : nodeColor,
                              }}
                            >
                              {lesson.type === 'warm-up' ? 'Warm Up' : 
                               lesson.type === 'practice' ? 'Practice' : 'Challenge'}
                            </span>
                            {lesson.completed && (
                              <span className="text-[10px] sm:text-xs text-[#00B8A3] font-semibold">Completed</span>
                            )}
                          </div>
                          <h3 className={`text-base sm:text-xl font-bold mb-1 ${
                            lesson.locked ? 'text-[#9CA3AF]' : 'text-[#152341]'
                          }`}>
                            {lesson.title}
                </h3>
                          <p className={`text-xs sm:text-sm ${
                            lesson.locked ? 'text-[#9CA3AF]' : 'text-[#6B7280]'
                          }`}>
                            {lesson.type === 'warm-up' && 'Prepare your mouth for practice'}
                            {lesson.type === 'practice' && 'Practice pronunciation with real-time feedback'}
                            {lesson.type === 'challenge' && 'Test your skills with advanced challenges'}
                </p>
              </div>
                        {!lesson.locked && (
                          <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ml-2 sm:ml-4 ${
                            lesson.completed ? 'text-[#00B8A3]' : 'text-[#FF6B35]'
                          }`} />
                        )}
                      </div>
                    </button>
              </div>
            </div>
              )
            })}
          </div>
        </div>

        {/* Daily Goal Card */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-br from-[#FFF4ED] to-[#E6FBF8] rounded-2xl p-4 sm:p-6 border border-[#E5E7EB]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h2 className="text-base sm:text-lg font-bold text-[#152341]">Today's Goal</h2>
            <span className="text-xs sm:text-sm font-semibold text-[#6B7280]">2 / 5 lessons</span>
          </div>
          <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-[#EE8B44] to-[#2A9896] rounded-full transition-all duration-500"
              style={{ width: '40%' }}
            />
          </div>
          <p className="text-sm text-[#6B7280]">
            Complete 3 more lessons to reach your daily goal and maintain your streak!
          </p>
        </div>
      </div>
    </div>
  )
}
