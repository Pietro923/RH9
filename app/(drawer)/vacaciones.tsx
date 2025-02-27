import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function VacacionesScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Stack.Screen options={{ title: 'Vacaciones' }} />
      <Text className="text-xl font-bold">Pantalla de Vacaciones</Text>
    </View>
  );
}