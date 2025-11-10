import { router } from 'expo-router'
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import bg from '../../assets/images/path-bg-new.png'
import { useProgress } from '../context/ProgressContext'

export default function HomeScreen() {
  const { lessons } = useProgress()  // context med unlocked/completed
  const { width: screenWidth } = useWindowDimensions()

  // Bakgrundens naturliga mått från Inkscape
  const bgWidth = 1080
  const bgHeight = 5000
  const scale = screenWidth / bgWidth
  const scaledHeight = bgHeight * scale

  const handlePress = (lesson) => {
    if (!lesson.unlocked) return
    router.push(`/lesson/${lesson.id}`)
  }

  return (
    <ScrollView contentContainerStyle={{ height: scaledHeight }}>
      <ImageBackground
        source={bg}
        style={{ width: screenWidth, height: scaledHeight }}
      >
        {lessons.map(lesson => {
          const circleStyle = lesson.completed
            ? styles.completed
            : lesson.unlocked
            ? styles.unlocked
            : styles.locked

          return (
            <View
              key={lesson.id}
              style={{
                position: 'absolute',
                top: lesson.top * scale,
                left: lesson.left * scale,
                alignItems: 'center',
              }}
            >
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
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  circleText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  completed: { backgroundColor: '#27AE60' },
  unlocked: { backgroundColor: '#4A90E2' },
  locked: { backgroundColor: '#999' },
  lessonTitle: { fontSize: 16, marginTop: 5, color: 'white' },
})
