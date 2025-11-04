import { StyleSheet, Text, View } from 'react-native'
export default function LessonsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>what type of Page should this be...?</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22 }
})
