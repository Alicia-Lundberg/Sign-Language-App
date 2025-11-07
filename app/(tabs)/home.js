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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* <ImageBackground
        source={require('../../assets/images/background.png')} // lång bakgrundsbild
        style={styles.background}
      > */}
        {lessons.map(lesson => {
          let circleStyle = lesson.unlocked ? styles.unlocked : styles.locked
          if (lesson.completed) circleStyle = styles.completed

          return (
            <View
              key={lesson.id}
              style={{
                position: 'absolute',
                top: lesson.top,
                left: lesson.left,
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
     
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    width: '100%',
    height: 1200, // t.ex. höjden på den långa bilden
  },
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