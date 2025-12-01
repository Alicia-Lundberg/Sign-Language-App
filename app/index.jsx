import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Elk from '../assets/svgs/elk-with-shadow.svg';

export default function Index() {
  const { width } = useWindowDimensions()
  const elkSize = width * 0.7 // 60% av skärmbredden
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TECKNA</Text>
      <Elk style={styles.elk}width={elkSize} height={elkSize} />

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/home')}>
        <Text style={styles.buttonText}>Lär dig teckenspråk!
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#b0d8d7ff' }, // ljusblå bakgrund
  title: { color: 'white', fontSize: 32, marginVertical: 40, textAlign: 'center' },
  button: { padding: 20, width: 300, alignItems: 'center', backgroundColor: '#3A7874FF', borderRadius: 12 },
  buttonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  elk: { marginBottom: 40 },
})
