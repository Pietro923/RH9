import { Stack } from 'expo-router';
import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '~/components/nativewindui/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function FormacionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('recomendados');

  // Datos de cursos recomendados
  const cursosRecomendados = [
    {
      id: 1,
      titulo: 'Liderazgo y gestión de equipos',
      instructor: 'Ana Jiménez',
      duracion: '12 horas',
      progreso: 0,
      imagen: '/api/placeholder/200/120',
      etiquetas: ['Liderazgo', 'Soft Skills'],
      fechaInicio: '10 Abril 2025'
    },
    {
      id: 2,
      titulo: 'Análisis de datos avanzado',
      instructor: 'Miguel Torres',
      duracion: '20 horas',
      progreso: 0,
      imagen: '/api/placeholder/200/120',
      etiquetas: ['Análisis', 'Excel'],
      fechaInicio: '15 Abril 2025'
    },
    {
      id: 3,
      titulo: 'Comunicación efectiva en entornos laborales',
      instructor: 'Laura Pérez',
      duracion: '8 horas',
      progreso: 0,
      imagen: '/api/placeholder/200/120',
      etiquetas: ['Comunicación', 'Soft Skills'],
      fechaInicio: '20 Abril 2025'
    }
  ];

  // Datos de cursos en progreso
  const cursosEnProgreso = [
    {
      id: 1,
      titulo: 'Gestión de proyectos avanzada',
      instructor: 'Pedro Sánchez',
      duracion: '25 horas',
      progreso: 65,
      imagen: '/api/placeholder/200/120',
      etiquetas: ['Proyectos', 'Gestión'],
      fechaLimite: '30 Marzo 2025'
    },
    {
      id: 2,
      titulo: 'Innovación y pensamiento creativo',
      instructor: 'Marta Gómez',
      duracion: '15 horas',
      progreso: 40,
      imagen: '/api/placeholder/200/120',
      etiquetas: ['Innovación', 'Creatividad'],
      fechaLimite: '15 Abril 2025'
    }
  ];

  // Datos de cursos completados
  const cursosCompletados = [
    {
      id: 1,
      titulo: 'Fundamentos de marketing digital',
      instructor: 'Carmen Rodríguez',
      duracion: '10 horas',
      fechaCompletado: '15 Febrero 2025',
      imagen: '/api/placeholder/200/120',
      certificado: true
    },
    {
      id: 2,
      titulo: 'Introducción a metodologías ágiles',
      instructor: 'Javier González',
      duracion: '8 horas',
      fechaCompletado: '20 Enero 2025',
      imagen: '/api/placeholder/200/120',
      certificado: true
    }
  ];

  // Próximos eventos formativos
  const proximosEventos = [
    {
      id: 1,
      titulo: 'Workshop: Trabajo en equipo',
      fecha: '12 Abril 2025',
      hora: '10:00 - 13:00',
      ubicacion: 'Sala de conferencias A',
      modalidad: 'Presencial'
    },
    {
      id: 2,
      titulo: 'Webinar: Tendencias en RR.HH.',
      fecha: '20 Abril 2025',
      hora: '16:00 - 17:30',
      ubicacion: 'Online (Teams)',
      modalidad: 'Virtual'
    }
  ];

  // Renderiza la barra de progreso
  const renderProgressBar = (progreso) => (
    <View className="h-2 w-full bg-gray-200 rounded-full mt-2">
      <View 
        className="h-2 bg-blue-600 rounded-full" 
        style={{ width: `${progreso}%` }} 
      />
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Formación' }} />
      
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1 bg-gray-50 dark:bg-gray-900"
      >
        {/* Banner */}
        <View className="rounded-b-3xl bg-blue-600 px-5 py-8">
          <Text variant="title2" className="mb-1 text-white">
            Centro de Formación
          </Text>
          <Text className="text-white opacity-80">
            Mejora tus habilidades y crece profesionalmente
          </Text>
        </View>
        
        {/* Avisos importantes */}
        <View className="mx-5 mt-6 mb-4">
          <Text variant="title3" className="mb-3 dark:text-gray-100">
            Avisos importantes
          </Text>
          
          <View className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-500 dark:bg-yellow-900">
            <View className="flex-row items-center mb-2">
              <Ionicons name="alert-circle" size={20} color="#F59E0B" className="mr-2" />
              <Text className="font-medium text-yellow-800 dark:text-yellow-200">Recordatorio</Text>
            </View>
            <Text className="text-yellow-800 dark:text-yellow-200">
              Tienes un curso que vence en 5 días. Completa "Gestión de proyectos avanzada" antes del 30 de marzo.
            </Text>
          </View>
          
          <View className="bg-green-50 rounded-xl p-4 mt-3 border-l-4 border-green-500 dark:bg-green-900">
            <View className="flex-row items-center mb-2">
              <Ionicons name="trophy" size={20} color="#10B981" className="mr-2" />
              <Text className="font-medium text-green-800 dark:text-green-200">¡Felicidades!</Text>
            </View>
            <Text className="text-green-800 dark:text-green-200">
              Has completado 2 cursos este trimestre. Estás en camino para lograr tu objetivo anual de formación.
            </Text>
          </View>
        </View>
        
        {/* Tabs */}
        <View className="flex-row mx-5 mt-2 mb-4">
          <TouchableOpacity 
            className={`py-2 px-3 mr-2 rounded-lg ${activeTab === 'recomendados' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            onPress={() => setActiveTab('recomendados')}
          >
            <Text className={activeTab === 'recomendados' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
              Recomendados
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`py-2 px-3 mr-2 rounded-lg ${activeTab === 'enProgreso' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            onPress={() => setActiveTab('enProgreso')}
          >
            <Text className={activeTab === 'enProgreso' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
              En progreso
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`py-2 px-3 rounded-lg ${activeTab === 'completados' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            onPress={() => setActiveTab('completados')}
          >
            <Text className={activeTab === 'completados' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
              Completados
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Contenido según tab seleccionado */}
        {activeTab === 'recomendados' && (
          <View className="mx-5 mb-6">
            {cursosRecomendados.map(curso => (
              <TouchableOpacity 
                key={curso.id} 
                className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm dark:bg-gray-800"
                onPress={() => {}}
              >
                <Image 
                  source={{ uri: curso.imagen }} 
                  className="w-full h-32" 
                />
                
                <View className="p-4">
                  <Text variant="subhead" className="font-medium mb-1 dark:text-gray-100">
                    {curso.titulo}
                  </Text>
                  
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="person-outline" size={14} color="#6B7280" className="mr-1" />
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                      {curso.instructor}
                    </Text>
                  </View>
                  
                  <View className="flex-row flex-wrap mb-3">
                    {curso.etiquetas.map((etiqueta, index) => (
                      <View key={index} className="bg-blue-100 rounded-full px-2 py-1 mr-2 mb-1">
                        <Text className="text-xs text-blue-800">{etiqueta}</Text>
                      </View>
                    ))}
                  </View>
                  
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Ionicons name="time-outline" size={14} color="#6B7280" className="mr-1" />
                      <Text className="text-xs text-gray-500 dark:text-gray-400">
                        {curso.duracion}
                      </Text>
                    </View>
                    
                    <View className="flex-row items-center">
                      <Ionicons name="calendar-outline" size={14} color="#6B7280" className="mr-1" />
                      <Text className="text-xs text-gray-500 dark:text-gray-400">
                        Inicia: {curso.fechaInicio}
                      </Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity className="mt-3 bg-blue-600 py-2 rounded-lg items-center">
                    <Text className="text-white font-medium">Inscribirse</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {activeTab === 'enProgreso' && (
          <View className="mx-5 mb-6">
            {cursosEnProgreso.map(curso => (
              <TouchableOpacity 
                key={curso.id} 
                className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm dark:bg-gray-800"
                onPress={() => {}}
              >
                <Image 
                  source={{ uri: curso.imagen }} 
                  className="w-full h-32" 
                />
                
                <View className="p-4">
                  <Text variant="subhead" className="font-medium mb-1 dark:text-gray-100">
                    {curso.titulo}
                  </Text>
                  
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="person-outline" size={14} color="#6B7280" className="mr-1" />
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                      {curso.instructor}
                    </Text>
                  </View>
                  
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-gray-700 dark:text-gray-300">Progreso</Text>
                    <Text className="text-gray-700 dark:text-gray-300">{curso.progreso}%</Text>
                  </View>
                  
                  {renderProgressBar(curso.progreso)}
                  
                  <View className="flex-row justify-between items-center mt-3">
                    <View className="flex-row items-center">
                      <Ionicons name="time-outline" size={14} color="#6B7280" className="mr-1" />
                      <Text className="text-xs text-gray-500 dark:text-gray-400">
                        {curso.duracion}
                      </Text>
                    </View>
                    
                    <View className="flex-row items-center">
                      <Ionicons name="alert-circle-outline" size={14} color="#EF4444" className="mr-1" />
                      <Text className="text-xs text-red-500">
                        Vence: {curso.fechaLimite}
                      </Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity className="mt-3 bg-blue-600 py-2 rounded-lg items-center">
                    <Text className="text-white font-medium">Continuar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {activeTab === 'completados' && (
          <View className="mx-5 mb-6">
            {cursosCompletados.map(curso => (
              <View key={curso.id} className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm dark:bg-gray-800 p-4">
                <Text variant="subhead" className="font-medium mb-1 dark:text-gray-100">
                  {curso.titulo}
                </Text>

                <View className="flex-row items-center mb-2">
                  <Ionicons name="person-outline" size={14} color="#6B7280" className="mr-1" />
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {curso.instructor}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center">
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    {curso.duracion}
                  </Text>
                  <Text className="text-xs text-green-500">
                    Completado el {curso.fechaCompletado}
                  </Text>
                </View>

                {curso.certificado && (
                  <View className="mt-2 flex-row items-center">
                    <Ionicons name="ribbon-outline" size={16} color="#10B981" className="mr-1" />
                    <Text className="text-xs text-green-500">Certificado disponible</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Próximos eventos */}
        <View className="mx-5 mt-6 mb-6">
          <Text variant="title3" className="mb-3 dark:text-gray-100">
            Próximos eventos
          </Text>
          {proximosEventos.map(evento => (
            <View key={evento.id} className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm dark:bg-gray-800 p-4">
              <Text variant="subhead" className="font-medium mb-1 dark:text-gray-100">
                {evento.titulo}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {evento.fecha} - {evento.hora}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {evento.ubicacion} ({evento.modalidad})
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </>
  );
}