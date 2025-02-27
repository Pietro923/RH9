import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function AsistenciaScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Stack.Screen options={{ title: 'Asistencia' }} />
      <Text className="text-xl font-bold">Pantalla de Asistencia</Text>
    </View>
  );
}