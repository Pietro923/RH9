import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
// Si usas Supabase, descomenta esta línea
// import { supabase } from '~/lib/supabase'; 

export default function SalirScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    
    try {
      // Si usas Supabase, Firebase, o cualquier otro servicio, descomenta y usa su método de logout.
      // await supabase.auth.signOut(); 
      
      // Simula una pequeña demora para mostrar el loader
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
    <View className="flex-1 justify-center bg-gray-50 px-6">
      <View className="bg-white rounded-xl p-8 shadow-md">
        <View className="items-center mb-6">
          <View className="w-20 h-20 bg-red-50 rounded-full items-center justify-center mb-4">
            <Ionicons name="log-out-outline" size={40} color="#EF4444" />
          </View>
          <Text className="text-2xl font-bold text-gray-800">Cerrar sesión</Text>
          <Text className="text-gray-500 text-center mt-2">
            ¿Estás seguro que quieres cerrar tu sesión actual?
          </Text>
        </View>
        
        {loading ? (
          <View className="items-center py-4">
            <ActivityIndicator size="large" color="#EF4444" />
            <Text className="text-gray-500 mt-2">Cerrando sesión...</Text>
          </View>
        ) : (
          <View className="space-y-3">
            <TouchableOpacity 
              className="bg-red-500 py-4 rounded-lg items-center"
              onPress={handleLogout}
            >
              <Text className="text-white font-semibold">Cerrar Sesión</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-gray-100 py-4 rounded-lg items-center"
              onPress={handleCancel}
            >
              <Text className="text-gray-700 font-semibold">Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}