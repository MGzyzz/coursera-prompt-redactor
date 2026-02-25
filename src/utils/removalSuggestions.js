const STOP_WORDS = new Set([
  'this',
  'that',
  'with',
  'from',
  'have',
  'will',
  'your',
  'you',
  'are',
  'and',
  'the',
  'for',
  'что',
  'это',
  'как',
  'чтобы',
  'или',
  'если',
  'для',
  'когда',
  'только',
  'если',
  'будет',
  'нужно',
])

const normalizeSpaces = (value) => value.replace(/\s+/g, ' ').trim()

export function buildRemovalSuggestions(sourceText, options = {}) {
  const { wordLimit = 8, phraseLimit = 6 } = options

  if (!sourceText.trim()) {
    return { words: [], phrases: [] }
  }

  const allWords = sourceText.match(/[A-Za-zА-Яа-яЁё0-9'-]+/g) ?? []
  const frequencyMap = new Map()

  for (const word of allWords) {
    const key = word.toLowerCase()

    if (word.length < 4 || STOP_WORDS.has(key)) {
      continue
    }

    const current = frequencyMap.get(key)

    if (!current) {
      frequencyMap.set(key, { original: word, count: 1 })
    } else {
      current.count += 1
    }
  }

  const words = [...frequencyMap.values()]
    .sort((left, right) => right.count - left.count || right.original.length - left.original.length)
    .slice(0, wordLimit)
    .map((entry) => entry.original)

  const sentenceSource = sourceText
    .split(/[\n.!?]+/)
    .map(normalizeSpaces)
    .filter((entry) => entry.length >= 12)

  const uniquePhraseKeys = new Set()
  const phrases = []

  for (const phrase of sentenceSource) {
    const key = phrase.toLowerCase()

    if (uniquePhraseKeys.has(key)) {
      continue
    }

    uniquePhraseKeys.add(key)
    phrases.push(phrase)

    if (phrases.length >= phraseLimit) {
      break
    }
  }

  if (phrases.length === 0) {
    const clauseSource = sourceText
      .split(/[,;:]+/)
      .map(normalizeSpaces)
      .filter((entry) => entry.length >= 12)

    for (const clause of clauseSource) {
      const key = clause.toLowerCase()

      if (uniquePhraseKeys.has(key)) {
        continue
      }

      uniquePhraseKeys.add(key)
      phrases.push(clause)

      if (phrases.length >= phraseLimit) {
        break
      }
    }
  }

  return { words, phrases }
}
