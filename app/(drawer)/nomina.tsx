import { Stack } from 'expo-router';
import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from '~/components/nativewindui/Text';
import { Container } from '~/components/Container';

export default function NominaScreen() {
  const [expandedItem, setExpandedItem] = React.useState<number | null>(null);  // Definir el tipo explícitamente
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Datos de ejemplo de nómina
  const nominaData = [
    {
      id: 1,
      periodo: 'Enero 2025',
      fechaPago: '31/01/2025',
      sueldoBruto: 3200.00,
      deducciones: 850.40,
      sueldoNeto: 2349.60,
      detalles: [
        { concepto: 'Salario Base', monto: 3000.00, tipo: 'ingreso' },
        { concepto: 'Bono Puntualidad', monto: 200.00, tipo: 'ingreso' },
        { concepto: 'ISR', monto: 520.40, tipo: 'deduccion' },
        { concepto: 'Seguridad Social', monto: 280.00, tipo: 'deduccion' },
        { concepto: 'Fondo de Ahorro', monto: 50.00, tipo: 'deduccion' },
      ]
    },
    {
      id: 2,
      periodo: 'Febrero 2025',
      fechaPago: '28/02/2025',
      sueldoBruto: 3200.00,
      deducciones: 850.40,
      sueldoNeto: 2349.60,
      detalles: [
        { concepto: 'Salario Base', monto: 3000.00, tipo: 'ingreso' },
        { concepto: 'Bono Puntualidad', monto: 200.00, tipo: 'ingreso' },
        { concepto: 'ISR', monto: 520.40, tipo: 'deduccion' },
        { concepto: 'Seguridad Social', monto: 280.00, tipo: 'deduccion' },
        { concepto: 'Fondo de Ahorro', monto: 50.00, tipo: 'deduccion' },
      ]
    }
  ];

  const toggleExpand = (id: number) => {  // Definir el tipo del parámetro id
    setExpandedItem(expandedItem === id ? null : id);
  };

  const nominaResumen = {
    ultimoSueldo: "2,349.60",
    promedioAnual: "2,320.45",
    historialMeses: 12
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Mi Nómina',
          headerShadowVisible: false
        }} 
      />
      
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1 bg-gray-50 dark:bg-gray-900"
      >
        {/* Banner superior */}
        <View className="rounded-b-3xl bg-blue-600 px-5 py-8">
          <Text variant="title2" className="mb-1 text-white">
            Mi Nómina
          </Text>
          <Text className="text-white opacity-80">
            Consulta y descarga tus recibos de nómina
          </Text>
        </View>
        
        {/* Resumen de nómina */}
        <View className="mx-5 mt-6 mb-6 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <Text variant="title3" className="mb-4">Resumen</Text>
          
          <View className="flex-row justify-between">
            <View className="flex-1 items-center">
              <Text variant="title2" className="text-blue-600">${nominaResumen.ultimoSueldo}</Text>
              <Text className="text-center text-xs">Último sueldo</Text>
            </View>
            
            <View className="flex-1 items-center">
              <Text variant="title2" className="text-blue-600">${nominaResumen.promedioAnual}</Text>
              <Text className="text-center text-xs">Promedio anual</Text>
            </View>
            
            <View className="flex-1 items-center">
              <Text variant="title2" className="text-blue-600">{nominaResumen.historialMeses}</Text>
              <Text className="text-center text-xs">Meses de historial</Text>
            </View>
          </View>
        </View>
        
        {/* Historial de nómina */}
        <View className="px-5 pb-8">
          <Text variant="title3" className="mb-4">Historial de nómina</Text>
          
          {nominaData.map(nomina => (
            <View key={nomina.id} className="mb-4">
              <TouchableOpacity
                onPress={() => toggleExpand(nomina.id)}
                className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800"
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={20} color="#3366CC" />
                    <Text variant="subhead" className="ml-2 font-medium">
                      {nomina.periodo}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="mr-3 text-gray-700 dark:text-gray-300">
                      ${nomina.sueldoNeto.toFixed(2)}
                    </Text>
                    <Ionicons 
                      name={expandedItem === nomina.id ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color="#4b5563" 
                    />
                  </View>
                </View>
              </TouchableOpacity>
              
              {expandedItem === nomina.id && (
                <View className="mt-1 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
                  <View className="flex-row justify-between mb-4">
                    <Text className="text-gray-500">Fecha de pago:</Text>
                    <Text className="font-medium text-gray-700 dark:text-gray-300">{nomina.fechaPago}</Text>
                  </View>
                  
                  <View className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-gray-500">Sueldo Bruto:</Text>
                      <Text className="font-medium text-gray-700 dark:text-gray-300">${nomina.sueldoBruto.toFixed(2)}</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-gray-500">Deducciones:</Text>
                      <Text className="font-medium text-gray-700 dark:text-gray-300">-${nomina.deducciones.toFixed(2)}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-medium">Sueldo Neto:</Text>
                      <Text className="font-bold text-blue-600">${nomina.sueldoNeto.toFixed(2)}</Text>
                    </View>
                  </View>
                  
                  <Text variant="subhead" className="mb-2 font-medium">Detalles</Text>
                  
                  {nomina.detalles.map((item, index) => (
                    <View key={index} className="flex-row justify-between py-2">
                      <Text className="text-gray-700 dark:text-gray-300">{item.concepto}</Text>
                      <Text className={item.tipo === 'ingreso' ? 'text-green-600' : 'text-red-500'}>
                        {item.tipo === 'ingreso' ? '+' : '-'}${item.monto.toFixed(2)}
                      </Text>
                    </View>
                  ))}
                  
                  <TouchableOpacity className="mt-4 flex-row items-center justify-center py-3 bg-blue-600 rounded-xl">
                    <Ionicons name="download-outline" size={18} color="#ffffff" />
                    <Text className="ml-2 text-white font-medium">Descargar Recibo</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
