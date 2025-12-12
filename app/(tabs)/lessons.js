import { StyleSheet, Text, View } from 'react-native'
export default function LessonsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lektioner</Text>
      <Text style={styles.infoText}>Sidan är under utveckling</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {fontSize: 30, fontWeight: 'bold', marginBottom: 10},
  infoText: {
    marginBottom: 30, 
    fontSize: 18,
    color: '#666' 
  }
})
