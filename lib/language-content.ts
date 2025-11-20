// Language-specific content for speech therapy exercises

export type Language = 'english' | 'arabic'

// Arabic letters grouped by articulation points
export const ARABIC_LETTERS = {
  // Labial (شفوية) - lips
  labial: [
    { letter: 'ب', name: 'Baa', sound: 'b', description: 'Like "b" in "book"' },
    { letter: 'م', name: 'Meem', sound: 'm', description: 'Like "m" in "moon"' },
    { letter: 'و', name: 'Waw', sound: 'w/oo', description: 'Like "w" in "water" or "oo" in "moon"' },
    { letter: 'ف', name: 'Faa', sound: 'f', description: 'Like "f" in "fun"' },
  ],
  
  // Dental (أسنانية) - teeth and tongue
  dental: [
    { letter: 'ت', name: 'Taa', sound: 't', description: 'Like "t" in "top"' },
    { letter: 'د', name: 'Daal', sound: 'd', description: 'Like "d" in "door"' },
    { letter: 'ط', name: 'Taa (heavy)', sound: 't̴', description: 'Heavy "t" from deeper in throat' },
    { letter: 'ث', name: 'Thaa', sound: 'th', description: 'Like "th" in "think"' },
    { letter: 'ذ', name: 'Dhaal', sound: 'dh', description: 'Like "th" in "that"' },
    { letter: 'ظ', name: 'Dhaa (heavy)', sound: 'ḏ̴', description: 'Heavy "dh" from deeper in throat' },
  ],
  
  // Alveolar (لثوية) - gum ridge
  alveolar: [
    { letter: 'ن', name: 'Noon', sound: 'n', description: 'Like "n" in "noon"' },
    { letter: 'ل', name: 'Laam', sound: 'l', description: 'Like "l" in "light"' },
    { letter: 'ر', name: 'Raa', sound: 'r', description: 'Rolled "r" sound' },
    { letter: 'س', name: 'Seen', sound: 's', description: 'Like "s" in "sun"' },
    { letter: 'ز', name: 'Zay', sound: 'z', description: 'Like "z" in "zoo"' },
    { letter: 'ص', name: 'Saad', sound: 's̴', description: 'Heavy "s" from deeper in throat' },
  ],
  
  // Palatal (حنكية) - roof of mouth
  palatal: [
    { letter: 'ج', name: 'Jeem', sound: 'j', description: 'Like "j" in "joy"' },
    { letter: 'ش', name: 'Sheen', sound: 'sh', description: 'Like "sh" in "shoe"' },
    { letter: 'ي', name: 'Yaa', sound: 'y/ee', description: 'Like "y" in "yes" or "ee" in "see"' },
  ],
  
  // Velar (طبقية) - back of mouth
  velar: [
    { letter: 'ك', name: 'Kaaf', sound: 'k', description: 'Like "k" in "kite"' },
    { letter: 'ق', name: 'Qaaf', sound: 'q', description: 'Deep "k" from back of throat' },
  ],
  
  // Uvular/Pharyngeal/Glottal (حلقية) - throat
  guttural: [
    { letter: 'ع', name: 'Ayn', sound: 'ʿ', description: 'Deep throat sound (no English equivalent)' },
    { letter: 'غ', name: 'Ghayn', sound: 'gh', description: 'Like French "r" or gargling' },
    { letter: 'خ', name: 'Khaa', sound: 'kh', description: 'Like "ch" in Scottish "loch"' },
    { letter: 'ح', name: 'Haa', sound: 'ḥ', description: 'Strong breathy "h" from throat' },
    { letter: 'ه', name: 'Haa (light)', sound: 'h', description: 'Like "h" in "house"' },
    { letter: 'ء', name: 'Hamza', sound: 'ʔ', description: 'Glottal stop (like middle of "uh-oh")' },
  ],
}

