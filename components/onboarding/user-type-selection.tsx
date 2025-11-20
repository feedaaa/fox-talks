'use client'

interface UserTypeSelectionProps {
  onSelect: (userType: 'child' | 'parent') => void
}

export default function UserTypeSelection({ onSelect }: UserTypeSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Who are you?</h2>
          <p className="text-muted-foreground">Let us personalize your experience</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Child Option */}
          <button
            onClick={() => onSelect('child')}
            className="group p-8 bg-card border-2 border-transparent hover:border-primary rounded-xl transition-all hover:shadow-lg hover:scale-105"
          >
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 mx-auto overflow-hidden rounded-full">
                <img src="/boy.png" alt="Child avatar" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                I'm an Individual
              </h3>
              <p className="text-muted-foreground text-sm">
                I want to practice and improve my speech with fun games
              </p>
            </div>
          </button>

          {/* Parent Option */}
          <button
            onClick={() => onSelect('parent')}
            className="group p-8 bg-card border-2 border-transparent hover:border-accent rounded-xl transition-all hover:shadow-lg hover:scale-105"
          >
            <div className="space-y-4 text-center">
                <div className="w-20 h-20 mx-auto overflow-hidden rounded-full">
                <img src="/nerd.png" alt="Parent avatar" className="w-full h-full object-cover" />
                </div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                I'm a Parent/Guardian
              </h3>
              <p className="text-muted-foreground text-sm">
                I want to guide my child's speech practice and track progress
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
