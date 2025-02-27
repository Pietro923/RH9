import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function NominaScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Stack.Screen options={{ title: 'Nomina' }} />
      <Text className="text-xl font-bold">Nomina</Text>
    </View>
  );
}