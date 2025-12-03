import { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function PairQuestion({ current, setSelectedAnswer }) {
  const [selectedGif, setSelectedGif] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);

  const allSelected = selectedGif !== null && selectedWord !== null;

  useEffect(() => {
    if (allSelected) {
      setSelectedAnswer({ gif: selectedGif, word: selectedWord });
    }
  }, [allSelected, selectedGif, selectedWord]);

  const handleGifPress = (index) => setSelectedGif(index);
  const handleWordPress = (index) => setSelectedWord(index);

  const getGifBorderColor = (index) => {
    if (selectedGif === index) return '#00BFFF';
    if (allSelected && index !== selectedGif) return '#FFA500';
    return '#b0d8d7ff';
  };

  const getWordBorderColor = (index) => {
    if (selectedWord === index) return '#00BFFF';
    if (allSelected && index !== selectedWord) return '#FFA500';
    return '#3A7874FF';
  };

  return (
    <View style={styles.container}>
      {/* GIFs centered */}
      <View style={styles.gifContainer}>
        {current.gif.map((gif, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleGifPress(i)}
            style={[styles.target, { borderColor: getGifBorderColor(i), backgroundColor: getGifBorderColor(i) }]}
          >
            <Image source={gif} style={styles.gif} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Words slightly above bottom */}
      <View style={styles.wordsContainer}>
        {current.options.map((word, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleWordPress(i)}
            style={[styles.word, { borderColor: getWordBorderColor(i), backgroundColor: getWordBorderColor(i) }]}
          >
            <Text style={styles.wordText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // GIFs in middle, words at bottom
    alignItems: 'center',
    paddingVertical: 20,
  },

  gifContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',  // vertical center
    alignItems: 'center',      // horizontal center
  },

  target: {
    width: width * 0.5,        // smaller width to prevent vertical strips
    height: width * 0.5,       // keep GIF square
    borderWidth: 3,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  gif: {
    width: '140%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'contain',      // preserve aspect ratio
  },

  wordsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 130,           // move words a bit up from bottom
    paddingHorizontal: 10,
  },

  word: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    backgroundColor: '#3A7874FF',
    borderWidth: 3,
    borderRadius: 8,
    alignItems: 'center',
  },

  wordText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
