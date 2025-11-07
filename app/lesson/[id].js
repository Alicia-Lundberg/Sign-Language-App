import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { lessonsData } from '../data/lessons'

export default function LessonDetail() {
  const { id } = useLocalSearchParams()
  const lessonId = parseInt(id)
  const level = lessonsData.find(l => l.id === lessonId)

  const [step, setStep] = useState(0)
  const current = level.lessons[step]
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)

  const handleAnswer = (index) => {
    const isCorrect = index === current.correct
    setAnswered(true)
    setCorrect(isCorrect)

    if (isCorrect) {
      setTimeout(() => {
        if (step + 1 < level.lessons.length) {
          setStep(step + 1)
          setAnswered(false)
        } else {
          router.push('/(tabs)/home')
        }
      }, 1000)
    }
  }

  const progress = ((step + 1) / level.lessons.length) * 100

  return (
    <View style={styles.container}>

      {/* Progress bar */}
      <View style={[styles.progressBarBackground, { marginTop: 40 }]}>
        <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: '#27AE60' }]} />
      </View>

      <Text style={styles.title}>
        {level.title} – {step + 1}/{level.lessons.length}
      </Text>

      <View style={styles.videoPlaceholder}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{current.video}</Text>
      </View>

      <Text style={styles.question}>{current.question}</Text>

      <View style={styles.optionsGrid}>
        {current.options.map((opt, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.optionButton,
              answered && (i === current.correct
                ? styles.correct
                : i === current.options.findIndex((_, idx) => idx === i && !correct)
                ? styles.wrong
                : {})
            ]}
            onPress={() => !answered && handleAnswer(i)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {answered && (
        <Text style={{ marginTop: 20, fontSize: 18 }}>
          {correct ? 'Rätt!' : 'Fel, försök igen'}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20 },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 20
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 5
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  videoPlaceholder: {
    width: 300,
    height: 200,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 12
  },
  question: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  optionsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  optionButton: {
    width: '48%',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  correct: { backgroundColor: '#27AE60' },
  wrong: { backgroundColor: '#E74C3C' }
})
