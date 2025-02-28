import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function PerfilLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3b82f6', // Color azul
        tabBarInactiveTintColor: '#6b7280', // Color gris
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 4,
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 60,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Información Personal',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Personalización',
          tabBarIcon: ({ color }) => <FontAwesome name="sliders" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}