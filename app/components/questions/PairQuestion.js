import { Dimensions, StyleSheet, Text, View } from 'react-native';
import PairQuestionDragAndDrop from "./PairQuestionDragAndDrop";

const { width } = Dimensions.get('window');

export default function PairQuestion({ current, setSelectedAnswer, setShowResult }) {

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{current.question}</Text>
      <View style={styles.row}>
        <PairQuestionDragAndDrop />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  question: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  row: { width: '100%', marginTop: 10 }
});