'use client'

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

interface ParentDashboardProps {
  userProfile: UserProfile
  onBack: () => void
}

export default function ParentDashboard({ userProfile, onBack }: ParentDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-2xl hover:opacity-80">
          ←
        </button>
        <h1 className="text-xl font-bold">Parent Dashboard</h1>
        <div className="w-8"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Overview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Child's Progress</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-muted-foreground text-xs font-medium">This Week</p>
              <p className="text-3xl font-bold text-primary mt-2">12 sessions</p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-muted-foreground text-xs font-medium">Average Time</p>
              <p className="text-3xl font-bold text-accent mt-2">15 min</p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-muted-foreground text-xs font-medium">Points Earned</p>
              <p className="text-3xl font-bold text-primary mt-2">450 ⭐</p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-muted-foreground text-xs font-medium">Current Streak</p>
              <p className="text-3xl font-bold text-accent mt-2">5 days</p>
            </div>
          </div>
        </div>

        {/* Activity Breakdown */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Activities Completed</h2>
          <div className="space-y-3">
            {[
              { name: 'Sound Shaping', count: 8, percentage: 80 },
              { name: 'Word Challenge', count: 5, percentage: 75 },
              { name: 'Story Adventures', count: 3, percentage: 60 },
            ].map((activity) => (
              <div key={activity.name} className="bg-card p-4 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-foreground">{activity.name}</p>
                  <p className="text-sm text-muted-foreground">{activity.count} times</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${activity.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Speech Goals</h2>
          <div className="space-y-3">
            {[
              { goal: 'Improve /s/ sound clarity', progress: 65 },
              { goal: 'Expand vocabulary (current age level)', progress: 80 },
              { goal: 'Increase conversation fluency', progress: 45 },
            ].map((item) => (
              <div key={item.goal} className="bg-card p-4 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-foreground">{item.goal}</p>
                  <p className="text-sm text-muted-foreground">{item.progress}%</p>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-accent h-3 rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg">
          <h3 className="font-bold text-foreground mb-3">Recommendations</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>✓ Great progress on sound shaping! Keep practicing daily for best results.</li>
            <li>✓ Consider setting aside 15-20 min daily for consistent practice.</li>
            <li>✓ Celebrate achievements - the streak system is working great!</li>
            <li>✓ Watch for fatigue - take breaks between sessions if needed.</li>
          </ul>
        </div>

        {/* Contact SLP */}
        <div className="bg-accent/10 border border-accent/50 p-6 rounded-lg text-center">
          <p className="text-foreground font-semibold mb-3">Want to share progress with an SLP?</p>
          <button className="bg-accent text-accent-foreground px-6 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  )
}
