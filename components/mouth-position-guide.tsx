'use client'

import { useState } from 'react'
import { Info, X } from 'lucide-react'

interface MouthPositionGuideProps {
  target: string
  language?: 'english' | 'arabic'
  onClose?: () => void
}

// Map sounds to mouth position categories based on the guide
const getMouthPosition = (target: string, language: 'english' | 'arabic' = 'english'): string => {
  const normalized = target.toLowerCase().trim()
  
  if (language === 'arabic') {
    // Arabic letter mappings
    const arabicMappings: Record<string, string> = {
      'ب': 'arabic-labial',
      'م': 'arabic-labial',
      'و': 'arabic-labial',
      'ف': 'arabic-labial',
      'ت': 'arabic-dental',
      'د': 'arabic-dental',
      'ط': 'arabic-dental-heavy',
      'ث': 'arabic-dental',
      'ذ': 'arabic-dental',
      'ظ': 'arabic-dental-heavy',
      'ن': 'arabic-alveolar',
      'ل': 'arabic-alveolar',
      'ر': 'arabic-alveolar',
      'س': 'arabic-alveolar',
      'ز': 'arabic-alveolar',
      'ص': 'arabic-alveolar-heavy',
      'ج': 'arabic-palatal',
      'ش': 'arabic-palatal',
      'ي': 'arabic-palatal',
      'ك': 'arabic-velar',
      'ق': 'arabic-velar',
      'ع': 'arabic-guttural',
      'غ': 'arabic-guttural',
      'خ': 'arabic-guttural',
      'ح': 'arabic-guttural',
      'ه': 'arabic-guttural',
      'ء': 'arabic-guttural',
    }
    
    // Check for Arabic letter
    for (const [letter, position] of Object.entries(arabicMappings)) {
      if (normalized.includes(letter)) {
        return position
      }
    }
  }
  
  // English mappings (existing logic)
  // Single letters/sounds
  if (normalized.length === 1) {
    if (['a', 'e', 'i'].includes(normalized)) return 'a-e-i'
    if (['b', 'm', 'p'].includes(normalized)) return 'b-m-p'
    if (normalized === 'u') return 'u'
    if (normalized === 'o') return 'o'
    if (normalized === 'l') return 'l'
    if (normalized === 'r') return 'r'
    if (['f', 'v'].includes(normalized)) return 'f-v'
    if (normalized === 'th' || normalized.includes('th')) return 'th'
    if (['w', 'q'].includes(normalized)) return 'w-q'
    if (['ch', 'j', 'sh'].some(s => normalized.includes(s))) return 'ch-j-sh'
    return 'general'
  }
  
  // Words - check for specific sounds
  if (normalized.includes('th')) return 'th'
  if (normalized.match(/[bcdfghjklmnpqrstvwxyz]/)) {
    // Check first letter
    const firstChar = normalized[0]
    if (['b', 'm', 'p'].includes(firstChar)) return 'b-m-p'
    if (['f', 'v'].includes(firstChar)) return 'f-v'
    if (['l'].includes(firstChar)) return 'l'
    if (['r'].includes(firstChar)) return 'r'
    if (['w', 'q'].includes(firstChar)) return 'w-q'
    if (normalized.includes('ch') || normalized.includes('sh') || normalized.includes('j')) return 'ch-j-sh'
  }
  
  // Vowels
  if (normalized.match(/^[aei]/)) return 'a-e-i'
  if (normalized.match(/^u/)) return 'u'
  if (normalized.match(/^o/)) return 'o'
  
  return 'general'
}

const mouthPositionInfo: Record<string, { label: string; description: string; tip: string }> = {
  // English positions
  'a-e-i': {
    label: 'Open Vowel (a, e, i)',
    description: 'Lips slightly parted, showing teeth',
    tip: 'Keep your mouth open with teeth visible. Tongue stays low.'
  },
  'b-m-p': {
    label: 'Bilabial (b, m, p)',
    description: 'Lips completely closed',
    tip: 'Press your lips together firmly. For "m", add a nasal sound.'
  },
  'u': {
    label: 'Rounded Vowel (u)',
    description: 'Lips rounded and pursed',
    tip: 'Round your lips into a small circle, like you\'re saying "oo".'
  },
  'o': {
    label: 'Open Vowel (o)',
    description: 'Mouth wide open',
    tip: 'Open your mouth wide, showing your tongue and throat.'
  },
  'l': {
    label: 'Lateral (l)',
    description: 'Mouth open, tongue up',
    tip: 'Place the tip of your tongue against the roof of your mouth, just behind your teeth.'
  },
  'r': {
    label: 'Rhotic (r)',
    description: 'Tongue pulled back',
    tip: 'Pull your tongue back and slightly raise it. Don\'t let it touch your teeth.'
  },
  'f-v': {
    label: 'Labiodental (f, v)',
    description: 'Upper teeth on lower lip',
    tip: 'Gently place your upper teeth on your lower lip. For "v", add voice.'
  },
  'th': {
    label: 'Dental (th)',
    description: 'Tongue between teeth',
    tip: 'Stick the tip of your tongue slightly between your upper and lower teeth.'
  },
  'w-q': {
    label: 'Labial-Velar (w, q)',
    description: 'Lips rounded, tongue back',
    tip: 'Round your lips and pull your tongue back slightly.'
  },
  'ch-j-sh': {
    label: 'Palatal (ch, j, sh)',
    description: 'Tongue mid-palate',
    tip: 'Raise the middle of your tongue toward the roof of your mouth.'
  },
  'general': {
    label: 'General Consonants',
    description: 'Standard mouth position',
    tip: 'Keep your mouth slightly open. Tongue position varies by sound.'
  },
  
  // Arabic positions
  'arabic-labial': {
    label: 'Arabic Labial (ب م و ف)',
    description: 'Lips together or touching teeth',
    tip: 'For ب and م, press lips together. For ف, upper teeth touch lower lip.'
  },
  'arabic-dental': {
    label: 'Arabic Dental (ت د ث ذ)',
    description: 'Tongue tip touches upper teeth',
    tip: 'Place tongue tip against the back of upper teeth. For ث and ذ, tongue slightly between teeth.'
  },
  'arabic-dental-heavy': {
    label: 'Arabic Heavy Dental (ط ظ)',
    description: 'Tongue against teeth, throat lowered',
    tip: 'Like regular dental but with throat lowered and tongue pulled back slightly for a deeper sound.'
  },
  'arabic-alveolar': {
    label: 'Arabic Alveolar (ن ل ر س ز)',
    description: 'Tongue touches gum ridge',
    tip: 'Place tongue tip on the ridge behind upper teeth. For ر, lightly tap or roll.'
  },
  'arabic-alveolar-heavy': {
    label: 'Arabic Heavy Alveolar (ص ض)',
    description: 'Tongue on gum ridge, throat lowered',
    tip: 'Like regular alveolar but with a heavier, deeper sound from the throat.'
  },
  'arabic-palatal': {
    label: 'Arabic Palatal (ج ش ي)',
    description: 'Tongue raised to roof of mouth',
    tip: 'Raise the middle of your tongue toward the hard palate (roof of mouth).'
  },
  'arabic-velar': {
    label: 'Arabic Velar (ك ق)',
    description: 'Back of tongue raised',
    tip: 'For ك, raise back of tongue to soft palate. For ق, raise it further back and deeper.'
  },
  'arabic-guttural': {
    label: 'Arabic Guttural (ع غ خ ح ه ء)',
    description: 'Sound from throat/glottis',
    tip: 'These sounds come from deep in the throat. Practice with a teacher for proper pronunciation.'
  },
}

