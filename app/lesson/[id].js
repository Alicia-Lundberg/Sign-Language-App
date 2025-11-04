import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { lessonsData } from '../data/lessons'

export default function LessonDetail() {
  const { id } = useLocalSearchParams()
  const lessonId = parseInt(id)
  const lesson = lessonsData.find(l => l.id === lessonId)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)

  const handleAnswer = (index) => {
    setAnswered(true)
    setCorrect(index === lesson.correct)
  }

  const goBackHome = () => router.push('/(tabs)/home')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>

      <Text style={styles.question}>{lesson.question}</Text>

      <View style={styles.videoPlaceholder}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {lesson.video}  {/* placeholder visas här */}
        </Text>
      </View> 

      {!answered ? (
        lesson.options.map((opt, i) => (
          <TouchableOpacity key={i} style={styles.button} onPress={() => handleAnswer(i)}>
            <Text>{opt}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <>
          <Text style={{ marginTop: 20 }}>{correct ? 'Rätt!' : 'Fel, försök igen'}</Text>
          <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={goBackHome}>
            <Text>Tillbaka till Home</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  question: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  button: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
})
