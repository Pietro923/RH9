import { Stack } from 'expo-router';
import * as React from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '~/components/nativewindui/Text';

export default function AsistenciaScreen() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [registroHoy, setRegistroHoy] = React.useState(false);
  const [registros, setRegistros] = React.useState([
    { fecha: '26 Feb 2025', entrada: '08:45', salida: '17:30', horas: '8:45', estado: 'completo' },
    { fecha: '25 Feb 2025', entrada: '09:00', salida: '18:15', horas: '9:15', estado: 'completo' },
    { fecha: '24 Feb 2025', entrada: '08:30', salida: '17:45', horas: '9:15', estado: 'completo' },
    { fecha: '21 Feb 2025', entrada: '08:50', salida: '16:30', horas: '7:40', estado: 'incompleto' },
    { fecha: '20 Feb 2025', entrada: '09:15', salida: '18:00', horas: '8:45', estado: 'completo' },
  ]);

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('es-ES', options);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const handleRegistrarEntrada = () => {
    setIsLoading(true);
    
    // Simulación de registro
    setTimeout(() => {
      const nuevoRegistro = {
        fecha: '27 Feb 2025',
        entrada: getCurrentTime(),
        salida: '-',
        horas: '-',
        estado: 'pendiente'
      };
      
      setRegistros([nuevoRegistro, ...registros]);
      setRegistroHoy(true);
      setIsLoading(false);
      
      Alert.alert(
        "Entrada registrada",
        `Se ha registrado tu entrada a las ${nuevoRegistro.entrada}`,
        [{ text: "OK" }]
      );
    }, 1500);
  };

  const handleRegistrarSalida = () => {
    setIsLoading(true);
    
    // Simulación de registro
    setTimeout(() => {
      const registrosActualizados = [...registros];
      const horaEntrada = new Date();
      horaEntrada.setHours(parseInt(registrosActualizados[0].entrada.split(':')[0]));
      horaEntrada.setMinutes(parseInt(registrosActualizados[0].entrada.split(':')[1]));
      
      const horaSalida = new Date();
      const diferenciaHoras = Math.round((horaSalida.getTime() - horaEntrada.getTime()) / 3600000 * 100) / 100;
      
      registrosActualizados[0] = {
        ...registrosActualizados[0],
        salida: getCurrentTime(),
        horas: `${Math.floor(diferenciaHoras)}:${Math.round((diferenciaHoras % 1) * 60).toString().padStart(2, '0')}`,
        estado: diferenciaHoras >= 8 ? 'completo' : 'incompleto'
      };
      
      setRegistros(registrosActualizados);
      setRegistroHoy(false);
      setIsLoading(false);
      
      Alert.alert(
        "Salida registrada",
        `Se ha registrado tu salida a las ${registrosActualizados[0].salida}`,
        [{ text: "OK" }]
      );
    }, 1500);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Registro de Asistencia' }} />
      
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1 bg-gray-50 dark:bg-gray-900"
      >
        {/* Cabecera */}
        <View className="rounded-b-3xl bg-blue-600 px-5 py-6">
          <Text variant="title2" className="mb-1 text-white">
            Control de Asistencia
          </Text>
          <Text className="text-white opacity-80">
            {getCurrentDate()}
          </Text>
        </View>
        
        {/* Registro del día */}
        <View className="m-5 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <Text variant="title3" className="mb-4 dark:text-gray-100">Hoy</Text>
          
          <View className="items-center justify-center my-4">
            <Text className="text-lg text-center mb-2 dark:text-gray-100">
              {!registroHoy ? 'Registra tu entrada' : 'Registra tu salida'}
            </Text>
            
            <Text className="text-gray-500 text-center mb-6 dark:text-gray-400">
              {!registroHoy 
                ? 'No has registrado tu entrada hoy' 
                : 'Has registrado tu entrada, no olvides registrar tu salida'}
            </Text>
            
            <TouchableOpacity
              onPress={!registroHoy ? handleRegistrarEntrada : handleRegistrarSalida}
              disabled={isLoading}
              className={`rounded-full w-32 h-32 items-center justify-center ${!registroHoy ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="large" />
              ) : (
                <>
                  <Ionicons 
                    name={!registroHoy ? "log-in-outline" : "log-out-outline"} 
                    size={40} 
                    color="#FFFFFF" 
                  />
                  <Text className="text-white mt-2 font-medium">
                    {!registroHoy ? 'ENTRADA' : 'SALIDA'}
                  </Text>
                </>
              )}
            </TouchableOpacity>
            
            <Text className="text-blue-600 mt-6 text-xl font-bold">
              {getCurrentTime()}
            </Text>
          </View>
        </View>
        
        {/* Historial */}
        <View className="mx-5 mb-6">
          <Text variant="title3" className="mb-4 dark:text-gray-100">Historial</Text>
          
          {registros.map((registro, index) => (
            <View 
              key={index} 
              className="mb-3 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800"
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-medium dark:text-gray-100">{registro.fecha}</Text>
                <View 
                  className={`px-2 py-1 rounded-full ${
                    registro.estado === 'completo' 
                      ? 'bg-green-100' 
                      : registro.estado === 'pendiente' 
                        ? 'bg-yellow-100' 
                        : 'bg-red-100'
                  }`}
                >
                  <Text 
                    className={`text-xs ${
                      registro.estado === 'completo' 
                        ? 'text-green-600' 
                        : registro.estado === 'pendiente' 
                          ? 'text-yellow-600' 
                          : 'text-red-600'
                    }`}
                  >
                    {registro.estado === 'completo' 
                      ? 'Completo' 
                      : registro.estado === 'pendiente' 
                        ? 'Pendiente' 
                        : 'Incompleto'}
                  </Text>
                </View>
              </View>
              
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">Entrada</Text>
                  <Text className="dark:text-gray-100">{registro.entrada}</Text>
                </View>
                
                <View>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">Salida</Text>
                  <Text className="dark:text-gray-100">{registro.salida}</Text>
                </View>
                
                <View>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">Horas</Text>
                  <Text className="dark:text-gray-100">{registro.horas}</Text>
                </View>
              </View>
            </View>
          ))}
          
          <TouchableOpacity 
            className="mt-2 items-center py-3 bg-blue-600 rounded-lg"
          >
            <Text className="text-white font-medium">Ver historial completo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}