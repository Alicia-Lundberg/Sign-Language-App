//För att spara progress genom appen, alltså state

import { createContext, useContext, useState } from 'react'
import { levelsData } from '../data/levels'

const ProgressContext = createContext()

export const ProgressProvider = ({ children }) => {
  const [lessons, setLessons] = useState(levelsData)

  // Funktion för att markera en level som klar
  const completeLesson = (id, stars = 0) => {
  setLessons(prev =>
    prev.map((l) => {
      if (l.id === id) return { ...l, completed: true, stars };
      if (l.id === id + 1 && stars >= 1) return { ...l, unlocked: true }; // låser upp nästa level om minst 1 stjärna
      return l;
    })
  );


}

  return (
    <ProgressContext.Provider value={{ lessons, completeLesson }}>
      {children}
    </ProgressContext.Provider>
  )
}

// Custom hook för att enkelt använda contexten
export const useProgress = () => useContext(ProgressContext)

