import { Stack } from 'expo-router';
import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '~/components/nativewindui/Text';

export default function BeneficiosScreen() {
  // Categorías de beneficios
  const categorias = [
    { id: 1, nombre: 'Todos', icono: 'grid-outline', activo: true },
    { id: 2, nombre: 'Salud', icono: 'fitness-outline', activo: false },
    { id: 3, nombre: 'Ocio', icono: 'film-outline', activo: false },
    { id: 4, nombre: 'Formación', icono: 'school-outline', activo: false },
    { id: 5, nombre: 'Familia', icono: 'people-outline', activo: false },
  ];

  // Estado para las categorías
  const [categoriasState, setCategoriasState] = React.useState(categorias);

  // Cambiar categoría activa
  const seleccionarCategoria = (id: number) => {
    const nuevasCategorias = categoriasState.map(cat => ({
      ...cat,
      activo: cat.id === id
    }));
    setCategoriasState(nuevasCategorias);
  };

  // Datos de beneficios
  const beneficios = [
    {
      id: 1,
      titulo: 'Seguro médico privado',
      descripcion: 'Cobertura completa para ti y tu familia con las mejores aseguradoras.',
      categoria: 'Salud',
      icono: 'medkit-outline',
      color: 'bg-red-500',
      destacado: true
    },
    {
      id: 2,
      titulo: 'Descuento en gimnasios',
      descripcion: '30% de descuento en la cadena FitnessPro y acceso a clases exclusivas.',
      categoria: 'Salud',
      icono: 'barbell-outline',
      color: 'bg-orange-500',
      destacado: false
    },
    {
      id: 3,
      titulo: 'Entradas para cine',
      descripcion: '2 entradas gratis al mes en cualquier sala CineStar.',
      categoria: 'Ocio',
      icono: 'film-outline',
      color: 'bg-purple-500',
      destacado: false
    },
    {
      id: 4,
      titulo: 'Formación online ilimitada',
      descripcion: 'Acceso a más de 5000 cursos en plataformas como Udemy y Coursera.',
      categoria: 'Formación',
      icono: 'laptop-outline',
      color: 'bg-blue-500',
      destacado: true
    },
    {
      id: 5,
      titulo: 'Ayuda guardería',
      descripcion: 'Hasta 200€ mensuales para guardería para hijos menores de 3 años.',
      categoria: 'Familia',
      icono: 'happy-outline',
      color: 'bg-green-500',
      destacado: false
    },
    {
      id: 6,
      titulo: 'Descuento en restaurantes',
      descripcion: '15% de descuento en cadenas asociadas y restaurantes premium.',
      categoria: 'Ocio',
      icono: 'restaurant-outline',
      color: 'bg-yellow-500',
      destacado: false
    },
    {
      id: 7,
      titulo: 'Días extra de vacaciones',
      descripcion: '1 día adicional por cada año de antigüedad (hasta 5 días).',
      categoria: 'Ocio',
      icono: 'airplane-outline',
      color: 'bg-teal-500',
      destacado: true
    },
    {
      id: 8,
      titulo: 'Plan de jubilación',
      descripcion: 'Aportación mensual al plan de pensiones con beneficios fiscales.',
      categoria: 'Familia',
      icono: 'hourglass-outline',
      color: 'bg-indigo-500',
      destacado: false
    },
  ];

  // Filtrar beneficios según la categoría seleccionada
  const beneficiosFiltrados = React.useMemo(() => {
    const categoriaActiva = categoriasState.find(cat => cat.activo)?.nombre;
    if (categoriaActiva === 'Todos') {
      return beneficios;
    }
    return beneficios.filter(ben => ben.categoria === categoriaActiva);
  }, [categoriasState]);

  // Beneficios destacados
  const beneficiosDestacados = beneficios.filter(ben => ben.destacado);

  return (
    <>
      <Stack.Screen options={{ title: 'Beneficios' }} />
      
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1 bg-gray-50 dark:bg-gray-900"
      >
        {/* Cabecera */}
        <View className="rounded-b-3xl bg-blue-600 px-5 py-6">
          <Text variant="title2" className="mb-1 text-white">
            Beneficios Corporativos
          </Text>
          <Text className="text-white opacity-80">
            Descubre todo lo que tenemos para ti
          </Text>
        </View>
        
        {/* Destacados */}
        <View className="px-5 py-6">
          <Text variant="title3" className="mb-4 dark:text-gray-100">
            Destacados
          </Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {beneficiosDestacados.map(beneficio => (
              <TouchableOpacity
                key={beneficio.id}
                className="mr-4 rounded-xl bg-white shadow-sm dark:bg-gray-800 w-64"
              >
                <View className={`${beneficio.color} p-4 rounded-t-xl`}>
                  <Ionicons name={beneficio.icono} size={28} color="#FFFFFF" />
                </View>
                <View className="p-4">
                  <Text className="font-bold mb-1 text-lg dark:text-gray-100">{beneficio.titulo}</Text>
                  <Text className="text-gray-600 dark:text-gray-400" numberOfLines={2}>
                    {beneficio.descripcion}
                  </Text>
                  <View className="flex-row mt-2 items-center">
                    <View className="bg-blue-100 px-2 py-1 rounded-full">
                      <Text className="text-xs text-blue-600">{beneficio.categoria}</Text>
                    </View>
                    <Text className="ml-auto text-blue-600 text-sm">Ver detalles</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Categorías */}
        <View className="px-5">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 15 }}
          >
            {categoriasState.map(categoria => (
              <TouchableOpacity
                key={categoria.id}
                className={`mr-4 px-4 py-2 rounded-full flex-row items-center ${
                  categoria.activo ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                onPress={() => seleccionarCategoria(categoria.id)}
              >
                <Ionicons 
                  name={categoria.icono} 
                  size={16} 
                  color={categoria.activo ? '#FFFFFF' : '#666666'} 
                  className="mr-1"
                />
                <Text 
                  className={categoria.activo ? 'text-white' : 'text-gray-700 dark:text-gray-300'}
                >
                  {categoria.nombre}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Lista de beneficios */}
        <View className="px-5 pb-8">
          <Text variant="title3" className="mb-4 mt-2 dark:text-gray-100">
            Todos los beneficios
          </Text>
          
          {beneficiosFiltrados.length === 0 ? (
            <View className="items-center py-8">
              <Ionicons name="sad-outline" size={48} color="#CCCCCC" />
              <Text className="mt-2 text-gray-600 dark:text-gray-400">
                No hay beneficios disponibles en esta categoría
              </Text>
            </View>
          ) : (
            beneficiosFiltrados.map(beneficio => (
              <TouchableOpacity
                key={beneficio.id}
                className="mb-4 rounded-xl bg-white shadow-sm dark:bg-gray-800 flex-row overflow-hidden"
              >
                <View className={`${beneficio.color} p-4 justify-center items-center w-16`}>
                  <Ionicons name={beneficio.icono} size={24} color="#FFFFFF" />
                </View>
                <View className="p-4 flex-1">
                  <Text className="font-medium mb-1 dark:text-gray-100">{beneficio.titulo}</Text>
                  <Text className="text-gray-600 dark:text-gray-400" numberOfLines={2}>
                    {beneficio.descripcion}
                  </Text>
                  <View className="flex-row mt-2 items-center">
                    <View className="bg-blue-100 px-2 py-1 rounded-full">
                      <Text className="text-xs text-blue-600">{beneficio.categoria}</Text>
                    </View>
                    <TouchableOpacity className="ml-auto">
                      <Text className="text-blue-600">Ver más</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
}