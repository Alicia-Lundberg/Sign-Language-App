import { router } from 'expo-router';
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import bg from '../../assets/images/path-bg-v3.png';
import Elk from '../../assets/svgs/elk.svg';
import Stubbe from '../../assets/svgs/stubbe.svg';
import { useProgress } from '../context/ProgressContext';

export default function HomeScreen() {
  const { lessons } = useProgress();
  const { width: screenWidth } = useWindowDimensions();

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
              <TouchableOpacity onPress={() => handlePress(lesson)} style={{ alignItems: 'center' }}>
                <Stubbe 
                  width={70} 
                  height={70} 
                  style={{ opacity: lesson.unlocked ? 1 : 0.5 }}
                />

                {lesson.id === nextUnlockedLesson?.id && (
                  <Elk 
                    width={100} 
                    height={100} 
                    style={{ position: 'absolute', top: -50, left: -15 }}
                  />
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
