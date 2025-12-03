import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ChooseVideoQuestion({ current, answered, handleAnswer, selectedAnswer }) {
  return (
    <View style={styles.container}>
      <View style={styles.videoGrid}>

        {current.gif.map((vid, i) => {
          const isSelected = selectedAnswer === i;
          const isCorrect = answered && i === current.correct;
          const isWrong = answered && isSelected && i !== current.correct;

          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.videoButton,

                // Blue before answering
                isSelected && !answered && { backgroundColor: "#82b3afff" },

                // Green for correct
                isCorrect && styles.correct,

                // Red for selected wrong item
                isWrong && styles.wrong
              ]}
              onPress={() => !answered && handleAnswer(i)}
            >
              <Image source={vid} style={styles.video} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10
  },

  videoGrid: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },

  videoButton: {
    width: "85%",
    height: 250,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#b0d8d7ff",
    justifyContent: "center",
    alignItems: "center"
  },

  video: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },

  correct: { backgroundColor: "#83efb7ff", borderColor: "#27AE60" },
  wrong: { backgroundColor: "#f4a2a2ff", borderColor: "#E74C3C" }
});
