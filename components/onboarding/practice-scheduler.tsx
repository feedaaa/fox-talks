'use client'

import { useState } from 'react'
import { Clock, Bell, CheckCircle2 } from 'lucide-react'

interface PracticeSchedulerProps {
  onComplete: (schedulePreferences: SchedulePreferences) => void
}

export interface SchedulePreferences {
  enabled: boolean
  times: string[]
  days: string[]
  frequency: 'daily' | 'weekdays' | 'custom'
}

export default function PracticeScheduler({ onComplete }: PracticeSchedulerProps) {
  const [enabled, setEnabled] = useState(true)
  const [frequency, setFrequency] = useState<'daily' | 'weekdays' | 'custom'>('daily')
  const [selectedTimes, setSelectedTimes] = useState<string[]>(['09:00'])
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  const [customTime, setCustomTime] = useState('09:00')

  const suggestedTimes = [
    { time: '08:00', label: 'Morning', emoji: '🌅', description: 'Start your day' },
    { time: '12:00', label: 'Noon', emoji: '☀️', description: 'Midday break' },
    { time: '16:00', label: 'Afternoon', emoji: '🌤️', description: 'After school' },
    { time: '19:00', label: 'Evening', emoji: '🌆', description: 'Before dinner' },
    { time: '21:00', label: 'Night', emoji: '🌙', description: 'Before bed' },
  ]

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weekdaysFull = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const handleTimeToggle = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter(t => t !== time))
    } else {
      setSelectedTimes([...selectedTimes, time])
    }
  }

  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }
  }

  const handleAddCustomTime = () => {
    if (customTime && !selectedTimes.includes(customTime)) {
      setSelectedTimes([...selectedTimes, customTime])
    }
  }

  const handleFrequencyChange = (newFrequency: 'daily' | 'weekdays' | 'custom') => {
    setFrequency(newFrequency)
    if (newFrequency === 'daily') {
      setSelectedDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
    } else if (newFrequency === 'weekdays') {
      setSelectedDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
    }
  }

  const handleContinue = () => {
    onComplete({
      enabled,
      times: selectedTimes,
      days: frequency === 'custom' ? selectedDays : [],
      frequency,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <Bell className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            When would you like to practice?
          </h1>
          <p className="text-muted-foreground">
            Set reminders to help build a consistent practice routine
          </p>
        </div>

        {/* Enable/Disable Toggle */}
        <div className="bg-card border-2 border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Practice Reminders</h3>
              <p className="text-sm text-muted-foreground">Get notified when it's time to practice</p>
            </div>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                enabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                  enabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {enabled && (
          <>
            {/* Frequency Selection */}
            <div className="bg-card border-2 border-border rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-4">How often?</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleFrequencyChange('daily')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    frequency === 'daily'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-semibold text-foreground">Every Day</p>
                  <p className="text-xs text-muted-foreground mt-1">7 days/week</p>
                </button>

                <button
                  onClick={() => handleFrequencyChange('weekdays')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    frequency === 'weekdays'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-semibold text-foreground">Weekdays</p>
                  <p className="text-xs text-muted-foreground mt-1">Mon-Fri</p>
                </button>

                <button
                  onClick={() => handleFrequencyChange('custom')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    frequency === 'custom'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-semibold text-foreground">Custom</p>
                  <p className="text-xs text-muted-foreground mt-1">Pick days</p>
                </button>
              </div>

              {frequency === 'custom' && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-foreground mb-3">Select days:</p>
                  <div className="flex flex-wrap gap-2">
                    {weekdays.map((day, index) => (
                      <button
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedDays.includes(day)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        <span className="font-semibold">{day}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Time Selection */}
            <div className="bg-card border-2 border-border rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-4">What time?</h3>
              
              <div className="grid gap-3 mb-4">
                {suggestedTimes.map((timeSlot) => (
                  <button
                    key={timeSlot.time}
                    onClick={() => handleTimeToggle(timeSlot.time)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedTimes.includes(timeSlot.time)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{timeSlot.emoji}</span>
                        <div>
                          <p className="font-semibold text-foreground">{timeSlot.label}</p>
                          <p className="text-sm text-muted-foreground">{timeSlot.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono font-semibold text-foreground">{timeSlot.time}</span>
                        {selectedTimes.includes(timeSlot.time) && (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Time Input */}
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground mb-3">Or choose a custom time:</p>
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-background text-foreground"
                  />
                  <button
                    onClick={handleAddCustomTime}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Selected Times Display */}
              {selectedTimes.length > 0 && (
                <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-2">You'll be reminded at:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTimes.sort().map((time) => (
                      <span
                        key={time}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={enabled && selectedTimes.length === 0}
          className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
        >
          {enabled ? 'Set Reminders' : 'Skip for Now'}
        </button>

        {/* Skip Option */}
        <button
          onClick={() => onComplete({ enabled: false, times: [], days: [], frequency: 'daily' })}
          className="w-full mt-4 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          I'll set this up later
        </button>
      </div>
    </div>
  )
}
