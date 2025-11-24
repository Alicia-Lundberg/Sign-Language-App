import { router, useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useProgress } from '../context/ProgressContext';
import { lessonsData } from '../data/lessons';

export default function LessonResult() {
  const { id } = useLocalSearchParams();
  const lessonId = parseInt(id);
  const level = lessonsData.find(l => l.id === lessonId);
  const { completeLesson } = useProgress();

  const correctCount = level.lessons.filter(q => {
    if (q.type === 'pair') {
      // ensure both sides exist before comparing
      if (!q.userAnswer || !q.correct) return false;
      return q.userAnswer.gif === q.correct.gif && q.userAnswer.word === q.correct.word;
    }
    return q.userAnswer === q.correct;
  }).length;

  const total = level.lessons.length;
  const allCorrect = correctCount === total;
  const percentage = (correctCount / total) * 100;

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#b0d8d7ff',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30
    }}>

      {/* Cirkeln */}
      <AnimatedCircularProgress
        size={220}
        width={15}
        fill={percentage}
        tintColor="#27AE60"
        backgroundColor="#eee"
        lineCap="round"
      >
        {() => (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 60, fontWeight: 'bold', color: '#40617a' }}>
              {correctCount}
            </Text>
            <Text style={{ fontSize: 22, fontWeight: '600', color: '#808080' }}>
              av {total}
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>

      <Text style={{
        marginTop: 40,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
      }}>
        Du fick {correctCount} av {total} rätt
      </Text>

      {/* Knapp */}
      <TouchableOpacity
        onPress={() => {
          if (allCorrect) {
            completeLesson(level.id);
            router.push('/(tabs)/home');
          } else {
            // Nollställ svar
            level.lessons.forEach(l => delete l.userAnswer);
            router.push(`/lesson/${lessonId}`);
          }
        }}
        style={{
          marginTop: 50,
          paddingVertical: 20,
          paddingHorizontal: 50,
          borderRadius: 15,
          backgroundColor: allCorrect ? '#27AE60' : '#E74C3C',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 6
        }}
      >
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
          {allCorrect ? 'Gå vidare' : 'Försök igen'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}
