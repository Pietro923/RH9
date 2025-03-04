import { Stack } from 'expo-router';
import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/nativewindui/Text';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function VacacionesScreen() {
  const insets = useSafeAreaInsets();
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [showStartPicker, setShowStartPicker] = React.useState(false);
  const [showEndPicker, setShowEndPicker] = React.useState(false);
  const [remainingDays, setRemainingDays] = React.useState(12);
  const [requestedDays, setRequestedDays] = React.useState(0);

  // Historial de solicitudes de vacaciones
  const vacationHistory = [
    { 
      id: 1, 
      startDate: '10 Mar 2025', 
      endDate: '17 Mar 2025', 
      days: 5,
      status: 'Aprobado' 
    },
    { 
      id: 2, 
      startDate: '01 Jun 2025', 
      endDate: '10 Jun 2025', 
      days: 7,
      status: 'Pendiente' 
    }
  ];

  // Cambiar fecha de inicio
  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
    calculateRequestedDays(currentDate, endDate);
  };

  // Cambiar fecha de fin
  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
    calculateRequestedDays(startDate, currentDate);
  };

  // Calcular días solicitados
  const calculateRequestedDays = (start, end) => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setRequestedDays(diffDays);
  };

  // Formatear fecha para mostrar
  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Enviar solicitud
  const handleSubmitRequest = () => {
    if (startDate > endDate) {
      Alert.alert('Error', 'La fecha de inicio debe ser anterior a la fecha de fin');
      return;
    }
    
    if (requestedDays > remainingDays) {
      Alert.alert('Error', 'No tienes suficientes días disponibles');
      return;
    }
    
    Alert.alert(
      'Confirmar solicitud',
      `¿Estás seguro de solicitar ${requestedDays} días de vacaciones desde ${formatDate(startDate)} hasta ${formatDate(endDate)}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => {
            Alert.alert('Éxito', 'Tu solicitud ha sido enviada y está pendiente de aprobación');
            setRemainingDays(remainingDays - requestedDays);
          }
        }
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Vacaciones' }} />
      
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1 bg-gray-50 dark:bg-gray-900"
      >
        {/* Banner */}
        <View className="rounded-b-3xl bg-blue-600 px-5 py-8">
          <Text variant="title2" className="mb-1 text-white">
            Gestión de Vacaciones
          </Text>
          <Text className="text-white opacity-80">
            Días disponibles: {remainingDays}
          </Text>
        </View>
        
        {/* Formulario de solicitud */}
        <View className="mx-5 mt-6 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <Text variant="title3" className="mb-4 dark:text-gray-100">
            Solicitar vacaciones
          </Text>
          
          <View className="mb-4">
            <Text className="mb-2 dark:text-gray-100">Fecha de inicio</Text>
            <TouchableOpacity 
              onPress={() => setShowStartPicker(true)}
              className="flex-row items-center justify-between rounded-lg border border-gray-300 p-3"
            >
              <Text className="dark:text-gray-100">{formatDate(startDate)}</Text>
              <Ionicons name="calendar-outline" size={20} color="#3366CC" />
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onChangeStartDate}
                minimumDate={new Date()}
              />
            )}
          </View>
          
          <View className="mb-4">
            <Text className="mb-2 dark:text-gray-100">Fecha de fin</Text>
            <TouchableOpacity 
              onPress={() => setShowEndPicker(true)}
              className="flex-row items-center justify-between rounded-lg border border-gray-300 p-3"
            >
              <Text className="dark:text-gray-100">{formatDate(endDate)}</Text>
              <Ionicons name="calendar-outline" size={20} color="#3366CC" />
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={onChangeEndDate}
                minimumDate={startDate}
              />
            )}
          </View>
          
          <View className="mb-6 flex-row justify-between items-center">
            <Text className="dark:text-gray-100">Días solicitados:</Text>
            <Text variant="title3" className="text-blue-600">{requestedDays}</Text>
          </View>
          
          <TouchableOpacity
            className="rounded-lg bg-blue-600 p-4 items-center"
            onPress={handleSubmitRequest}
          >
            <Text className="font-medium text-white">Enviar solicitud</Text>
          </TouchableOpacity>
        </View>
        
        {/* Historial de solicitudes */}
        <View className="mx-5 my-6 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <Text variant="title3" className="mb-4 dark:text-gray-100">
            Historial de solicitudes
          </Text>
          
          {vacationHistory.length > 0 ? (
            vacationHistory.map(item => (
              <View
                key={item.id}
                className="mb-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <View className="flex-row justify-between mb-2">
                  <Text className="font-medium dark:text-gray-100">
                    {item.startDate} - {item.endDate}
                  </Text>
                  <View 
                    className={`rounded-full px-2 py-1 ${
                      item.status === 'Aprobado' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}
                  >
                    <Text 
                      className={`text-xs ${
                        item.status === 'Aprobado' ? 'text-green-800' : 'text-yellow-800'
                      }`}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
                <Text className="dark:text-gray-300">Duración: {item.days} días</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500 dark:text-gray-400">
              No hay solicitudes previas
            </Text>
          )}
        </View>
        
        {/* Políticas de vacaciones */}
        <View className="mx-5 mb-8 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <View className="flex-row items-center mb-4">
            <Ionicons name="information-circle" size={24} color="#3366CC" className="mr-2" />
            <Text variant="title3" className="dark:text-gray-100">
              Políticas de vacaciones
            </Text>
          </View>
          
          <Text className="mb-2 dark:text-gray-300">
            • Las solicitudes deben hacerse con al menos 2 semanas de antelación
          </Text>
          <Text className="mb-2 dark:text-gray-300">
            • El período máximo consecutivo es de 15 días
          </Text>
          <Text className="mb-2 dark:text-gray-300">
            • Durante temporada alta (diciembre) se requiere 1 mes de antelación
          </Text>
          <Text className="dark:text-gray-300">
            • Las cancelaciones deben realizarse con 3 días de antelación
          </Text>
        </View>
      </ScrollView>
    </>
  );
}