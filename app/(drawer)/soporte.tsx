import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function SoporteScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Stack.Screen options={{ title: 'Soporte' }} />
      <Text className="text-xl font-bold">Pantalla de Soporte</Text>
    </View>
  );
}