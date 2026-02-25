import { useCallback, useEffect, useState } from 'react'
import { STORAGE_KEYS } from '../constants/storageKeys'

const THEMES = {
  light: 'light',
  dark: 'dark',
}

const getInitialTheme = () => {
  if (typeof window === 'undefined') return THEMES.dark

  const persistedTheme = window.localStorage.getItem(STORAGE_KEYS.theme)
  if (persistedTheme === THEMES.light || persistedTheme === THEMES.dark) {
    return persistedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.dark : THEMES.light
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(STORAGE_KEYS.theme, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((previousTheme) => (previousTheme === THEMES.dark ? THEMES.light : THEMES.dark))
  }, [])

  return { theme, toggleTheme }
}
