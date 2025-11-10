import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function MultipleChoiceQuestion({ current, answered, correct, handleAnswer }) {
  return (
    <View style={styles.optionsGrid}>
      {current.options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.optionButton,
            answered && (i === current.correct
              ? styles.correct
              : i === current.options.findIndex((_, idx) => idx === i && !correct)
                ? styles.wrong
                : {})
          ]}
          onPress={() => !answered && handleAnswer(i)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  correct: { backgroundColor: '#27AE60' },
  wrong: { backgroundColor: '#E74C3C' }
})
