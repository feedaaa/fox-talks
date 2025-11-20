'use client'

import { useState } from 'react'

interface Avatar {
  character: 'robot' | 'wizard' | 'dragon' | 'phoenix'
  color: 'orange' | 'pink' | 'yellow' | 'purple'
}

interface AvatarCustomizationProps {
  onSelect: (avatar: Avatar) => void
  selectedAvatar: Avatar
}

export default function AvatarCustomization({ onSelect, selectedAvatar }: AvatarCustomizationProps) {
  const characters = [
    { id: 'robot', emoji: '🤖', name: 'Robot Buddy' },
    { id: 'wizard', emoji: '🧙', name: 'Wizard' },
    { id: 'dragon', emoji: '🐉', name: 'Dragon' },
    { id: 'phoenix', emoji: '🔥', name: 'Phoenix' },
  ]

  const colors = [
    { id: 'orange', color: '#e67f0d', name: 'Orange' },
    { id: 'pink', color: '#F72C5B', name: 'Pink' },
    { id: 'yellow', color: '#FFC700', name: 'Yellow' },
    { id: 'purple', color: '#667eea', name: 'Purple' },
  ]

  return (
    <div className="space-y-6">
      {/* Character Selection */}
      <div>
        <h3 className="font-bold text-lg mb-3">Pick Your Avatar</h3>
        <div className="grid grid-cols-4 gap-3">
          {characters.map((char) => (
            <button
              key={char.id}
              onClick={() => onSelect({ ...selectedAvatar, character: char.id as Avatar['character'] })}
              className={`p-4 rounded-lg transition-all border-2 ${
                selectedAvatar.character === char.id
                  ? 'border-primary scale-110 bg-primary/10'
                  : 'border-border hover:border-primary'
              }`}
            >
              <div className="text-3xl">{char.emoji}</div>
              <p className="text-xs mt-2 font-medium">{char.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="font-bold text-lg mb-3">Choose Your Color</h3>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((col) => (
            <button
              key={col.id}
              onClick={() => onSelect({ ...selectedAvatar, color: col.id as Avatar['color'] })}
              className={`p-4 rounded-lg transition-all border-2 ${
                selectedAvatar.color === col.id
                  ? 'border-primary scale-105'
                  : 'border-border hover:border-primary'
              }`}
              style={{ backgroundColor: col.color, opacity: selectedAvatar.color === col.id ? 1 : 0.6 }}
            >
              <p className="text-xs font-medium text-white drop-shadow">{col.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
