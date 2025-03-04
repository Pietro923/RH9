import { Stack } from 'expo-router';
import * as React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '~/components/nativewindui/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DesempeñoScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = React.useState('objetivos');

  // Datos de los objetivos
  const objetivos = [
    {
      id: 1,
      titulo: 'Mejorar la satisfacción del cliente',
      descripcion: 'Incrementar el NPS en un 15% mediante la mejora de los tiempos de respuesta',
      progreso: 75,
      fechaLimite: '30 May 2025',
      categoria: 'Desarrollo profesional'
    },
    {
      id: 2,
      titulo: 'Optimizar procesos internos',
      descripcion: 'Reducir el tiempo de procesamiento de solicitudes en un 25%',
      progreso: 40,
      fechaLimite: '15 Jul 2025',
      categoria: 'Eficiencia'
    },
    {
      id: 3,
      titulo: 'Completar certificación avanzada',
      descripcion: 'Obtener la certificación de nivel avanzado en herramientas de análisis',
      progreso: 90,
      fechaLimite: '10 Abr 2025',
      categoria: 'Formación'
    }
  ];

  // Datos de evaluaciones
  const evaluaciones = [
    {
      id: 1,
      periodo: '2024 Q4',
      fecha: '15 Ene 2025',
      calificacion: 4.2,
      comentarios: 'Excelente desempeño en proyectos clave. Áreas de mejora: comunicación con otros departamentos.',
      evaluador: 'Carlos Martínez'
    },
    {
      id: 2,
      periodo: '2024 Q3',
      fecha: '05 Oct 2024',
      calificacion: 4.0,
      comentarios: 'Buen trabajo en la gestión de proyectos. Necesita mejorar la documentación de procesos.',
      evaluador: 'Laura Sánchez'
    }
  ];

  // Datos de competencias
  const competencias = [
    { id: 1, nombre: 'Liderazgo', nivel: 3.8, maxNivel: 5 },
    { id: 2, nombre: 'Trabajo en equipo', nivel: 4.5, maxNivel: 5 },
    { id: 3, nombre: 'Resolución de problemas', nivel: 4.2, maxNivel: 5 },
    { id: 4, nombre: 'Comunicación', nivel: 3.5, maxNivel: 5 },
    { id: 5, nombre: 'Adaptabilidad', nivel: 4.0, maxNivel: 5 }
  ];

  // Renderiza la barra de progreso
  const renderProgressBar = (progreso) => (
    <View className="h-3 w-full bg-gray-200 rounded-full mt-2 mb-1">
      <View 
        className="h-3 bg-blue-600 rounded-full" 
        style={{ width: `${progreso}%` }} 
      />
    </View>
  );

  // Renderiza las estrellas de calificación
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <View className="flex-row">
        {[...Array(fullStars)].map((_, i) => (
          <Ionicons key={`full-${i}`} name="star" size={16} color="#FFD700" />
        ))}
        {halfStar && <Ionicons name="star-half" size={16} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />
        ))}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Desempeño y Evaluaciones' }} />
      
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1 bg-gray-50 dark:bg-gray-900"
      >
        {/* Banner */}
        <View className="rounded-b-3xl bg-blue-600 px-5 py-8">
          <Text variant="title2" className="mb-1 text-white">
            Seguimiento de Desempeño
          </Text>
          <Text className="text-white opacity-80">
            Periodo actual: Q1 2025
          </Text>
        </View>
        
        {/* Resumen */}
        <View className="mx-5 mt-6 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <Text variant="title3" className="mb-4 dark:text-gray-100">
            Resumen General
          </Text>
          
          <View className="flex-row justify-between mb-6">
            <View className="flex-1 items-center">
              <Text variant="title2" className="text-blue-600">85%</Text>
              <Text className="text-center text-xs dark:text-gray-100">Progreso objetivos</Text>
            </View>
            
            <View className="flex-1 items-center">
              <Text variant="title2" className="text-blue-600">4.1</Text>
              <Text className="text-center text-xs dark:text-gray-100">Evaluación actual</Text>
            </View>
            
            <View className="flex-1 items-center">
              <Text variant="title2" className="text-blue-600">3</Text>
              <Text className="text-center text-xs dark:text-gray-100">Objetivos activos</Text>
            </View>
          </View>
          
          <View className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900">
            <View className="flex-row items-center mb-2">
              <Ionicons name="trending-up" size={20} color="#3366CC" className="mr-2" />
              <Text className="font-medium text-blue-800 dark:text-blue-200">Punto destacado</Text>
            </View>
            <Text className="text-blue-800 dark:text-blue-200">Tu desempeño ha mejorado un 8% respecto al trimestre anterior.</Text>
          </View>
        </View>
        
        {/* Tabs */}
        <View className="flex-row mx-5 mt-6 mb-2">
          <TouchableOpacity 
            className={`py-2 px-4 mr-2 rounded-lg ${activeTab === 'objetivos' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            onPress={() => setActiveTab('objetivos')}
          >
            <Text className={activeTab === 'objetivos' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
              Objetivos
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`py-2 px-4 mr-2 rounded-lg ${activeTab === 'evaluaciones' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            onPress={() => setActiveTab('evaluaciones')}
          >
            <Text className={activeTab === 'evaluaciones' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
              Evaluaciones
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`py-2 px-4 rounded-lg ${activeTab === 'competencias' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            onPress={() => setActiveTab('competencias')}
          >
            <Text className={activeTab === 'competencias' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
              Competencias
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Contenido según tab seleccionado */}
        {activeTab === 'objetivos' && (
          <View className="mx-5 mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text variant="subhead" className="font-medium dark:text-gray-100">
                Objetivos activos
              </Text>
              <TouchableOpacity>
                <Text className="text-blue-600">+ Añadir</Text>
              </TouchableOpacity>
            </View>
            
            {objetivos.map(objetivo => (
              <View key={objetivo.id} className="mb-4 bg-white rounded-xl p-5 shadow-sm dark:bg-gray-800">
                <View className="flex-row justify-between">
                  <Text variant="subhead" className="font-medium mb-1 dark:text-gray-100">
                    {objetivo.titulo}
                  </Text>
                  <View className="bg-blue-100 rounded-full px-2 py-1">
                    <Text className="text-xs text-blue-800">{objetivo.categoria}</Text>
                  </View>
                </View>
                
                <Text className="text-gray-600 mb-3 dark:text-gray-300">
                  {objetivo.descripcion}
                </Text>
                
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-gray-500 text-sm dark:text-gray-400">Progreso</Text>
                  <Text className="text-gray-700 font-medium dark:text-gray-300">{objetivo.progreso}%</Text>
                </View>
                
                {renderProgressBar(objetivo.progreso)}
                
                <View className="flex-row justify-between mt-2">
                  <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={14} color="#6B7280" className="mr-1" />
                    <Text className="text-xs text-gray-500 dark:text-gray-400">
                      Fecha límite: {objetivo.fechaLimite}
                    </Text>
                  </View>
                  
                  <TouchableOpacity>
                    <Text className="text-xs text-blue-600">Actualizar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
        
        {activeTab === 'evaluaciones' && (
          <View className="mx-5 mb-6">
            {evaluaciones.map(evaluacion => (
              <View key={evaluacion.id} className="mb-4 bg-white rounded-xl p-5 shadow-sm dark:bg-gray-800">
                <View className="flex-row justify-between">
                  <Text variant="subhead" className="font-medium dark:text-gray-100">
                    {evaluacion.periodo}
                  </Text>
                  {renderRating(evaluacion.calificacion)}
                </View>

                <Text className="text-gray-500 text-sm mb-3 dark:text-gray-400">
                  {evaluacion.fecha} - {evaluacion.evaluador}
                </Text>

                <Text className="text-gray-700 dark:text-gray-300">
                  {evaluacion.comentarios}
                </Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'competencias' && (
          <View className="mx-5 mb-6">
            {competencias.map(competencia => (
              <View key={competencia.id} className="mb-4 bg-white rounded-xl p-5 shadow-sm dark:bg-gray-800">
                <Text variant="subhead" className="font-medium mb-1 dark:text-gray-100">
                  {competencia.nombre}
                </Text>

                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-500 text-sm dark:text-gray-400">
                    Nivel: {competencia.nivel}/{competencia.maxNivel}
                  </Text>
                  {renderRating(competencia.nivel)}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}