const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function removeRequestedText({
  sourceText = '',
  textToRemove = '',
  caseSensitive = false,
  removeAllOccurrences = true,
}) {
  if (!textToRemove) {
    return {
      resultText: sourceText,
      matchesFound: 0,
      matchesRemoved: 0,
    }
  }

  const escapedText = escapeRegExp(textToRemove)
  const matchFlags = caseSensitive ? 'g' : 'gi'
  const matchesFound = [...sourceText.matchAll(new RegExp(escapedText, matchFlags))].length

  if (matchesFound === 0) {
    return {
      resultText: sourceText,
      matchesFound,
      matchesRemoved: 0,
    }
  }

  const replaceFlags = `${removeAllOccurrences ? 'g' : ''}${caseSensitive ? '' : 'i'}`
  const resultText = sourceText.replace(new RegExp(escapedText, replaceFlags), '')

  return {
    resultText,
    matchesFound,
    matchesRemoved: removeAllOccurrences ? matchesFound : 1,
  }
}
