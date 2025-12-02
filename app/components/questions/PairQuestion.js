import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function PairQuestion({ current, setSelectedAnswer, setShowResult }) {
  const [selectedGif, setSelectedGif] = useState(null);

  // Skapa delade värden för varje ord
  const [wordsPositions] = useState(
    current.options.map(() => ({
      x: useSharedValue(0),
      y: useSharedValue(0),
    }))
  );

  const handleGifPress = (i) => setSelectedGif(i);

  useEffect(() => {
    if (selectedGif !== null) {
      const draggedWordIndex = wordsPositions.findIndex(
        (p) => p.x.value !== 0 || p.y.value !== 0
      );

      if (draggedWordIndex !== -1) {
        setSelectedAnswer({
          gif: selectedGif,
          word: draggedWordIndex,
        });
      }
    }
  }, [selectedGif]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.row}>
          {/* GIFS */}
          <View style={styles.leftColumn}>
            {current.gif.map((gif, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleGifPress(i)}
                style={[
                  styles.target,
                  {
                    borderColor:
                      selectedGif === i
                        ? "#00BFFF"
                        : selectedGif !== null
                        ? "#FFA500"
                        : "#ccc",
                  },
                ]}
              >
                <Image source={gif} style={styles.gif} />
              </TouchableOpacity>
            ))}
          </View>

          {/* DRAGGABLE WORDS */}
          <View style={styles.rightColumn}>
            {current.options.map((word, i) => {
              const pos = wordsPositions[i];

              const drag = Gesture.Pan()
                .onUpdate((e) => {
                  pos.x.value = e.translationX;
                  pos.y.value = e.translationY;
                })
                .onEnd(() => {
                  pos.x.value = withSpring(0);
                  pos.y.value = withSpring(0);
                });

              const animatedStyle = useAnimatedStyle(() => ({
                transform: [{ translateX: pos.x.value }, { translateY: pos.y.value }],
              }));

              return (
                <GestureDetector gesture={drag} key={i}>
                  <Animated.View style={[styles.word, animatedStyle]}>
                    <Text style={styles.wordText}>{word}</Text>
                  </Animated.View>
                </GestureDetector>
              );
            })}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  leftColumn: { width: "45%", justifyContent: "space-around" },
  rightColumn: { width: "45%", justifyContent: "space-around" },
  target: {
    width: "100%",
    height: width * 0.4,
    borderWidth: 3,
    borderRadius: 12,
    marginBottom: 20,
  },
  gif: { width: "100%", height: "100%", borderRadius: 12 },
  word: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#4A90E2",
    borderWidth: 3,
    borderRadius: 8,
    alignItems: "center",
  },
  wordText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
