// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// export default function MultipleChoiceQuestion({ current, answered, correct, handleAnswer }) {
//   return (
    
//     <View style={styles.optionsGrid}>
//       {/* 
//       <View style={{ flexDirection: 'row', gap: 0, marginTop: 20 }}>
//         {(Array.isArray(current.gif) ? current.gif : [current.gif]).map((gifSource, index) => (
//           <Image
//             key={index}
//             source={gifSource}
//             style={{ width: 250, height: 300, borderRadius: 12 }}
//             resizeMode="contain"
//           />
//         ))}
//       </View> */}

//       {current.options.map((opt, i) => (
//         <TouchableOpacity
//           key={i}
//           style={[
//             styles.optionButton,
//             answered && (i === current.correct
//               ? styles.correct
//               : i === current.options.findIndex((_, idx) => idx === i && !correct)
//                 ? styles.wrong
//                 : {})
//           ]}
//           onPress={() => !answered && handleAnswer(i)}
//         >
//           <Text style={styles.optionText}>{opt}</Text>

//         </TouchableOpacity>
//       ))}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   optionsGrid: {
//     width: '100%',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between'
//   },
//   optionButton: {
//     width: '48%',
//     padding: 20,
//     marginBottom: 15,
//     borderRadius: 10,
//     backgroundColor: '#4A90E2',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   optionText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
//   correct: { backgroundColor: '#27AE60' },
//   wrong: { backgroundColor: '#E74C3C' }
// })

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function MultipleChoiceQuestion({ current, answered, correct, handleAnswer }) {
  return (
    <View style={styles.container}>

      {/* Question text */}
      <Text style={styles.question}>{current.question}</Text>

      {/* GIF for the current question */}
      <Image source={current.gif} style={styles.gif} />

      {/* Options */}
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
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  correct: { backgroundColor: '#27AE60' },
  wrong: { backgroundColor: '#E74C3C' }
})