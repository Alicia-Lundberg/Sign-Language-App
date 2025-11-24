import { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function PairQuestion({ current, setSelectedAnswer, setShowResult }) {
  const [selectedGif, setSelectedGif] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);

  // Check if both are selected
  const allSelected = selectedGif !== null && selectedWord !== null;

  // Whenever both are selected, update LessonDetail state
  useEffect(() => {
    if (allSelected) {
      // Send indices to LessonDetail so checkAnswer can compare reliably.
      // We intentionally do NOT call setShowResult here — user presses "Kontrollera".
      setSelectedAnswer({ gif: selectedGif, word: selectedWord });
    }
  }, [allSelected, selectedGif, selectedWord]);

  const handleGifPress = (index) => setSelectedGif(index);
  const handleWordPress = (index) => setSelectedWord(index);

  const getGifBorderColor = (index) => {
    if (selectedGif === index) return '#00BFFF';
    if (allSelected && index !== selectedGif) return '#FFA500'; // auto pair the other
    return '#ccc';
  };

  const getWordBorderColor = (index) => {
    if (selectedWord === index) return '#00BFFF';
    if (allSelected && index !== selectedWord) return '#FFA500';
    return '#ccc';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{current.question}</Text>

      <View style={styles.row}>
        <View style={styles.leftColumn}>
          {current.gif.map((gif, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleGifPress(i)}
              style={[styles.target, { borderColor: getGifBorderColor(i) }]}
            >
              <Image source={gif} style={styles.gif} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.rightColumn}>
          {current.options.map((word, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleWordPress(i)}
              style={[styles.word, { borderColor: getWordBorderColor(i) }]}
            >
              <Text style={styles.wordText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  question: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  leftColumn: { width: '45%', justifyContent: 'space-around' },
  rightColumn: { width: '45%', justifyContent: 'space-around' },
  target: {
    width: '100%',
    height: width * 0.4,
    borderWidth: 3,
    borderRadius: 12,
    marginBottom: 20,
  },
  gif: { width: '100%', height: '100%', borderRadius: 12 },
  word: {
    padding: 15,
    backgroundColor: '#4A90E2',
    marginBottom: 20,
    borderWidth: 3,
    borderRadius: 8,
    alignItems: 'center',
  },
  wordText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