export const ENGLISH_SOUNDS = {
  // Vowels
  vowels: [
    { letter: 'a', sound: 'æ', example: 'cat', description: 'Short "a" sound' },
    { letter: 'e', sound: 'ɛ', example: 'bed', description: 'Short "e" sound' },
    { letter: 'i', sound: 'ɪ', example: 'sit', description: 'Short "i" sound' },
    { letter: 'o', sound: 'ɒ', example: 'hot', description: 'Short "o" sound' },
    { letter: 'u', sound: 'ʌ', example: 'cup', description: 'Short "u" sound' },
  ],
  
  // Consonants
  labial: [
    { letter: 'b', sound: 'b', example: 'ball', description: 'Both lips together' },
    { letter: 'p', sound: 'p', example: 'pop', description: 'Both lips together with air' },
    { letter: 'm', sound: 'm', example: 'mom', description: 'Lips together, nasal' },
    { letter: 'w', sound: 'w', example: 'water', description: 'Round lips' },
  ],
  
  dental: [
    { letter: 'th', sound: 'θ', example: 'think', description: 'Tongue between teeth' },
    { letter: 'th', sound: 'ð', example: 'that', description: 'Tongue between teeth (voiced)' },
  ],
  
  alveolar: [
    { letter: 't', sound: 't', example: 'top', description: 'Tongue on gum ridge' },
    { letter: 'd', sound: 'd', example: 'dog', description: 'Tongue on gum ridge (voiced)' },
    { letter: 'n', sound: 'n', example: 'no', description: 'Tongue on gum ridge, nasal' },
    { letter: 'l', sound: 'l', example: 'lake', description: 'Tongue on gum ridge, air sides' },
    { letter: 's', sound: 's', example: 'sun', description: 'Hissing sound' },
    { letter: 'z', sound: 'z', example: 'zoo', description: 'Hissing sound (voiced)' },
  ],
  
  palatal: [
    { letter: 'sh', sound: 'ʃ', example: 'shoe', description: 'Tongue near roof of mouth' },
    { letter: 'ch', sound: 'tʃ', example: 'chair', description: 'Tongue touches roof' },
    { letter: 'j', sound: 'dʒ', example: 'jump', description: 'Tongue touches roof (voiced)' },
    { letter: 'y', sound: 'j', example: 'yes', description: 'Tongue near roof' },
  ],
  
  velar: [
    { letter: 'k', sound: 'k', example: 'cat', description: 'Back of tongue up' },
    { letter: 'g', sound: 'g', example: 'go', description: 'Back of tongue up (voiced)' },
    { letter: 'ng', sound: 'ŋ', example: 'sing', description: 'Back of tongue up, nasal' },
  ],
  
  glottal: [
    { letter: 'h', sound: 'h', example: 'hat', description: 'Breathy sound from throat' },
  ],
}

// Arabic practice words grouped by difficulty
export const ARABIC_PRACTICE_WORDS = {
  beginner: [
    { word: 'بابا', transliteration: 'baba', meaning: 'dad', sounds: ['ب'] },
    { word: 'ماما', transliteration: 'mama', meaning: 'mom', sounds: ['م'] },
    { word: 'نور', transliteration: 'noor', meaning: 'light', sounds: ['ن', 'و', 'ر'] },
    { word: 'باب', transliteration: 'baab', meaning: 'door', sounds: ['ب'] },
    { word: 'كتاب', transliteration: 'kitaab', meaning: 'book', sounds: ['ك', 'ت', 'ب'] },
    { word: 'ولد', transliteration: 'walad', meaning: 'boy', sounds: ['و', 'ل', 'د'] },
    { word: 'بنت', transliteration: 'bint', meaning: 'girl', sounds: ['ب', 'ن', 'ت'] },
    { word: 'قمر', transliteration: 'qamar', meaning: 'moon', sounds: ['ق', 'م', 'ر'] },
  ],
  
  intermediate: [
    { word: 'شمس', transliteration: 'shams', meaning: 'sun', sounds: ['ش', 'م', 'س'] },
    { word: 'زهرة', transliteration: 'zahra', meaning: 'flower', sounds: ['ز', 'ه', 'ر'] },
    { word: 'طائر', transliteration: 'taaʾir', meaning: 'bird', sounds: ['ط', 'ء', 'ر'] },
    { word: 'سمكة', transliteration: 'samaka', meaning: 'fish', sounds: ['س', 'م', 'ك'] },
    { word: 'فراشة', transliteration: 'farasha', meaning: 'butterfly', sounds: ['ف', 'ر', 'ش'] },
    { word: 'غيمة', transliteration: 'ghayma', meaning: 'cloud', sounds: ['غ', 'ي', 'م'] },
    { word: 'خروف', transliteration: 'kharoof', meaning: 'sheep', sounds: ['خ', 'ر', 'و', 'ف'] },
  ],
  
  advanced: [
    { word: 'عصفور', transliteration: 'ʿasfoor', meaning: 'sparrow', sounds: ['ع', 'ص', 'ف', 'و', 'ر'] },
    { word: 'ضفدع', transliteration: 'ḍifdaʿ', meaning: 'frog', sounds: ['ض', 'ف', 'د', 'ع'] },
    { word: 'ثعلب', transliteration: 'thaʿlab', meaning: 'fox', sounds: ['ث', 'ع', 'ل', 'ب'] },
    { word: 'ذئب', transliteration: 'dhiʾb', meaning: 'wolf', sounds: ['ذ', 'ء', 'ب'] },
    { word: 'ظبي', transliteration: 'ḏ̴aby', meaning: 'gazelle', sounds: ['ظ', 'ب', 'ي'] },
  ],
}

