import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MultipleChoiceQuestion({ current, selectedAnswer, showResult, handleAnswer }) {
  return (
    <View style={styles.container}>
      <Image source={current.gif} style={styles.gif} />

      {/* Options */}
      <View style={styles.optionsGrid}>
        {current.options.map((opt, i) => {
          const isSelected = i === selectedAnswer;
          const isCorrect = i === current.correct;

          // Determine button style
          let buttonStyle = [styles.optionButton];

          if (showResult) {
            if (isCorrect && selectedAnswer !== current.correct) {
              buttonStyle.push(styles.correctBorder);
            } else if (isSelected && selectedAnswer !== current.correct) {
              buttonStyle.push(styles.wrong);
            } else if (isCorrect && selectedAnswer === current.correct) {
              buttonStyle.push(styles.correct);
            }
          } else if (isSelected) {
            buttonStyle.push(styles.selected);
          }

          return (
            <TouchableOpacity
              key={i}
              style={buttonStyle}
              onPress={() => !showResult && handleAnswer(i)}
            >
              <Text
                style={[
                  styles.optionText,
                  showResult && (buttonStyle.includes(styles.correct) || buttonStyle.includes(styles.wrong))
                    ? { color: 'white' }
                    : null
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', width: '100%' },

  gif: { width: 300, height: 250, marginBottom: 20 },



  optionsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  optionButton: {
    width: '48%',
    minHeight: 100,
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  selected: {
    borderColor: '#40617aff',
    borderWidth: 2
  },

  correctBorder: {
    borderWidth: 2,
    borderColor: '#27AE60',
    backgroundColor: 'white',
  },

  correct: {
    backgroundColor: '#83efb7ff',
    borderWidth: 2,
    borderColor: '#27AE60'
  },

  wrong: {
    backgroundColor: '#f4a2a2ff',
    borderWidth: 2,
    borderColor: '#E74C3C'
  },

  optionText: {
    color: '#393939ff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
