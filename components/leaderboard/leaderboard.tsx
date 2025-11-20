'use client'

import { useState } from 'react'
import { Trophy, Medal, Star, TrendingUp, Award, Crown } from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  avatar: string
  stars: number
  streak: number
  gamesCompleted: number
  isCurrentUser?: boolean
}

interface LeaderboardProps {
  onBack: () => void
  currentUserId: string
}

export default function Leaderboard({ onBack, currentUserId }: LeaderboardProps) {
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'allTime'>('weekly')
  const [ageGroup, setAgeGroup] = useState<'all' | '4-6' | '7-9' | '10-12'>('all')

  // Mock data - would come from backend
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, userId: '1', name: 'Sara M.', avatar: '👧', stars: 1250, streak: 15, gamesCompleted: 45, isCurrentUser: false },
    { rank: 2, userId: '2', name: 'Ahmed K.', avatar: '👦', stars: 1180, streak: 12, gamesCompleted: 42, isCurrentUser: false },
    { rank: 3, userId: '3', name: 'Layla R.', avatar: '👧', stars: 1050, streak: 10, gamesCompleted: 38, isCurrentUser: false },
    { rank: 4, userId: '4', name: 'Omar S.', avatar: '👦', stars: 920, streak: 8, gamesCompleted: 35, isCurrentUser: false },
    { rank: 5, userId: '5', name: 'Fatima A.', avatar: '👧', stars: 880, streak: 7, gamesCompleted: 32, isCurrentUser: false },
    { rank: 6, userId: currentUserId, name: 'You', avatar: '👤', stars: 340, streak: 5, gamesCompleted: 23, isCurrentUser: true },
    { rank: 7, userId: '7', name: 'Yusuf B.', avatar: '👦', stars: 320, streak: 6, gamesCompleted: 20, isCurrentUser: false },
    { rank: 8, userId: '8', name: 'Maryam H.', avatar: '👧', stars: 290, streak: 4, gamesCompleted: 18, isCurrentUser: false },
    { rank: 9, userId: '9', name: 'Ali T.', avatar: '👦', stars: 260, streak: 3, gamesCompleted: 15, isCurrentUser: false },
    { rank: 10, userId: '10', name: 'Noor F.', avatar: '👧', stars: 240, streak: 5, gamesCompleted: 14, isCurrentUser: false },
  ]

  const currentUserEntry = leaderboardData.find(e => e.isCurrentUser)

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />
    return null
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
    if (rank === 2) return 'border-gray-400 bg-gray-50 dark:bg-gray-800/20'
    if (rank === 3) return 'border-amber-600 bg-amber-50 dark:bg-amber-900/20'
    return 'border-border'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <span className="text-2xl">←</span>
            </button>
          </div>

          <div className="text-center">
            <Trophy className="w-16 h-16 mx-auto mb-3" />
            <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
            <p className="text-white/90 text-sm">See how you rank against other learners!</p>
          </div>

          {/* Current User Stats Card */}
          {currentUserEntry && (
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{currentUserEntry.avatar}</div>
                  <div>
                    <p className="font-bold text-lg">Your Rank</p>
                    <p className="text-white/80 text-sm">#{currentUserEntry.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                    <span className="font-bold text-lg">{currentUserEntry.stars}</span>
                  </div>
                  <p className="text-white/80 text-xs">{currentUserEntry.gamesCompleted} games</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-3">
        {/* Period Filter */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">Time Period</p>
          <div className="flex gap-2">
            {[
              { value: 'weekly', label: 'This Week' },
              { value: 'monthly', label: 'This Month' },
              { value: 'allTime', label: 'All Time' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPeriod(option.value as any)}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                  period === option.value
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card border-2 border-border text-muted-foreground hover:border-primary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Age Group Filter */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">Age Group</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: 'all', label: 'All Ages' },
              { value: '4-6', label: '4-6' },
              { value: '7-9', label: '7-9' },
              { value: '10-12', label: '10-12' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setAgeGroup(option.value as any)}
                className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                  ageGroup === option.value
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'bg-card border-2 border-border text-muted-foreground hover:border-accent'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-end justify-center gap-2 mb-8">
          {/* 2nd Place */}
          {leaderboardData[1] && (
            <div className="flex-1 text-center">
              <div className="bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-600 dark:to-gray-800 rounded-xl p-4 mb-2 border-4 border-gray-400 dark:border-gray-600">
                <Medal className="w-8 h-8 mx-auto mb-2 text-gray-600 dark:text-gray-300" />
                <div className="text-4xl mb-2">{leaderboardData[1].avatar}</div>
                <p className="font-bold text-sm text-gray-800 dark:text-gray-200">{leaderboardData[1].name}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-xs text-gray-700 dark:text-gray-300">{leaderboardData[1].stars}</span>
                </div>
              </div>
              <div className="bg-gray-300 dark:bg-gray-700 h-20 rounded-t-xl flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-600 dark:text-gray-300">2</span>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {leaderboardData[0] && (
            <div className="flex-1 text-center">
              <div className="bg-gradient-to-br from-yellow-200 to-yellow-500 dark:from-yellow-600 dark:to-yellow-800 rounded-xl p-4 mb-2 border-4 border-yellow-500">
                <Crown className="w-10 h-10 mx-auto mb-2 text-yellow-700 dark:text-yellow-300 animate-pulse" />
                <div className="text-5xl mb-2">{leaderboardData[0].avatar}</div>
                <p className="font-bold text-yellow-900 dark:text-yellow-100">{leaderboardData[0].name}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                  <span className="font-bold text-yellow-800 dark:text-yellow-200">{leaderboardData[0].stars}</span>
                </div>
              </div>
              <div className="bg-yellow-400 dark:bg-yellow-600 h-32 rounded-t-xl flex items-center justify-center">
                <span className="text-4xl font-bold text-yellow-800 dark:text-yellow-200">1</span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {leaderboardData[2] && (
            <div className="flex-1 text-center">
              <div className="bg-gradient-to-br from-amber-200 to-amber-600 dark:from-amber-600 dark:to-amber-800 rounded-xl p-4 mb-2 border-4 border-amber-600">
                <Medal className="w-8 h-8 mx-auto mb-2 text-amber-800 dark:text-amber-300" />
                <div className="text-4xl mb-2">{leaderboardData[2].avatar}</div>
                <p className="font-bold text-sm text-amber-900 dark:text-amber-100">{leaderboardData[2].name}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-xs text-amber-800 dark:text-amber-200">{leaderboardData[2].stars}</span>
                </div>
              </div>
              <div className="bg-amber-400 dark:bg-amber-700 h-16 rounded-t-xl flex items-center justify-center">
                <span className="text-3xl font-bold text-amber-800 dark:text-amber-200">3</span>
              </div>
            </div>
          )}
        </div>

        {/* Rest of Leaderboard */}
        <div className="space-y-2">
          {leaderboardData.slice(3).map((entry) => (
            <div
              key={entry.userId}
              className={`bg-card border-2 rounded-xl p-4 transition-all ${
                entry.isCurrentUser
                  ? 'border-primary bg-primary/5 shadow-lg'
                  : getRankColor(entry.rank)
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-8 text-center">
                  {getRankIcon(entry.rank) || (
                    <span className="text-xl font-bold text-muted-foreground">#{entry.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className="text-3xl">{entry.avatar}</div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`font-bold ${entry.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                    {entry.name}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {entry.gamesCompleted} games
                    </span>
                    <span className="flex items-center gap-1">
                      🔥 {entry.streak} day streak
                    </span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-foreground">{entry.stars}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 bg-card border-2 border-border rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Privacy & Safety</p>
              <p className="text-xs text-muted-foreground">
                Only first names and initials are shown to protect privacy. All participants are verified learners in your age group.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
