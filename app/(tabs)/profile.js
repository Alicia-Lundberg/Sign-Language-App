import { router } from 'expo-router'
import { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppSettingsContext } from '../context/AppSettingsContext'

export default function ProfileScreen() {
  const { textSize, setTextSize } = useContext(AppSettingsContext)

  
  const handleLogout = () => {
    router.replace('/') // tillbaka till login och ta bort historiken
  }

  const resetTextSize = () => setTextSize(22) // standardstorlek

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: textSize }]}>Profile Page</Text>

      {/* Knappar för att ändra textstorlek */}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TouchableOpacity style={styles.adjustButton} onPress={() => setTextSize(textSize + 2)}>
          <Text style={styles.adjustButtonText}>+ Större text</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.adjustButton} onPress={() => setTextSize(textSize - 2)}>
          <Text style={styles.adjustButtonText}>- Mindre text</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.adjustButton} onPress={resetTextSize}>
          <Text style={styles.adjustButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={[styles.buttonText, { fontSize: textSize - 4 }]}>Logga ut</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginBottom: 30, fontWeight: 'bold' },
  adjustButton: {
    padding: 10,
    backgroundColor: '#3A7874FF',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  adjustButtonText: { color: 'white', fontWeight: 'bold' },
  button: {
    padding: 15,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
})
