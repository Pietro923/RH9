import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { Mail, MessageCircle, HelpCircle, Phone, ExternalLink, FileText, Clock } from "lucide-react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as React from 'react';

export default function SoporteScreen() {
  const insets = useSafeAreaInsets();
  const [mostrarEstadoSoporte, setMostrarEstadoSoporte] = React.useState(true);

  // Estado de tickets activos
  const ticketsActivos = [
    {
      id: "T-2458",
      titulo: "Problema con solicitud de vacaciones",
      estado: "En proceso",
      color: "#f59e0b", // naranja
      ultimaRespuesta: "Hace 2 horas"
    }
  ];

  // Opciones de soporte
  const opcionesSoporte = [
    {
      id: 1,
      titulo: "Preguntas Frecuentes",
      descripcion: "Encuentra respuestas a las preguntas más comunes",
      icono: HelpCircle,
      colorFondo: "#dbeafe", // azul claro
      colorIcono: "#3b82f6", // azul
      ruta: "/faq"
    },
    {
      id: 2,
      titulo: "Crear Ticket de Soporte",
      descripcion: "Envía una solicitud detallada a nuestro equipo",
      icono: FileText,
      colorFondo: "#d1fae5", // verde claro
      colorIcono: "#10b981", // verde
      ruta: "/nuevo-ticket"
    },
    {
      id: 3,
      titulo: "Chat en Vivo",
      descripcion: "Habla con un agente de soporte en tiempo real",
      icono: MessageCircle,
      colorFondo: "#ede9fe", // morado claro
      colorIcono: "#8b5cf6", // morado
      ruta: "/chat"
    },
    {
      id: 4,
      titulo: "Soporte Telefónico",
      descripcion: "Llámanos de lunes a viernes, 9:00 - 18:00",
      icono: Phone,
      colorFondo: "#ffedd5", // naranja claro
      colorIcono: "#f59e0b", // naranja
      ruta: "/telefono"
    },
    {
      id: 5,
      titulo: "Historial de Tickets",
      descripcion: "Revisa el estado de tus solicitudes anteriores",
      icono: Clock,
      colorFondo: "#e0f2fe", // azul celeste claro
      colorIcono: "#0ea5e9", // azul celeste
      ruta: "/historial-tickets"
    }
  ];

  // Estado de disponibilidad del soporte
  const estadoSoporte = {
    disponible: true,
    mensaje: "Soporte disponible (Tiempo de respuesta estimado: 15 minutos)",
    horaApertura: "9:00",
    horaCierre: "18:00"
  };

  return (
    <>
       <Stack.Screen options={{ title: 'Soporte' }} />
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      
      <ScrollView className="flex-1">
        {/* Banner */}
        <View className="rounded-b-3xl bg-blue-600 px-5 py-8">
          <Text className="text-2xl font-bold text-white mb-2">
            ¿Cómo podemos ayudarte?
          </Text>
          <Text className="text-white opacity-80">
            Selecciona una opción para recibir soporte.
          </Text>
        </View>
        
        {/* Estado de soporte - Banner colapsable */}
        {mostrarEstadoSoporte && (
          <View className="mx-5 mt-4 bg-white rounded-xl p-4 shadow-sm dark:bg-gray-800 border-l-4 border-green-500">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className={`h-3 w-3 rounded-full ${estadoSoporte.disponible ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
                <Text className="font-medium text-gray-700 dark:text-gray-200">
                  {estadoSoporte.disponible ? 'Soporte en línea' : 'Fuera de horario'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setMostrarEstadoSoporte(false)}>
                <Text className="text-blue-600 text-sm">Ocultar</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-2">
              <Text className="text-gray-600 text-sm dark:text-gray-300">
                {estadoSoporte.mensaje}
              </Text>
              <Text className="text-gray-500 text-xs mt-1 dark:text-gray-400">
                Horario: {estadoSoporte.horaApertura} - {estadoSoporte.horaCierre} (L-V)
              </Text>
            </View>
          </View>
        )}
        
        {/* Tickets activos */}
        {ticketsActivos.length > 0 && (
          <View className="mx-5 mt-4 mb-2">
            <Text className="font-semibold text-gray-700 mb-3 dark:text-gray-200">
              Tickets activos
            </Text>
            
            {ticketsActivos.map(ticket => (
              <TouchableOpacity
                key={ticket.id}
                className="bg-white p-4 rounded-xl flex-row items-center border border-gray-100 shadow-sm mb-2 dark:bg-gray-800 dark:border-gray-700"
                activeOpacity={0.7}
              >
                <View className={`p-2 rounded-lg mr-3`} style={{ backgroundColor: ticket.color + '20' }}>
                  <FileText size={20} color={ticket.color} />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {ticket.id}
                    </Text>
                    <View className="ml-2 px-2 py-1 rounded-full" style={{ backgroundColor: ticket.color + '20' }}>
                      <Text className="text-xs" style={{ color: ticket.color }}>
                        {ticket.estado}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-base font-semibold text-gray-800 dark:text-gray-100">
                    {ticket.titulo}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                    Última actualización: {ticket.ultimaRespuesta}
                  </Text>
                </View>
                <ExternalLink size={16} color="#64748b" />
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {/* Opciones de soporte */}
        <View className="mx-5 mt-4 mb-4">
          <Text className="font-semibold text-gray-700 mb-3 dark:text-gray-200">
            Opciones de soporte
          </Text>
          
          <View className="space-y-3">
            {opcionesSoporte.map((opcion) => {
              const IconComponent = opcion.icono;
              
              return (
                <TouchableOpacity
                  key={opcion.id}
                  className="bg-white p-4 rounded-xl flex-row items-center border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700"
                  activeOpacity={0.7}
                >
                  <View className="p-3 rounded-lg mr-4" style={{ backgroundColor: opcion.colorFondo }}>
                    <IconComponent size={24} color={opcion.colorIcono} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {opcion.titulo}
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-300">
                      {opcion.descripcion}
                    </Text>
                  </View>
                  <ExternalLink size={18} color="#64748b" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        {/* Centro de conocimiento */}
        <View className="mx-5 mb-8 p-5 bg-blue-50 rounded-xl dark:bg-blue-900/50">
          <Text className="text-lg font-semibold text-blue-800 mb-2 dark:text-blue-200">
            Centro de Conocimiento
          </Text>
          <Text className="text-blue-700 mb-4 dark:text-blue-300">
            Consulta nuestros artículos y guías para resolver dudas comunes sobre los procesos internos.
          </Text>
          <TouchableOpacity className="bg-blue-600 py-3 rounded-lg items-center">
            <Text className="text-white font-medium">
              Explorar recursos
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Mensaje del equipo */}
        <View className="mx-5 mb-8 items-center">
          <Text className="text-sm text-center text-gray-500 dark:text-gray-400">
            Nuestro equipo de soporte está disponible para ayudarte con cualquier problema o duda que puedas tener.
          </Text>
        </View>
      </ScrollView>
    </View>
    </>
  );
}