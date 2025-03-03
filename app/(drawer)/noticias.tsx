import { Stack } from 'expo-router';
import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '~/components/nativewindui/Text';

export default function NoticiasScreen() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState<'todas' | 'importantes' | 'eventos'>('todas');

  // Definir tipos para las noticias
  type Noticia = {
    id: number;
    title: string;
    date: string;
    preview: string;
    content: string;
    category: 'general' | 'importante' | 'evento';
    imageUrl?: string;
  };

  // Datos de ejemplo para las noticias
  const noticias: Noticia[] = [
    {
      id: 1,
      title: 'Nuevos beneficios para empleados',
      date: '25 Feb 2025',
      preview: 'Se han incorporado nuevos beneficios para todos los empleados de la compañía...',
      content: 'Nos complace anunciar la incorporación de nuevos beneficios para todos los empleados de la compañía. Entre estos beneficios se incluyen: descuentos en gimnasios, seguro médico ampliado, y días adicionales de vacaciones por antigüedad. Para más información, contacta con el departamento de RRHH.',
      category: 'importante',
      imageUrl: 'https://example.com/benefits.jpg'
    },
    {
      id: 2,
      title: 'Próxima jornada de team building',
      date: '20 Feb 2025',
      preview: 'No te pierdas la jornada de team building que celebraremos el próximo mes...',
      content: 'Estamos organizando una jornada de team building para el próximo 15 de marzo. El evento tendrá lugar en el Parque Natural y contará con actividades al aire libre, comida y diferentes dinámicas para fomentar el trabajo en equipo. ¡No te lo pierdas!',
      category: 'evento',
      imageUrl: 'https://example.com/teambuilding.jpg'
    },
    {
      id: 3,
      title: 'Actualización de la política de teletrabajo',
      date: '15 Feb 2025',
      preview: 'Importantes cambios en nuestra política de teletrabajo que entrarán en vigor desde el próximo mes...',
      content: 'A partir del 1 de abril, se implementará la nueva política de teletrabajo que permite hasta 3 días a la semana de trabajo remoto. Esta medida busca mejorar la conciliación laboral y familiar de nuestros empleados mientras mantenemos la cultura de empresa y la colaboración en la oficina.',
      category: 'importante',
      imageUrl: 'https://example.com/remote.jpg'
    },
    {
      id: 4,
      title: 'Nuevo sistema de gestión de proyectos',
      date: '10 Feb 2025',
      preview: 'Hemos implementado un nuevo sistema de gestión de proyectos para mejorar nuestra eficiencia...',
      content: 'El departamento de IT ha completado la implementación del nuevo sistema de gestión de proyectos. A partir de ahora, todos los equipos deberán utilizar esta plataforma para el seguimiento de tareas y proyectos. Se organizarán sesiones de formación durante las próximas semanas.',
      category: 'general',
      imageUrl: 'https://example.com/projects.jpg'
    },
    {
      id: 5,
      title: 'Celebración del aniversario de la empresa',
      date: '5 Feb 2025',
      preview: 'Este año celebramos el 15º aniversario de nuestra empresa con un evento especial...',
      content: 'Nos complace invitaros a la celebración del 15º aniversario de la empresa que tendrá lugar el próximo 20 de abril en el Hotel Metropol. Habrá cena, música en vivo y sorpresas para todos los asistentes. ¡Contamos con vosotros para celebrar este hito tan importante!',
      category: 'evento',
      imageUrl: 'https://example.com/anniversary.jpg'
    }
  ];

  // Filtrar noticias según la categoría seleccionada
  const filteredNoticias = React.useMemo(() => {
    if (filter === 'todas') return noticias;
    if (filter === 'importantes') return noticias.filter(noticia => noticia.category === 'importante');
    return noticias.filter(noticia => noticia.category === 'evento');
  }, [filter]);

  // Simular carga de datos
  const refreshNoticias = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const [expandedNews, setExpandedNews] = React.useState<number | null>(null);

  const toggleExpandNews = (id: number) => {
    if (expandedNews === id) {
      setExpandedNews(null);
    } else {
      setExpandedNews(id);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Noticias',
          headerRight: () => (
            <TouchableOpacity
              onPress={refreshNoticias}
              className="mr-4"
            >
              <Ionicons name="refresh-outline" size={24} color="#333" className="dark:text-gray-100" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1 bg-gray-50 dark:bg-gray-900"
      >
        {/* Cabecera */}
        <View className="rounded-b-3xl bg-blue-600 px-5 py-6">
          <Text variant="title2" className="mb-1 text-white">
            Noticias y Eventos
          </Text>
          <Text className="text-white opacity-80">
            Mantente informado sobre todo lo que ocurre en la empresa
          </Text>
        </View>

        {/* Filtros */}
        <View className="flex-row justify-between px-5 py-4">
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${filter === 'todas' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            onPress={() => setFilter('todas')}
          >
            <Text className={filter === 'todas' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
              Todas
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${filter === 'importantes' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            onPress={() => setFilter('importantes')}
          >
            <Text className={filter === 'importantes' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
              Importantes
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${filter === 'eventos' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            onPress={() => setFilter('eventos')}
          >
            <Text className={filter === 'eventos' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
              Eventos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Estado de carga */}
        {loading && (
          <View className="items-center py-4">
            <ActivityIndicator size="large" color="#3366CC" />
            <Text className="mt-2 text-gray-600 dark:text-gray-400">Cargando noticias...</Text>
          </View>
        )}

        {/* Lista de noticias */}
        <View className="px-5 pb-8">
          {filteredNoticias.length === 0 ? (
            <View className="items-center py-8">
              <Ionicons name="newspaper-outline" size={48} color="#CCCCCC" />
              <Text className="mt-2 text-gray-600 dark:text-gray-400">No hay noticias disponibles</Text>
            </View>
          ) : (
            filteredNoticias.map(noticia => (
              <TouchableOpacity
                key={noticia.id}
                className="mb-4 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800"
                onPress={() => toggleExpandNews(noticia.id)}
              >
                <View className="flex-row justify-between mb-1">
                  <Text variant="subhead" className="font-medium flex-1 dark:text-gray-100">
                    {noticia.title}
                  </Text>
                  {noticia.category === 'importante' && (
                    <View className="bg-red-100 px-2 py-1 rounded-full">
                      <Text className="text-xs text-red-600">Importante</Text>
                    </View>
                  )}
                  {noticia.category === 'evento' && (
                    <View className="bg-green-100 px-2 py-1 rounded-full">
                      <Text className="text-xs text-green-600">Evento</Text>
                    </View>
                  )}
                </View>
                
                <Text className="mb-2 text-xs text-gray-500">
                  {noticia.date}
                </Text>
                
                {expandedNews === noticia.id ? (
                  <>
                    <Text className="text-gray-700 mb-3 dark:text-gray-300">
                      {noticia.content}
                    </Text>
                    <View className="flex-row justify-end">
                      <TouchableOpacity 
                        className="px-3 py-1 bg-blue-600 rounded-md"
                        onPress={() => setExpandedNews(null)}
                      >
                        <Text className="text-white text-xs">Cerrar</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <Text numberOfLines={2} className="text-gray-700 dark:text-gray-300">
                    {noticia.preview}
                  </Text>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
}