// English practice words grouped by sound
export const ENGLISH_PRACTICE_WORDS = {
  beginner: [
    { word: 'cat', sounds: ['k', 'æ', 't'], difficulty: 'easy' },
    { word: 'dog', sounds: ['d', 'ɒ', 'g'], difficulty: 'easy' },
    { word: 'bat', sounds: ['b', 'æ', 't'], difficulty: 'easy' },
    { word: 'sun', sounds: ['s', 'ʌ', 'n'], difficulty: 'easy' },
    { word: 'fun', sounds: ['f', 'ʌ', 'n'], difficulty: 'easy' },
  ],
  
  intermediate: [
    { word: 'ship', sounds: ['ʃ', 'ɪ', 'p'], difficulty: 'medium' },
    { word: 'think', sounds: ['θ', 'ɪ', 'ŋ', 'k'], difficulty: 'medium' },
    { word: 'chair', sounds: ['tʃ', 'ɛ', 'r'], difficulty: 'medium' },
    { word: 'jump', sounds: ['dʒ', 'ʌ', 'm', 'p'], difficulty: 'medium' },
  ],
  
  advanced: [
    { word: 'strength', sounds: ['s', 't', 'r', 'ɛ', 'ŋ', 'θ'], difficulty: 'hard' },
    { word: 'rhythm', sounds: ['r', 'ɪ', 'ð', 'ə', 'm'], difficulty: 'hard' },
  ],
}

// Helper function to get content based on language
export function getLanguageContent(language: Language) {
  if (language === 'arabic') {
    return {
      letters: ARABIC_LETTERS,
      practiceWords: ARABIC_PRACTICE_WORDS,
      name: 'Arabic',
      nativeName: 'العربية',
      direction: 'rtl' as const,
    }
  }
  
  return {
    letters: ENGLISH_SOUNDS,
    practiceWords: ENGLISH_PRACTICE_WORDS,
    name: 'English',
    nativeName: 'English',
    direction: 'ltr' as const,
  }
}

// Get all letters/sounds for a language flattened
export function getAllLetters(language: Language) {
  const content = getLanguageContent(language)
  const allLetters: any[] = []
  
  Object.values(content.letters).forEach(category => {
    if (Array.isArray(category)) {
      allLetters.push(...category)
    }
  })
  
  return allLetters
}

// Get random words for practice
export function getRandomWords(language: Language, difficulty: 'beginner' | 'intermediate' | 'advanced', count: number = 5) {
  const content = getLanguageContent(language)
  const words = content.practiceWords[difficulty] || []
  
  // Shuffle and take 'count' words
  const shuffled = [...words].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
