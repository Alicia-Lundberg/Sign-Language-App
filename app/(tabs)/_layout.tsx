import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
//import { AppSettingsContext } from '../context/AppSettingsContext'

export default function TabsLayout() {
  //const { textSize } = useContext(AppSettingsContext)


  return (
    <Tabs 
        screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#b0d8d7ff',
          height: 70,            // ökar höjden på menyraden
          paddingBottom: 10,     // nedre padding för ikoner
          borderColor: '#3A7874FF',
        },
        tabBarItemStyle: {
          marginTop: 5,          // justerar ikonerna lite nedåt
        },
        tabBarActiveTintColor: '#3A7874FF',
        tabBarInactiveTintColor: '#3A787480',
      }}
    >
      
      {/* <Tabs.Screen
        name="lessons"
        options={{
          title: 'Lessons',
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />
        }}
      /> */}

      <Tabs.Screen 
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />
        }}
      />
    </Tabs>
  )
}
