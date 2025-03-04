import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind'; // Para manejar el tema dark/light

export default function SalirScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { colorScheme } = useColorScheme(); // Obtener el tema actual

  const handleLogout = async () => {
    setLoading(true);
    
    try {
      // Simula una pequeña demora para mostrar el loader
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      router.replace('/(auth)/login'); // Redirige al login
    } catch (error) {
      Alert.alert(
        "Error", 
        "Hubo un problema al cerrar sesión. Por favor intenta nuevamente.",
        [{ text: "Aceptar" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back(); // Regresa a la pantalla anterior
  };

  return (
    <View className={`flex-1 justify-center ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} px-6`}>
      <View className={`${colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-md`}>
        <View className="items-center mb-6">
          <View className={`w-20 h-20 ${colorScheme === 'dark' ? 'bg-red-900' : 'bg-red-50'} rounded-full items-center justify-center mb-4`}>
            <Ionicons name="log-out-outline" size={40} color={colorScheme === 'dark' ? '#FECACA' : '#EF4444'} />
          </View>
          <Text className={`text-2xl font-bold ${colorScheme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
            Cerrar sesión
          </Text>
          <Text className={`${colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-500'} text-center mt-2`}>
            ¿Estás seguro que quieres cerrar tu sesión actual?
          </Text>
        </View>
        
        {loading ? (
          <View className="items-center py-4">
            <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#FECACA' : '#EF4444'} />
            <Text className={`${colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-500'} mt-2`}>
              Cerrando sesión...
            </Text>
          </View>
        ) : (
          <View className="space-y-3">
            <TouchableOpacity 
              className={`${colorScheme === 'dark' ? 'bg-red-700' : 'bg-red-500'} py-4 rounded-lg items-center`}
              onPress={handleLogout}
            >
              <Text className="text-white font-semibold">Cerrar Sesión</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className={`${colorScheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} py-4 rounded-lg items-center`}
              onPress={handleCancel}
            >
              <Text className={`${colorScheme === 'dark' ? 'text-gray-100' : 'text-gray-700'} font-semibold`}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}