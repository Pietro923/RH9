import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function SalirScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Stack.Screen options={{ title: 'Salir' }} />
      <Text className="text-xl font-bold">Pantalla de Cerrar Sesión</Text>
    </View>
  );
}