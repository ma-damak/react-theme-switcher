import { createContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

const DEFAULT_THEME = 'os-default'

const initialState = {
  theme: DEFAULT_THEME,
  changeTheme: () => {},
}

export const ThemeContext = createContext(initialState)

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY)
      if (savedTheme) return savedTheme
    } catch (error) {
      console.warn('Error while trying to access localStorage: ', error)
    }
    return DEFAULT_THEME
  })

  useEffect(() => {
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')

    if (theme === 'os-default') {
      darkModePreference.matches
        ? document.body.classList.add('dark')
        : document.body.classList.remove('dark')

      // if os default theme changes
      const handleSystemThemeChange = (e) => {
        e.matches
          ? document.body.classList.add('dark')
          : document.body.classList.remove('dark')
      }
      darkModePreference.addEventListener('change', handleSystemThemeChange)

      return () => {
        darkModePreference.removeEventListener(
          'change',
          handleSystemThemeChange
        )
      }
    } else if (theme === 'light') {
      document.body.classList.remove('dark')
    } else if (theme === 'dark') {
      document.body.classList.add('dark')
    }
  }, [theme])

  const value = {
    theme,
    changeTheme: (selectedTheme) => {
      try {
        localStorage.setItem(STORAGE_KEY, selectedTheme)
      } catch (error) {
        console.warn('Error while trying to access localStorage: ', error)
      }

      setTheme(selectedTheme)
    },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContextProvider
