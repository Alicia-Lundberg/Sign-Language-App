import { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function PairQuestion({ current, setSelectedAnswer, answered }) {
  const [selectedGif, setSelectedGif] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);

  const allSelected = selectedGif !== null && selectedWord !== null;

  useEffect(() => {
    if (allSelected) {
      setSelectedAnswer({ gif: selectedGif, word: selectedWord });
    }
  }, [allSelected, selectedGif, selectedWord]);

  const handleGifPress = (index) => {
    if (!answered) setSelectedGif(index);
  };

  const handleWordPress = (index) => {
    if (!answered) setSelectedWord(index);
  };

  const getGifStyles = (index) => {
    let borderColor = '#3a7874ff';  
    let backgroundColor = '#b0d8d7ff'; 

    if (selectedGif === index) {
      borderColor = '#00BFFF';
      backgroundColor = '#00BFFF';
    } else if (allSelected && index !== selectedGif) {
      borderColor = '#FFA500';
      backgroundColor = '#FFA500';
    }

    return { borderColor, backgroundColor };
  };

  const getWordStyles = (index) => {
    let borderColor = '#3a7874ff';
    let backgroundColor = '#3A7874FF';

    if (selectedWord === index) {
      borderColor = '#00BFFF';
      backgroundColor = '#00BFFF';
    } else if (allSelected && index !== selectedWord) {
      borderColor = '#FFA500';
      backgroundColor = '#FFA500';
    }

    return { borderColor, backgroundColor };
  };

  return (
    <View style={styles.container}>
      {/* GIFs centered */}
      <View style={styles.gifContainer}>
        {current.gif.map((gif, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleGifPress(i)}
            style={[styles.target, getGifStyles(i)]}
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
            style={[styles.word, getWordStyles(i)]}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },

  gifContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  target: {
    width: width * 0.5,
    height: width * 0.5,
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
    resizeMode: 'contain',
  },

  wordsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 130,
    paddingHorizontal: 10,
  },

  word: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
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
