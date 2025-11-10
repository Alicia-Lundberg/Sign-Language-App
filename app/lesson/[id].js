import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DragAndDropQuestion from '../components/questions/DragAndDropQuestion'
import MultipleChoiceQuestion from '../components/questions/MultipleChoiceQuestion'
import { useProgress } from '../context/ProgressContext'
import { lessonsData } from '../data/lessons'

export default function LessonDetail() {
  const { id } = useLocalSearchParams()
  const lessonId = parseInt(id)
  const level = lessonsData.find(l => l.id === lessonId)

  const [step, setStep] = useState(0)
  const current = level.lessons[step]
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)
  const { completeLesson } = useProgress()

  const handleAnswer = (index) => {
    setAnswered(true)
    setCorrect(index === current.correct)
    current.userAnswer = index
  }

  const progress = (step / level.lessons.length) * 100

  const handleContinue = () => {
    if (step + 1 < level.lessons.length) {
      setStep(step + 1)
      setAnswered(false)
      setCorrect(false)
    } else {
      // Kontrollera att alla lektioner i level är rätt besvarade
      const allCorrect = level.lessons.every(l => l.userAnswer === l.correct)
      console.log('All questions correct for level', level.id, '?', allCorrect) // debug
      if (allCorrect) {
        console.log('Calling completeLesson for level', level.id) // debug
        completeLesson(level.id) // låser upp nästa level
      }
      router.push('/(tabs)/home')
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', paddingTop: 50, paddingHorizontal: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {/* Kryss-knapp*/}

        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => router.push('/(tabs)/home')}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>✕</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', flex: 1 }}>
          {level.title}
        </Text>

        <View style={{ width: 44 /* samma som kryss-knappens bredd */ }} />
      </View>



      {/* Progress bar */}
      <View style={[styles.progressBarBackground, { marginTop: 30 }]}>
        <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: '#27AE60' }]} />
      </View>

      {/* <Text style={styles.title}>
         {level.title} {/*– {step + 1}/{level.lessons.length}
      </Text> */}

      {/* <View style={[styles.videoPlaceholder, { marginTop: 40 }]}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{current.video}</Text>
      </View> */}
      <Image
        source={require('../../assets/gifs/hej-00032-tecken-unscreen.gif')}
        style={{ width: 300, height: 250 }}
      />

      <Text style={styles.question}>{current.question}</Text>

      {/* <View style={styles.optionsGrid}>
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
      </View> */}

      {current.type === 'multipleChoice' && (
        <MultipleChoiceQuestion
          current={current}
          answered={answered}
          correct={correct}
          handleAnswer={handleAnswer}
        />
      )}

      {current.type === 'dragAndDrop' && (
        <DragAndDropQuestion
          current={current}
          answered={answered}
          onComplete={() => setAnswered(true)}
        />
      )}

      {answered && (
        <TouchableOpacity
          style={{
            backgroundColor: '#27AE60',
            paddingVertical: 20,
            paddingHorizontal: 40,
            borderRadius: 12,
            marginTop: 30,
            width: '90%',
            alignItems: 'center',
            position: 'absolute',
            bottom: 40
          }}
          onPress={() => {
            handleContinue()
          }}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Fortsätt</Text>
        </TouchableOpacity>
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
