import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function ProfileScreen() {
  const handleLogout = () => {
    router.replace('/') // tillbaka till login och ta bort historiken
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Page</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logga ut</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, marginBottom: 30 },
  button: {
    padding: 15,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
})
