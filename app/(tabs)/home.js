import { router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { lessonsData } from '../data/lessons'

export default function HomeScreen() {
  const [lessons, setLessons] = useState(
    lessonsData.map((l, index) => ({ ...l, completed: false })) // alla startar låsta
  )

  // Hjälpvariabel för att veta vilken som är nästa unlocked
  const getNextUnlocked = () => {
    const completedLessons = lessons.filter(l => l.completed)
    const nextIndex = completedLessons.length
    return lessons[nextIndex]?.id
  }

  const nextUnlockedId = getNextUnlocked()

  const handlePress = (lesson) => {
    // Kan bara klicka på completed eller nästa unlocked
    if (!lesson.completed && lesson.id !== nextUnlockedId) return

    router.push(`/lesson/${lesson.id}`)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {lessons.map((lesson, index) => {
        let circleStyle = styles.locked

        if (lesson.completed) circleStyle = styles.completed
        else if (lesson.id === nextUnlockedId) circleStyle = styles.unlocked

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
  unlocked: { backgroundColor: '#4A90E2' },    // blå
  locked: { backgroundColor: '#999' },         // grå
  lessonTitle: { fontSize: 16, marginTop: 5 },
})