export default function MouthPositionGuide({ target, language = 'english', onClose }: MouthPositionGuideProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const position = getMouthPosition(target, language)
  const info = mouthPositionInfo[position] || mouthPositionInfo['general']

  return (
    <div className="bg-white border-2 border-[#E5E7EB] rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-[#152341]">Mouth Position Guide</h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-[#F5F7FA] rounded transition-colors"
            >
              <Info className="w-4 h-4 text-[#6B7280]" />
            </button>
          </div>
          <p className="text-xs text-[#6B7280]">{info.label}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F5F7FA] rounded transition-colors"
          >
            <X className="w-4 h-4 text-[#6B7280]" />
          </button>
        )}
      </div>

      {/* Mouth Position Image */}
      <div className="relative bg-white rounded-lg border-2 border-[#E5E7EB] mb-3 overflow-hidden shadow-sm" style={{ aspectRatio: '1', minHeight: '200px' }}>
        {/* Placeholder - shown when image doesn't exist */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#F5F7FA]">
          <div className="text-center space-y-3 p-4">
            {/* Simplified mouth illustration placeholder */}
            <div className="relative mx-auto" style={{ width: '120px', height: '100px' }}>
              {/* Lips placeholder - varies by position */}
              {position === 'b-m-p' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-8 rounded-full border-4 border-[#EE8B44]" style={{ borderTopWidth: '6px', borderBottomWidth: '6px' }} />
                </div>
              )}
              {position === 'f-v' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-6 border-t-4 border-[#EE8B44] rounded-t-full" />
                  <div className="absolute bottom-0 w-20 h-4 border-b-2 border-[#EE8B44] rounded-b-full" />
                </div>
              )}
              {['a-e-i', 'o', 'l'].includes(position) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-16 rounded-full border-4 border-[#EE8B44] bg-[#FFF4ED]/30" />
                </div>
              )}
              {position === 'u' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-[#EE8B44]" />
                </div>
              )}
              {position === 'th' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-8 rounded-full border-4 border-[#EE8B44]" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-6 bg-[#4ADEC0] rounded-full" />
                </div>
              )}
              {!['b-m-p', 'f-v', 'a-e-i', 'o', 'l', 'u', 'th'].includes(position) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-12 rounded-full border-4 border-[#EE8B44] bg-[#FFF4ED]/30" />
                </div>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#152341]">{info.label}</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Mouth position guide</p>
            </div>
          </div>
        </div>
        
        {/* Actual image - will show when available */}
        <img
          src={`/mouth-positions/${position}.png`}
          alt={`Mouth position for ${info.label}`}
          className="w-full h-full object-contain absolute inset-0"
          style={{ 
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
          onLoad={(e) => {
            // Show image when loaded
            e.currentTarget.style.opacity = '1'
            // Hide placeholder
            const placeholder = e.currentTarget.previousElementSibling as HTMLElement
            if (placeholder) placeholder.style.display = 'none'
          }}
          onError={(e) => {
            // Keep placeholder visible if image fails to load
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-[#E5E7EB] space-y-2 animate-slide-up">
          <div>
            <p className="text-xs font-semibold text-[#152341] mb-1">How to form this sound:</p>
            <p className="text-xs text-[#6B7280] leading-relaxed">{info.description}</p>
          </div>
          <div className="bg-[#F9FAFB] p-2 rounded-lg border border-[#E5E7EB]">
            <p className="text-xs font-semibold text-[#EE8B44] mb-1">Tip:</p>
            <p className="text-xs text-[#6B7280] leading-relaxed">{info.tip}</p>
          </div>
        </div>
      )}
    </div>
  )
}

