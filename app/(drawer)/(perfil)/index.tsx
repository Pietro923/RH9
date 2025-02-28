import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '~/lib/useColorScheme';

export default function InformacionPersonal() {
  const [editMode, setEditMode] = useState(false);
  const { isDarkColorScheme } = useColorScheme();
  const [userData, setUserData] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@ejemplo.com',
    telefono: '+34 612 345 678',
    direccion: 'Calle Principal 123, Madrid',
    fechaNacimiento: '15/05/1990',
    genero: 'Masculino',
    ocupacion: 'Desarrollador de Software'
  });

  // Colores según el tema
  const bgColor = isDarkColorScheme ? 'bg-gray-900' : 'bg-white';
  const sectionBgColor = isDarkColorScheme ? 'bg-gray-800' : 'bg-gray-50';
  const textColor = isDarkColorScheme ? 'text-white' : 'text-gray-800';
  const textMutedColor = isDarkColorScheme ? 'text-gray-400' : 'text-gray-500'; 
  const avatarBgColor = isDarkColorScheme ? 'bg-gray-700' : 'bg-gray-200';
  const avatarTextColor = isDarkColorScheme ? 'text-gray-300' : 'text-gray-400';
  const borderColor = isDarkColorScheme ? 'border-gray-700' : 'border-gray-300';
  const itemBgColor = isDarkColorScheme ? 'bg-gray-800' : 'bg-gray-50';

  const handleSave = () => {
    // Aquí normalmente enviarías los datos al servidor
    Alert.alert('Éxito', 'Información actualizada correctamente');
    setEditMode(false);
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Información Personal',
          headerShown: true,
          headerStyle: {
            backgroundColor: isDarkColorScheme ? '#111827' : '#ffffff'
          },
          headerTintColor: isDarkColorScheme ? '#ffffff' : '#000000',
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => setEditMode(!editMode)}
              className="mr-4"
            >
              <Text className="text-blue-500 font-medium">{editMode ? 'Cancelar' : 'Editar'}</Text>
            </TouchableOpacity>
          )
        }} 
      />
      <SafeAreaView edges={['bottom']} className={`flex-1 ${bgColor}`}>
        <ScrollView className="flex-1">
          <View className="px-4 py-6">
            {/* Foto de perfil */}
            <View className="items-center mb-6">
              <View className="relative">
                <View className={`w-24 h-24 rounded-full ${avatarBgColor} items-center justify-center overflow-hidden`}>
                  <Text className={`text-4xl ${avatarTextColor}`}>JP</Text>
                  {/* Puedes reemplazar con una imagen real: 
                  <Image source={require('~/assets/avatar.png')} className="w-full h-full" /> 
                  */}
                </View>
                {editMode && (
                  <TouchableOpacity className="absolute bottom-0 right-0 bg-blue-500 w-8 h-8 rounded-full items-center justify-center">
                    <FontAwesome name="camera" size={16} color="white" />
                  </TouchableOpacity>
                )}
              </View>
              <Text className={`text-xl font-bold mt-3 ${textColor}`}>{userData.nombre}</Text>
              <Text className={`${textMutedColor}`}>{userData.email}</Text>
            </View>

            {/* Secciones de información */}
            <View className="space-y-6">
              <View>
                <Text className={`text-lg font-bold mb-4 ${textColor}`}>Información de contacto</Text>
                <View className={`${sectionBgColor} rounded-xl p-4 space-y-4`}>
                  <ProfileField 
                    label="Email" 
                    value={userData.email} 
                    icon="envelope"
                    editMode={editMode}
                    onChangeText={(text) => setUserData({...userData, email: text})}
                    isDarkMode={isDarkColorScheme}
                  />
                  <ProfileField 
                    label="Teléfono" 
                    value={userData.telefono} 
                    icon="phone"
                    editMode={editMode}
                    onChangeText={(text) => setUserData({...userData, telefono: text})}
                    isDarkMode={isDarkColorScheme}
                  />
                  <ProfileField 
                    label="Dirección" 
                    value={userData.direccion} 
                    icon="map-marker"
                    editMode={editMode}
                    onChangeText={(text) => setUserData({...userData, direccion: text})}
                    isDarkMode={isDarkColorScheme}
                  />
                </View>
              </View>

              <View>
                <Text className={`text-lg font-bold mb-4 ${textColor}`}>Información personal</Text>
                <View className={`${sectionBgColor} rounded-xl p-4 space-y-4`}>
                  <ProfileField 
                    label="Nombre completo" 
                    value={userData.nombre} 
                    icon="user"
                    editMode={editMode}
                    onChangeText={(text) => setUserData({...userData, nombre: text})}
                    isDarkMode={isDarkColorScheme}
                  />
                  <ProfileField 
                    label="Fecha de nacimiento" 
                    value={userData.fechaNacimiento} 
                    icon="calendar"
                    editMode={editMode}
                    onChangeText={(text) => setUserData({...userData, fechaNacimiento: text})}
                    isDarkMode={isDarkColorScheme}
                  />
                  <ProfileField 
                    label="Género" 
                    value={userData.genero} 
                    icon="venus-mars"
                    editMode={editMode}
                    onChangeText={(text) => setUserData({...userData, genero: text})}
                    isDarkMode={isDarkColorScheme}
                  />
                  <ProfileField 
                    label="Ocupación" 
                    value={userData.ocupacion} 
                    icon="briefcase"
                    editMode={editMode}
                    onChangeText={(text) => setUserData({...userData, ocupacion: text})}
                    isDarkMode={isDarkColorScheme}
                  />
                </View>
              </View>

              <View className="space-y-3">
                <TouchableOpacity className={`flex-row items-center ${itemBgColor} p-4 rounded-xl`}>
                  <FontAwesome name="shield" size={20} color={isDarkColorScheme ? "#9ca3af" : "#6b7280"} />
                  <Text className={`ml-3 ${textColor} font-medium flex-1`}>Seguridad y privacidad</Text>
                  <FontAwesome name="chevron-right" size={16} color={isDarkColorScheme ? "#6b7280" : "#9ca3af"} />
                </TouchableOpacity>

                <TouchableOpacity className={`flex-row items-center ${itemBgColor} p-4 rounded-xl`}>
                  <FontAwesome name="bell" size={20} color={isDarkColorScheme ? "#9ca3af" : "#6b7280"} />
                  <Text className={`ml-3 ${textColor} font-medium flex-1`}>Notificaciones</Text>
                  <FontAwesome name="chevron-right" size={16} color={isDarkColorScheme ? "#6b7280" : "#9ca3af"} />
                </TouchableOpacity>
              </View>

              {editMode && (
                <TouchableOpacity 
                  onPress={handleSave}
                  className="bg-blue-500 p-4 rounded-xl items-center mt-4"
                >
                  <Text className="text-white font-bold text-lg">Guardar cambios</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity className="p-4 rounded-xl items-center mt-4">
                <Text className="text-red-500 font-medium">Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// Componente reutilizable para campos de perfil
const ProfileField = ({ label, value, icon, editMode, onChangeText, isDarkMode }) => {
  const labelColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-800';
  const inputBgColor = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  
  return (
    <View>
      <Text className={`${labelColor} text-sm mb-1`}>{label}</Text>
      <View className="flex-row items-center">
        <FontAwesome name={icon} size={18} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
        {editMode ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            className={`ml-3 flex-1 ${textColor} p-2 border-b ${borderColor} ${inputBgColor}`}
            placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
          />
        ) : (
          <Text className={`ml-3 ${textColor}`}>{value}</Text>
        )}
      </View>
    </View>
  );
};