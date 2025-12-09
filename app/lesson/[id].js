import { FontAwesome } from '@expo/vector-icons'
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

  const [showIntro, setShowIntro] = useState(true)
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

    let isCorrect = false;

    if (current.type === 'pair') {

      console.log("selectedAnswer:", selectedAnswer);
      console.log("current.correct:", current.correct);

      const selGifIndex = typeof selectedAnswer.gif === 'number'
        ? selectedAnswer.gif
        : current.gif.findIndex(g => g === selectedAnswer.gif);

      const selWordIndex = typeof selectedAnswer.word === 'number'
        ? selectedAnswer.word
        : current.options.findIndex(w => w === selectedAnswer.word);

      console.log("selGifIndex:", selGifIndex, "selWordIndex:", selWordIndex);

      isCorrect = current.correct.some(pair =>
        pair.gif === selGifIndex &&
        pair.word === selWordIndex
      );
      console.log("isCorrect:", isCorrect);

    } else {
      isCorrect = selectedAnswer === current.correct;
    }

    setShowResult(true);         // visa rätt/fel
    setAnswered(true);           // visa fortsätt-knappen
    // const isCorrect = selectedAnswer === current.correct;
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

  // If on intro screen, show intro
  if (showIntro) {
    return (
      <View style={styles.container}>
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#b0d8d7ff', zIndex: -1 }]} />

        <TouchableOpacity
          style={{
            padding: 5,
            borderRadius: 20,
            alignSelf: 'flex-start',
            marginTop: 50,
            marginLeft: 20,
          }}
          onPress={() => router.push('/(tabs)/home')}
        >
          <X size={38} color="white" strokeWidth={3} />
        </TouchableOpacity>

        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>{level.title}</Text>
          <Text style={styles.introDescription}>
            {level.description || 'Learn new sign language words and phrases in this level.'}
          </Text>
          
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => setShowIntro(false)}
          >
            <Text style={styles.startButtonText}>Starta</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
          answered={answered} 
          handleAnswer={handleAnswer}
        />
      )}

      {current.type === 'pair' && (
        <PairQuestion
          current={current}
          setSelectedAnswer={setSelectedAnswer}
          answered={answered}
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
          height: 170,
          backgroundColor: correct
            ? '#aaf0ccff'  // ljusgrön
            : '#f1b7b7ff', // ljusröd
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
      >
        {/* Text högst upp till vänster */}
        <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 7, left: 15 }}>
        <FontAwesome 
          name={correct ? 'check' : 'times'} 
          size={25} 
          color={correct ? '#27AE60' : '#E74C3C'} 
          style={{ marginRight: 10 }} 
        />
        <Text style={{
          position: 'absolute',
          top: 1,
          left: 30,
          fontSize: 18,
          fontWeight: 'bold',
          color: correct ? '#27AE60' : '#E74C3C',
        }}>
          {correct
        ? 'Rätt svar!'
        : (current.correct !== undefined && Array.isArray(current.options) && current.options[current.correct] !== undefined)
          ? `Fel, korrekt svar är: ${current.options[current.correct]}`
          : 'Fel!'}
        </Text>
      </View>
      </View>
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
  
  introContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  introTitle: {
    fontSize: 36,
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
  },

  introDescription: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 24,
  },

  startButton: {
    backgroundColor: '#3A7874FF',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  startButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

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

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',         
  },

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