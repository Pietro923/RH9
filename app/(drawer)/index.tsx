import { Stack } from 'expo-router';
import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Text } from '~/components/nativewindui/Text';

export default function Home() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = React.useState(3);
  const router = useRouter();
  
  // Definir tipos estrictos
  type QuickAction = {
    id: number;
    name: string;
    icon: keyof typeof Ionicons.glyphMap; // Asegura que el icono sea válido
    route: '/vacaciones' | '/nomina' | '/asistencia' | '/formacion';
  };

  const quickActions: QuickAction[] = [
    { id: 1, name: 'Solicitar vacaciones', icon: 'umbrella-outline', route: '/vacaciones' },
    { id: 2, name: 'Ver nómina', icon: 'document-text-outline', route: '/nomina' },
    { id: 3, name: 'Registrar asistencia', icon: 'time-outline', route: '/asistencia' },
    { id: 4, name: 'Formación', icon: 'school-outline', route: '/formacion' },
  ];
  
  const newsItems = [
    { 
      id: 1, 
      title: 'Nuevos beneficios para empleados',
      date: '25 Feb 2025',
      preview: 'Se han incorporado nuevos beneficios para todos los empleados de la compañía...'
    },
    { 
      id: 2, 
      title: 'Próxima jornada de team building',
      date: '20 Feb 2025',
      preview: 'No te pierdas la jornada de team building que celebraremos el próximo mes...'
    }
  ];
  
  const handleMarkAllRead = () => {
    setNotifications(0);
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Inicio', 
          headerRight: () => (
            <TouchableOpacity 
              onPress={handleMarkAllRead} 
              className="mr-4"
            >
              <View className="relative">
                <Ionicons name="notifications-outline" className='dark:text-gray-100' size={24} color="#333" />
                {notifications > 0 && (
                  <View className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                    <Text className="text-xs text-white">{notifications}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1 bg-gray-50 dark:bg-gray-900"
      >
        {/* Banner de bienvenida */}
        <View className="rounded-b-3xl bg-blue-600 px-5 py-8">
          <Text variant="title2" className="mb-1 text-white">
            ¡Bienvenido, 'empleado'!
          </Text>
          <Text className="text-white opacity-80">
            Miércoles, 27 de febrero de 2025
          </Text>
        </View>
        
        {/* Acciones rápidas */}
        <View className="px-5 py-6">
          <Text variant="title3" className="mb-4 dark:text-gray-100">
            Acciones rápidas
          </Text>
          
          <View className="flex-row flex-wrap justify-between dark:text-gray-100">
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.id}
                className="mb-4 w-[48%] items-center rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800 dark:text-gray-100"
                onPress={() => router.push(action.route)}
              >
                <Ionicons name={action.icon} size={28} color="#3366CC" className="mb-2" />
                <Text className="text-center">{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Resumen */}
        <View className="mx-5 mb-6 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <Text variant="title3" className="mb-4 dark:text-gray-100">Resumen</Text>
          
          <View className="flex-row justify-between">
            <View className="flex-1 items-center">
              <Text variant="title2" className="text-blue-600">12</Text>
              <Text className="text-center text-xs dark:text-gray-100">Días de vacaciones</Text>
            </View>
            
            <View className="flex-1 items-center">
              <Text variant="title2" className="text-blue-600">3</Text>
              <Text className="text-center text-xs dark:text-gray-100">Cursos en progreso</Text>
            </View>
            
            <View className="flex-1 items-center">
              <Text variant="title2" className="text-blue-600">2</Text>
              <Text className="text-center text-xs dark:text-gray-100">Tareas pendientes</Text>
            </View>
          </View>
        </View>
        
        {/* Noticias */}
        <View className="px-5 pb-8">
          <View className="mb-4 flex-row justify-between items-center">
            <Text variant="title3" className='dark:text-gray-100'>Noticias</Text>
            <TouchableOpacity onPress={() => router.push('/noticias')}>
              <Text className="text-blue-600">Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          {newsItems.map(item => (
            <TouchableOpacity
              key={item.id}
              className="mb-4 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800 dark:text-gray-100"
            >
              <Text variant="subhead" className="mb-1 font-medium">
                {item.title}
              </Text>
              <Text className="mb-2 text-xs text-gray-500">
                {item.date}
              </Text>
              <Text numberOfLines={2} className="text-gray-700 dark:text-gray-300">
                {item.preview}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
}