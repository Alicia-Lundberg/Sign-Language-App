import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MultipleChoiceQuestion({ current, selectedAnswer, showResult, handleAnswer }) {
  return (
    <View style={styles.optionsGrid}>
      {current.options.map((opt, i) => {
        const isSelected = i === selectedAnswer;
        const isCorrect = i === current.correct;

        // Bestäm knappstil
        let buttonStyle = [styles.optionButton];

        if (showResult) {
          if (isCorrect && selectedAnswer !== current.correct) {
            buttonStyle.push(styles.correctBorder); // korrekt svar får bara grön border om man svarade fel
          } else if (isSelected && selectedAnswer !== current.correct) {
            buttonStyle.push(styles.wrong); // fel svar blir rött
          } else if (isCorrect && selectedAnswer === current.correct) {
            buttonStyle.push(styles.correct); // korrekt svar blir helt grön om rätt
          }
        } else if (isSelected) {
          buttonStyle.push(styles.selected); // markerad men inte kontrollerad: blå outline
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
    backgroundColor: 'white', // vit standard
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white', // vit default border
    // 3D / skugga
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6, // Android
  },
  selected: {
    borderColor: '#40617aff', // blå outline när markerad
    borderWidth: 2
  },
  correctBorder: {
    borderWidth: 2,
    borderColor: '#27AE60', // grön border för korrekt alternativ om fel svar
    backgroundColor: 'white', // behåll vit bakgrund
  },
  correct: {
    backgroundColor: '#27AE60',
    borderColor: '#27AE60'
  },
  wrong: {
    backgroundColor: '#E74C3C',
    borderWidth: 0
  },
  optionText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
