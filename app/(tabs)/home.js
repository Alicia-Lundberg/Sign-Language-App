import { router } from 'expo-router'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useProgress } from '../context/ProgressContext'

export default function HomeScreen() {
  const { lessons } = useProgress()  // <-- använder context istället
  console.log('Lessons state in HomeScreen:', lessons) // debug
  const nextUnlockedId = lessons.find(l => l.unlocked && !l.completed)?.id

  const handlePress = (lesson) => {
    console.log('Pressed lesson', lesson.id, 'unlocked?', lesson.unlocked, 'completed?', lesson.completed)
    if (!lesson.unlocked) return
    router.push(`/lesson/${lesson.id}`)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {lessons.map((lesson, index) => {
        // Bestäm färg på cirkeln
        let circleStyle = lesson.unlocked ? styles.unlocked : styles.locked
        if (lesson.completed) circleStyle = styles.completed

        return (
          <View key={lesson.id} style={styles.lessonWrapper}>
            {index !== 0 && <View style={styles.line} />}
            <TouchableOpacity
              style={[styles.circle, circleStyle]}
              onPress={() => handlePress(lesson)}
            >
              <Text style={styles.circleText}>{lesson.id}</Text>
            </TouchableOpacity>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { paddingVertical: 50, alignItems: 'center' },
  lessonWrapper: { alignItems: 'center', marginBottom: 30 },
  line: { width: 4, height: 30, backgroundColor: '#ccc', marginBottom: 10 },
  circle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  circleText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  completed: { backgroundColor: '#27AE60' },   // grön
  unlocked: { backgroundColor: '#4A90E2' },   // blå
  locked: { backgroundColor: '#999' },        // grå
  lessonTitle: { fontSize: 16, marginTop: 5 },
})
