import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '~/lib/useColorScheme';

export default function Personalizacion() {
  const [theme, setTheme] = useState('light');
  const { isDarkColorScheme } = useColorScheme();
  const [settings, setSettings] = useState({
    notificaciones: true,
    sonidos: true,
    mostrarEstado: true,
    modoOscuro: isDarkColorScheme, // Inicializar según el tema actual
    idiomaEspanol: true,
    fuente: 'Predeterminado',
    tamanioFuente: 'Mediano'
  });

  // Colores según el tema
  const bgColor = isDarkColorScheme ? 'bg-gray-900' : 'bg-white';
  const sectionBgColor = isDarkColorScheme ? 'bg-gray-800' : 'bg-gray-50';
  const textColor = isDarkColorScheme ? 'text-white' : 'text-gray-800';
  const textMutedColor = isDarkColorScheme ? 'text-gray-400' : 'text-gray-500';
  const buttonBgColor = isDarkColorScheme ? 'bg-gray-700' : 'bg-gray-200';
  const activeBgColor = isDarkColorScheme ? 'bg-blue-900' : 'bg-blue-100';
  const activeBorderColor = isDarkColorScheme ? 'border-blue-700' : 'border-blue-300';
  const activeTextColor = isDarkColorScheme ? 'text-blue-400' : 'text-blue-600';

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const colorThemes = [
    { id: 'blue', color: '#3b82f6', name: 'Azul' },
    { id: 'green', color: '#10b981', name: 'Verde' },
    { id: 'purple', color: '#8b5cf6', name: 'Púrpura' },
    { id: 'red', color: '#ef4444', name: 'Rojo' },
    { id: 'orange', color: '#f97316', name: 'Naranja' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Pequeño' },
    { id: 'medium', name: 'Mediano' },
    { id: 'large', name: 'Grande' }
  ];

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Personalización',
          headerShown: true,
          headerStyle: {
            backgroundColor: isDarkColorScheme ? '#111827' : '#ffffff'
          },
          headerTintColor: isDarkColorScheme ? '#ffffff' : '#000000',
        }} 
      />
      <SafeAreaView edges={['bottom']} className={`flex-1 ${bgColor}`}>
        <ScrollView className="flex-1">
          <View className="px-4 py-6 space-y-6">
            {/* Tema de color */}
            <View>
              <Text className={`text-lg font-bold mb-4 ${textColor}`}>Tema de color</Text>
              <View className="flex-row flex-wrap">
                {colorThemes.map((item) => (
                  <TouchableOpacity 
                    key={item.id}
                    className="mr-4 mb-4 items-center"
                    onPress={() => console.log(`Tema seleccionado: ${item.id}`)}
                  >
                    <View 
                      style={{ backgroundColor: item.color }} 
                      className="w-16 h-16 rounded-full items-center justify-center mb-2"
                    >
                      {theme === item.id && (
                        <FontAwesome name="check" size={24} color="white" />
                      )}
                    </View>
                    <Text className={textColor}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Modo oscuro */}
            <View className={`${sectionBgColor} rounded-xl overflow-hidden`}>
              <SettingToggle 
                icon="moon-o"
                title="Modo oscuro"
                description="Tema con fondos oscuros para uso nocturno"
                isEnabled={settings.modoOscuro}
                onToggle={() => toggleSetting('modoOscuro')}
                isDarkMode={isDarkColorScheme}
              />
            </View>
            
            {/* Accesibilidad */}
            <View>
              <Text className={`text-lg font-bold mb-4 ${textColor}`}>Accesibilidad</Text>
              <View className={`${sectionBgColor} rounded-xl overflow-hidden`}>
                <SettingOption
                  icon="font"
                  title="Tipo de fuente"
                  value={settings.fuente}
                  onPress={() => console.log('Cambiar fuente')}
                  isDarkMode={isDarkColorScheme}
                />
                <View className={`h-px ${isDarkColorScheme ? 'bg-gray-700' : 'bg-gray-200'} mx-4`} />
                <View className="p-4">
                  <Text className={`${isDarkColorScheme ? 'text-gray-300' : 'text-gray-700'} font-medium mb-3`}>Tamaño de fuente</Text>
                  <View className="flex-row justify-between">
                    {fontSizes.map(size => (
                      <TouchableOpacity 
                        key={size.id}
                        className={`py-2 px-4 rounded-lg ${settings.tamanioFuente === size.id 
                          ? `${activeBgColor} border ${activeBorderColor}` 
                          : buttonBgColor}`}
                        onPress={() => setSettings(prev => ({...prev, tamanioFuente: size.id}))}
                      >
                        <Text className={`${settings.tamanioFuente === size.id ? activeTextColor : isDarkColorScheme ? 'text-gray-300' : 'text-gray-700'}`}>
                          {size.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            
            {/* Idioma */}
            <View className={`${sectionBgColor} rounded-xl overflow-hidden`}>
              <SettingToggle 
                icon="language"
                title="Idioma español"
                description="Cambiar a otro idioma"
                isEnabled={settings.idiomaEspanol}
                onToggle={() => toggleSetting('idiomaEspanol')}
                isDarkMode={isDarkColorScheme}
              />
            </View>
            
            {/* Notificaciones */}
            <View>
              <Text className={`text-lg font-bold mb-4 ${textColor}`}>Notificaciones</Text>
              <View className={`${sectionBgColor} rounded-xl overflow-hidden`}>
                <SettingToggle 
                  icon="bell"
                  title="Notificaciones"
                  description="Recibe alertas de la aplicación"
                  isEnabled={settings.notificaciones}
                  onToggle={() => toggleSetting('notificaciones')}
                  isDarkMode={isDarkColorScheme}
                />
                <View className={`h-px ${isDarkColorScheme ? 'bg-gray-700' : 'bg-gray-200'} mx-4`} />
                <SettingToggle 
                  icon="volume-up"
                  title="Sonidos"
                  description="Activar sonidos para notificaciones"
                  isEnabled={settings.sonidos}
                  onToggle={() => toggleSetting('sonidos')}
                  isDarkMode={isDarkColorScheme}
                />
              </View>
            </View>
            
            {/* Privacidad */}
            <View className={`${sectionBgColor} rounded-xl overflow-hidden`}>
              <SettingToggle 
                icon="eye"
                title="Mostrar estado"
                description="Permitir que otros vean cuándo estás en línea"
                isEnabled={settings.mostrarEstado}
                onToggle={() => toggleSetting('mostrarEstado')}
                isDarkMode={isDarkColorScheme}
              />
            </View>
            
            {/* Botón de restablecer */}
            <TouchableOpacity 
              className={`${buttonBgColor} p-4 rounded-xl items-center mt-4`}
              onPress={() => console.log('Restablecer configuración')}
            >
              <Text className={isDarkColorScheme ? 'text-gray-300 font-medium' : 'text-gray-700 font-medium'}>Restablecer configuración</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// Componente para configuraciones con toggle
const SettingToggle = ({ icon, title, description, isEnabled, onToggle, isDarkMode }) => {
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const textMutedColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const iconColor = isDarkMode ? '#a1a1aa' : '#6b7280';

  return (
    <View className="flex-row items-center justify-between p-4">
      <View className="flex-row items-center flex-1">
        <FontAwesome name={icon} size={20} color={iconColor} />
        <View className="ml-3">
          <Text className={textColor + ' font-medium'}>{title}</Text>
          <Text className={textMutedColor + ' text-sm'}>{description}</Text>
        </View>
      </View>
      <Switch
        trackColor={{ false: isDarkMode ? "#4b5563" : "#d1d5db", true: isDarkMode ? "#1e40af" : "#bfdbfe" }}
        thumbColor={isEnabled ? "#3b82f6" : isDarkMode ? "#6b7280" : "#9ca3af"}
        onValueChange={onToggle}
        value={isEnabled}
      />
    </View>
  );
};

// Componente para opciones de configuración
const SettingOption = ({ icon, title, value, onPress, isDarkMode }) => {
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const textMutedColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const iconColor = isDarkMode ? '#a1a1aa' : '#6b7280';
  const chevronColor = isDarkMode ? '#6b7280' : '#9ca3af';

  return (
    <TouchableOpacity className="flex-row items-center justify-between p-4" onPress={onPress}>
      <View className="flex-row items-center">
        <FontAwesome name={icon} size={20} color={iconColor} />
        <Text className={`ml-3 ${textColor} font-medium`}>{title}</Text>
      </View>
      <View className="flex-row items-center">
        <Text className={`${textMutedColor} mr-2`}>{value}</Text>
        <FontAwesome name="chevron-right" size={16} color={chevronColor} />
      </View>
    </TouchableOpacity>
  );
};