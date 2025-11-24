import { createContext, useState } from 'react'

export const AppSettingsContext = createContext()

export const AppSettingsProvider = ({ children }) => {
  const [textSize, setTextSize] = useState(22) // standardstorlek

  return (
    <AppSettingsContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </AppSettingsContext.Provider>
  )
}
