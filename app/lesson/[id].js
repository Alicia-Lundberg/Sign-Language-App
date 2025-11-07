import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { lessonsData } from '../data/lessons'



export default function LessonDetail() {
  const { id } = useLocalSearchParams()
  const lessonId = parseInt(id)
  const level = lessonsData.find(l => l.id === lessonId)

  const [step, setStep] = useState(0) // vilken fråga vi är på
  const current = level.lessons[step] // den aktuella frågan

  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)

  const handleAnswer = (index) => {
    const isCorrect = index === current.correct
    setAnswered(true)
    setCorrect(isCorrect)

    if (isCorrect) {
      setTimeout(() => {
        if (step + 1 < level.lessons.length) {
          // gå till nästa fråga
          setStep(step + 1)
          setAnswered(false)
        } else {
          // sista frågan klar → tillbaka hem
          router.push('/(tabs)/home')
        }
      }, 1000)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {level.title} – {step + 1}/{level.lessons.length}
      </Text>

      <Text style={styles.question}>{current.question}</Text>

      <View style={styles.videoPlaceholder}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {current.video}
        </Text>
      </View>

      {!answered ? (
        current.options.map((opt, i) => (
          <TouchableOpacity key={i} style={styles.button} onPress={() => handleAnswer(i)}>
            <Text>{opt}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={{ marginTop: 20 }}>{correct ? 'Rätt!' : 'Fel, försök igen'}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  question: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  videoPlaceholder: {
    width: 300,
    height: 200,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 12
  },
  button: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    width: 200,
    alignItems: 'center'
  }
})
