import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MultipleChoiceQuestion({ current, selectedAnswer, showResult, handleAnswer }) {
  return (
    <View style={styles.container}>

      {/* Question text */}
      <Text style={styles.question}>{current.question}</Text>

      {/* GIF for the current question */}
      <Image source={current.gif} style={styles.gif} />

      {/* Options */}
      <View style={styles.optionsGrid}>
        {current.options.map((opt, i) => {
          const isSelected = i === selectedAnswer;
          const isCorrect = i === current.correct;

          // Determine style
          let buttonStyle = [styles.optionButton];
          if (showResult) {
            if (isCorrect && selectedAnswer !== current.correct) {
              buttonStyle.push(styles.correctBorder); // correct answer outlined if user got it wrong
            } else if (isSelected && selectedAnswer !== current.correct) {
              buttonStyle.push(styles.wrong); // wrong selection
            } else if (isCorrect && selectedAnswer === current.correct) {
              buttonStyle.push(styles.correct); // correct selection
            }
          } else if (isSelected) {
            buttonStyle.push(styles.selected); // selected but not checked
          }

          return (
            <TouchableOpacity
              key={i}
              style={buttonStyle}
              onPress={() => !showResult && handleAnswer(i)}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', width: '100%' },
  gif: { width: 300, height: 250, marginBottom: 20 },
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
    backgroundColor: 'white', // default background
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  correct: { backgroundColor: '#27AE60' },
  wrong: { backgroundColor: '#E74C3C' }
})
