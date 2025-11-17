import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function ChooseVideoQuestion({ current, answered, correct, handleAnswer }) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{current.question}</Text>

      <View style={styles.videoGrid}>
        {current.gif.map((vid, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.videoButton,
              answered && (i === current.correct
                ? styles.correct
                : i !== current.correct
                  ? styles.wrong
                  : {})
            ]}
            onPress={() => !answered && handleAnswer(i)}
          >
            <Image source={vid} style={styles.video} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10
  },

  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    width: "90%"
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
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center"
  },

  video: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },

  correct: { backgroundColor: "#27AE60" },
  wrong: { backgroundColor: "#E74C3C" }
})
