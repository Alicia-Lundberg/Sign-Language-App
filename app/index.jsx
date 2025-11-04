import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Language App</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/home')}>
        <Text style={styles.buttonText}>Logga in</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  title: { color: 'white', fontSize: 32, marginBottom: 40 },
  button: { padding: 20, backgroundColor: '#4A90E2', borderRadius: 12 },
  buttonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
})
