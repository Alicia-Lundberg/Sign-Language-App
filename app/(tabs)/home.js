import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Bubble from '../../assets/images/bubble.png';
import Lock from '../../assets/images/lock.png';
import bg from '../../assets/images/path-bg-v3.png';
import Elk from '../../assets/svgs/elk.svg';
import Stubbe from '../../assets/svgs/stubbe.svg';
import { useProgress } from '../context/ProgressContext';


export default function HomeScreen() {
  const { lessons } = useProgress();
  const { width: screenWidth } = useWindowDimensions();
  const [showWelcomeImage, setShowWelcomeImage] = useState(true);
  

  // Bakgrundens naturliga mått från Inkscape
  const bgWidth = 1080;
  const bgHeight = 5000;
  const scale = screenWidth / bgWidth;
  const scaledHeight = bgHeight * scale;

  const handlePress = (lesson) => {
    if (!lesson.unlocked) return;
    router.push(`/lesson/${lesson.id}`);
  };

  // Hitta nästa upplåsta men ej avklarade lesson
  const nextUnlockedLesson = lessons.find(l => l.unlocked && !l.completed);

  // Hide welcome image after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeImage(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ height: scaledHeight }}>
      <ImageBackground
        source={bg}
        style={{ width: screenWidth, height: scaledHeight }}
      >
        {lessons.map(lesson => (
          <View
              key={lesson.id}
              style={{
                position: 'absolute',
                top: lesson.top * scale,
                left: lesson.left * scale,
                alignItems: 'center',
              }}
            >
            {/* Stjärnorna ovanför varje Stubbe */}
            <View style={{
              flexDirection: 'row',
              transform: [
                { translateY: lesson.id === nextUnlockedLesson?.id ? -47 : 0 } // flytta raden upp om älgen sitter här
              ]
            }}>
              {[0, 1, 2].map(i => {
                const color = i < (lesson.stars || 0) ? '#FFD700' : '#cccccc'; // gul eller grå

    return (
      <View key={i} style={{ marginHorizontal: 1 }}>
        {/* Skugga bakom */}
        <FontAwesome
          name="star"
          size={20}
          color="rgba(53, 40, 20, 0.3)"
          style={{ position: 'absolute', left: 2, top: 2 }}
        />
        {/* Själva stjärnan */}
        <FontAwesome
          name="star"
          size={20}
          color={color}
        />
      </View>
        )
      })}
    </View>


        <TouchableOpacity onPress={() => handlePress(lesson)} style={{ alignItems: 'center' }}>
          <Stubbe 
            width={70} 
            height={70} 
            style={{ opacity: lesson.unlocked ? 1 : 0.5 }}
          />

          {/* Lås på stubbe om låst */}
          {!lesson.unlocked && (
            <Image
              source={Lock}
              style={{
                position: 'absolute',
                width: 29,
                height: 29,
                top: 12,
                left: 20,
                opacity: 0.5,
              }}
            />
          )}

          {lesson.id === nextUnlockedLesson?.id && (
                  <Elk 
                    width={100} 
                    height={100} 
                    style={{ position: 'absolute', top: -50, left: -15 }}
                  />
                )}

                {/* Show welcome image for first level only, first 5 seconds */}
                {lesson.id === 1 && showWelcomeImage && !lesson.completed && (
                  // Black bubble
                  <View style={{ position: 'absolute', top: -130, right:-120, pointerEvents: 'none' }}>
                    <Image source= {Bubble} 
                    style={{width: 120, height: 90}} />
                  </View>

                  // White Bubble 
                  // <View style={{ position: 'absolute', top: -250, right:-250, pointerEvents: 'none' }}>
                  //   <WhiteBubble width={300} height={300} />
                  // </View>

                )}
              </TouchableOpacity>

        {/* <Text style={styles.lessonTitle}>{lesson.title}</Text> */}
      </View>
  ))}
  
      </ImageBackground>
    </ScrollView>
  );
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
});
