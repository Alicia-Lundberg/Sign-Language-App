import * as Haptics from 'expo-haptics'
import { router, useLocalSearchParams } from 'expo-router'
import { X } from 'lucide-react-native'
import { useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ChooseVideoQuestion from '../components/questions/ChooseVideoQuestion'
import MultipleChoiceQuestion from '../components/questions/MultipleChoiceQuestion'
import PairQuestion from '../components/questions/PairQuestion'
import { lessonsData } from '../data/lessons'



export default function LessonDetail() {
  const screenWidth = Dimensions.get('window').width;
  const { id } = useLocalSearchParams()
  const lessonId = parseInt(id)
  const level = lessonsData.find(l => l.id === lessonId)

  const [step, setStep] = useState(0)
  const current = level.lessons[step]
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)



  const handleAnswer = (index) => {
    setSelectedAnswer(index);
  }

  const checkAnswer = (index) => {
    if (selectedAnswer === null) return;
    setShowResult(true);         // visa rätt/fel
    setAnswered(true);           // visa fortsätt-knappen
    const isCorrect = selectedAnswer === current.correct;
    setCorrect(isCorrect);
    current.userAnswer = selectedAnswer;

    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); // glad vibration
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);   // dyster vibration
    }
  }

  const progress = (step / level.lessons.length) * 100

  const handleContinue = () => {
    if (step + 1 < level.lessons.length) {
      setStep(step + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswered(false);
      setCorrect(false);
    } else {
      router.push(`/lesson/result?id=${lessonId}`);
    }
  }

  return (

    <View style={styles.container}>
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#b0d8d7ff', zIndex: -1 }]} />

      <View style={{ width: '100%', paddingTop: 50, paddingHorizontal: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Kryss-knapp */}
        <TouchableOpacity
          style={{
            padding: 5,
            //backgroundColor: 'rgba(0,0,0,0.3)', // lite rundad bakgrund
            borderRadius: 20,                  // gör knappen rund
          }}
          onPress={() => router.push('/(tabs)/home')}
        >
          <X size={38} color="white" strokeWidth={3} />
        </TouchableOpacity>

        {/* Progress bar */}
        <View style={{ flex: 1, marginHorizontal: 10, paddingTop: 15 }}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: '#27AE60' }]} />
          </View>
        </View>

        {/* Plats för eventuell framtida ikon/knapp */}
        <View style={{ width: 44 }} />
      </View>

      <Text style={styles.title}>{current.question}</Text>

      {/* <Text style={styles.title}>
         {level.title} {/*– {step + 1}/{level.lessons.length}
      </Text> */}

      {/* <View style={[styles.videoPlaceholder, { marginTop: 40 }]}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{current.video}</Text>
      </View> */}

      {/* <Text style={styles.question}>{current.question}</Text> */}

      
      {current.type === 'multipleChoice' && (
        <MultipleChoiceQuestion
          current={current}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          handleAnswer={handleAnswer}
        />
      )}



      {current.type === 'chooseVideo' && (
        <ChooseVideoQuestion
          current={current}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          handleAnswer={handleAnswer}
        />
      )}

      {current.type === 'dragAndDrop' && (
        <DragAndDropQuestion
          current={current}
          answered={answered}
          correct={correct}
          handleAnswer={handleAnswer}
        />
      )}

      {current.type === 'pair' && (
        <PairQuestion
          current={current}
          answered={answered}
          correct={correct}
          handleAnswer={handleAnswer}
        />
      )}


      {/* Kontrollera knapp längst ner */}
      {!showResult && selectedAnswer !== null && (
        <TouchableOpacity
          style={styles.checkButton}
          onPress={checkAnswer}
        >
          <Text style={styles.checkButtonText}>Kontrollera</Text>
        </TouchableOpacity>
      )}



      {/* Popup-rutan bakom fortsätt-knappen */}
      {answered && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: screenWidth,
            height: 150,
            backgroundColor: correct
              ? '#83efb7ff'  // ljusgrön
              : '#f4a2a2ff', // ljusröd
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            // Elevation för Android
            elevation: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}

      {/* FORTSÄTT-KNAPP */}
      {answered && (
        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: correct ? '#27AE60' : '#E74C3C' } // dynamisk färg
          ]}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Fortsätt</Text>
        </TouchableOpacity>
      )}


    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20 },
  continueButton: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 30,
    width: '90%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    // 3D / skugga
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6
  },
  continueButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },

  checkButton: {
    backgroundColor: '#3A7874FF', // blå
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    // 3D / skugga
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6
  },
  checkButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },

  progressBarBackground: {
    width: '100%',
    height: 13,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: '#000000ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6, // Android
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#40617aff',
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
  correct: { backgroundColor: '#27AE60' },
  wrong: { backgroundColor: '#E74C3C' }
})
