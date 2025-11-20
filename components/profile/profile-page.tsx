'use client'

import { useState } from 'react'
import { Settings, Star, Trophy, TrendingUp, Award, Calendar, Edit2, Bell } from 'lucide-react'
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

interface ProfilePageProps {
  userProfile: UserProfile
  onBack: () => void
  onEditAvatar: () => void
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress?: number
  maxProgress?: number
}

export default function ProfilePage({ userProfile, onBack, onEditAvatar }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'stats'>('overview')

  // Mock data - would come from actual tracking
  const stats = {
    totalPracticeTime: 450, // minutes
    daysActive: 12,
    currentStreak: 5,
    longestStreak: 8,
    totalStars: 340,
    gamesCompleted: 23,
    soundsMastered: userProfile.strengths?.length || 0,
    soundsPracticing: userProfile.problemSounds?.length || 0,
  }

  const achievements: Achievement[] = [
    { id: 'first-practice', title: 'First Steps', description: 'Complete your first practice session', icon: '🎯', unlocked: true },
    { id: 'week-streak', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', unlocked: false, progress: stats.currentStreak, maxProgress: 7 },
    { id: 'sound-master', title: 'Sound Master', description: 'Master 10 different sounds', icon: '🎓', unlocked: false, progress: stats.soundsMastered, maxProgress: 10 },
    { id: 'early-bird', title: 'Early Bird', description: 'Practice in the morning 5 times', icon: '🌅', unlocked: true },
    { id: 'night-owl', title: 'Night Owl', description: 'Practice in the evening 5 times', icon: '🦉', unlocked: false },
    { id: 'perfect-score', title: 'Perfect Score', description: 'Get 100% in any game', icon: '💯', unlocked: false },
    { id: 'collector', title: 'Star Collector', description: 'Earn 500 stars', icon: '⭐', unlocked: false, progress: stats.totalStars, maxProgress: 500 },
    { id: 'dedicated', title: 'Dedicated Learner', description: 'Practice for 30 days', icon: '📅', unlocked: false, progress: stats.daysActive, maxProgress: 30 },
  ]

  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <span className="text-2xl">←</span>
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>

          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl border-4 border-white/30">
                👤
              </div>
              <button
                onClick={onEditAvatar}
                className="absolute bottom-0 right-0 w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="text-2xl font-bold mb-1">
              {userProfile.userType === 'child' ? 'My Profile' : 'Parent Account'}
            </h1>
            <p className="text-white/80 text-sm">
              Age {userProfile.age} • {userProfile.languages.map(l => l === 'arabic' ? 'العربية' : 'English').join(' & ')}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold">{stats.currentStreak}</div>
                <div className="text-xs text-white/80">Day Streak</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold">{stats.totalStars}</div>
                <div className="text-xs text-white/80">Total Stars</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold">{unlockedCount}</div>
                <div className="text-xs text-white/80">Achievements</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'achievements', label: 'Achievements' },
              { id: 'stats', label: 'Statistics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-4 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Assessment Results */}
            {userProfile.assessmentScore !== undefined && (
              <div className="bg-card border-2 border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Assessment Results
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Overall Score</span>
                      <span className="text-sm font-bold text-primary">{userProfile.assessmentScore}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all"
                        style={{ width: `${userProfile.assessmentScore}%` }}
                      />
                    </div>
                  </div>

                  {userProfile.strengths && userProfile.strengths.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">✅ Strengths ({userProfile.strengths.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.strengths.map((sound) => (
                          <span key={sound} className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full text-sm font-semibold">
                            {sound}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {userProfile.problemSounds && userProfile.problemSounds.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">🎯 Practicing ({userProfile.problemSounds.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.problemSounds.map((sound) => (
                          <span key={sound} className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 rounded-full text-sm font-semibold">
                            {sound}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Practice Schedule */}
            {userProfile.practiceSchedule?.enabled && (
              <div className="bg-card border-2 border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-accent" />
                  Practice Schedule
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Frequency</span>
                    <span className="text-sm font-semibold text-foreground capitalize">
                      {userProfile.practiceSchedule.frequency}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Reminder Times</p>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.practiceSchedule.times.map((time) => (
                        <span key={time} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Achievements */}
            <div className="bg-card border-2 border-border rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Recent Achievements
              </h2>
              <div className="grid gap-3">
                {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <div className="bg-card border-2 border-border rounded-xl p-6 text-center">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {unlockedCount} / {achievements.length}
              </h2>
              <p className="text-muted-foreground">Achievements Unlocked</p>
            </div>

            <div className="grid gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-card border-2 rounded-xl p-4 ${
                    achievement.unlocked
                      ? 'border-primary bg-primary/5'
                      : 'border-border opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-4xl ${!achievement.unlocked && 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground">{achievement.title}</h3>
                        {achievement.unlocked && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-semibold">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      
                      {!achievement.unlocked && achievement.maxProgress && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold text-foreground">
                              {achievement.progress} / {achievement.maxProgress}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border-2 border-border rounded-xl p-4 text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stats.daysActive}</p>
                <p className="text-sm text-muted-foreground">Days Active</p>
              </div>
              <div className="bg-card border-2 border-border rounded-xl p-4 text-center">
                <Star className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stats.totalStars}</p>
                <p className="text-sm text-muted-foreground">Total Stars</p>
              </div>
              <div className="bg-card border-2 border-border rounded-xl p-4 text-center">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stats.gamesCompleted}</p>
                <p className="text-sm text-muted-foreground">Games Completed</p>
              </div>
              <div className="bg-card border-2 border-border rounded-xl p-4 text-center">
                <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{Math.floor(stats.totalPracticeTime / 60)}h {stats.totalPracticeTime % 60}m</p>
                <p className="text-sm text-muted-foreground">Practice Time</p>
              </div>
            </div>

            {/* Streaks */}
            <div className="bg-card border-2 border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4">Streak Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Current Streak</span>
                    <span className="text-sm font-bold text-primary">{stats.currentStreak} days 🔥</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Longest Streak</span>
                    <span className="text-sm font-bold text-foreground">{stats.longestStreak} days 🏆</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
