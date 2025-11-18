import { FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useProgress } from '../context/ProgressContext';
import { lessonsData } from '../data/lessons';

export default function LessonResult() {
  const { id } = useLocalSearchParams();
  const lessonId = parseInt(id);
  const level = lessonsData.find(l => l.id === lessonId);
  const { completeLesson } = useProgress();

  const correctCount = level.lessons.filter(q => q.userAnswer === q.correct).length;
  const total = level.lessons.length;
  const allCorrect = correctCount === total;
  const percentage = (correctCount / total) * 100;

  const confettiRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const { width } = Dimensions.get('window');

  // Animated values för stjärnorna
  const animatedStars = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  // Antal stjärnor som ska fyllas
  let starsFilled = 0;
  if (percentage === 100) starsFilled = 3;
  else if (percentage >= 60) starsFilled = 2;
  else if (percentage > 0) starsFilled = 1;
  else starsFilled = 0;

  useEffect(() => {
    if (allCorrect) setShowConfetti(true);

    animatedStars.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: i < starsFilled ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [allCorrect]);

  return (
    <View style={{ flex: 1, backgroundColor: '#b0d8d7ff', justifyContent: 'center', alignItems: 'center', padding: 30 }}>

      {/* Stjärnor i båge med grå bakgrund */}
      <View style={{ position: 'absolute', top: 200, left: 0, width: width, height: 150 }}>
        {animatedStars.map((anim, i) => {
          const radius = 120; // större radie för att sprida ut
          const angle = -45 + i * 45; // -45, 0, 45 grader → mer spridning
          const x = width / 2 + radius * Math.sin((angle * Math.PI) / 180) - 35;
          const y = 50 - radius * Math.cos((angle * Math.PI) / 180);

          return (
            <View
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
              }}
            >
                {/* Skugga bakom */}
                <FontAwesome
                    name="star"
                    size={70}
                    color="rgba(91, 86, 43, 0.3)"
                    style={{ position: 'absolute', left: 3, top: 3 }} // förskjutning för 3D effekt
                />
              {/* Bakgrundsstjärna i grått */}
              <FontAwesome name="star" size={70} color="#cccccc" />
              {/* Gul stjärna som fylls */}
              <Animated.View style={{ position: 'absolute', left: 0, top: 0, opacity: anim }}>
                <FontAwesome name="star" size={70} color="#FFD700" />
              </Animated.View>
            </View>
          );
        })}
      </View>

      {/* Konfetti */}
      {showConfetti && (
        <ConfettiCannon
          count={300}
          origin={{ x: width / 2, y: -50 }}
          fadeOut
          autoStart
          explosionSpeed={50}
          fallSpeed={2000}
          horizontalRange={width}
          ref={confettiRef}
        />
      )}

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
            <Text style={{ fontSize: 60, fontWeight: 'bold', color: '#40617a' }}>{correctCount}</Text>
            <Text style={{ fontSize: 22, fontWeight: '600', color: '#808080' }}>av {total}</Text>
          </View>
        )}
      </AnimatedCircularProgress>

      <Text style={{ marginTop: 40, fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
        Du fick {correctCount} av {total} rätt
      </Text>

      {/* Knapp */}
      <TouchableOpacity
        onPress={() => {
          if (allCorrect) {
            completeLesson(level.id);
            router.push('/(tabs)/home');
          } else {
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
          elevation: 6,
        }}
      >
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
          {allCorrect ? 'Gå vidare' : 'Försök igen'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
