import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function NoticiasScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Stack.Screen options={{ title: 'Noticias' }} />
      <Text className="text-xl font-bold">Pantalla de Noticias</Text>
    </View>
  );
}