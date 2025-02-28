import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '~/lib/useColorScheme';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { isDarkColorScheme } = useColorScheme();

  // Colores según el tema
  const bgColor = isDarkColorScheme ? 'bg-gray-900' : 'bg-white';
  const textColor = isDarkColorScheme ? 'text-white' : 'text-gray-800';
  const textMutedColor = isDarkColorScheme ? 'text-gray-400' : 'text-gray-500';
  const inputBgColor = isDarkColorScheme ? 'bg-gray-800' : 'bg-gray-100';
  const inputTextColor = isDarkColorScheme ? 'text-gray-200' : 'text-gray-800';
  const primaryBgColor = isDarkColorScheme ? 'bg-blue-600' : 'bg-blue-500';
  const primaryDisabledBgColor = isDarkColorScheme ? 'bg-blue-800' : 'bg-blue-300';
  const borderColor = isDarkColorScheme ? 'border-gray-700' : 'border-gray-300';
  const dividerColor = isDarkColorScheme ? 'bg-gray-700' : 'bg-gray-300';
  const socialBgColor = isDarkColorScheme ? 'bg-gray-800' : 'bg-gray-100';

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    
    // Simula registro - reemplaza esto con tu lógica real
    setTimeout(() => {
      setLoading(false);
      // Puedes ir directamente al drawer o volver a login
      router.replace('/login');
    }, 1500);
  };

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View className="flex-1 p-6">
            {/* Cabecera */}
            <View className="items-center my-6">
              <Text className={`text-2xl font-bold ${textColor}`}>Crea tu cuenta</Text>
              <Text className={`${textMutedColor} mt-2 text-center`}>Completa tus datos para registrarte</Text>
            </View>

            {/* Formulario */}
            <View className="mt-4 space-y-4">
              <View>
                <Text className={`${textColor} mb-2 font-medium`}>Nombre completo</Text>
                <TextInput
                  className={`${inputBgColor} p-4 rounded-lg ${inputTextColor}`}
                  placeholder="Tu nombre"
                  placeholderTextColor={isDarkColorScheme ? '#6b7280' : '#9ca3af'}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View>
                <Text className={`${textColor} mb-2 font-medium`}>Correo electrónico</Text>
                <TextInput
                  className={`${inputBgColor} p-4 rounded-lg ${inputTextColor}`}
                  placeholder="ejemplo@correo.com"
                  placeholderTextColor={isDarkColorScheme ? '#6b7280' : '#9ca3af'}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View>
                <Text className={`${textColor} mb-2 font-medium`}>Contraseña</Text>
                <TextInput
                  className={`${inputBgColor} p-4 rounded-lg ${inputTextColor}`}
                  placeholder="Crea una contraseña"
                  placeholderTextColor={isDarkColorScheme ? '#6b7280' : '#9ca3af'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <View>
                <Text className={`${textColor} mb-2 font-medium`}>Confirmar contraseña</Text>
                <TextInput
                  className={`${inputBgColor} p-4 rounded-lg ${inputTextColor}`}
                  placeholder="Repite tu contraseña"
                  placeholderTextColor={isDarkColorScheme ? '#6b7280' : '#9ca3af'}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>

              <View className="flex-row items-center mt-2">
                <TouchableOpacity className={`w-6 h-6 border ${borderColor} rounded mr-2 items-center justify-center`}>
                  <View className="w-3 h-3 bg-blue-500 rounded-sm" />
                </TouchableOpacity>
                <Text className={`${textMutedColor} flex-1`}>Acepto los términos y condiciones de uso</Text>
              </View>
            </View>

            {/* Botón */}
            <TouchableOpacity 
              className={`mt-8 p-4 rounded-lg items-center ${loading ? primaryDisabledBgColor : primaryBgColor}`}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text className="text-white font-bold text-lg">
                {loading ? 'Registrando...' : 'Registrarme'}
              </Text>
            </TouchableOpacity>

            {/* Login */}
            <View className="mt-6 flex-row justify-center">
              <Text className={`${textMutedColor}`}>¿Ya tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-blue-500 font-medium">Inicia sesión</Text>
              </TouchableOpacity>
            </View>

            {/* Otros métodos de registro */}
            <View className="mt-8">
              <View className="flex-row items-center">
                <View className={`flex-1 h-px ${dividerColor}`} />
                <Text className={`px-4 ${textMutedColor}`}>O regístrate con</Text>
                <View className={`flex-1 h-px ${dividerColor}`} />
              </View>

              <View className="flex-row justify-center mt-6 space-x-4">
                <TouchableOpacity className={`w-14 h-14 ${socialBgColor} rounded-full items-center justify-center`}>
                  <Text className={`text-xl ${textColor}`}>G</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`w-14 h-14 ${socialBgColor} rounded-full items-center justify-center`}>
                  <Text className={`text-xl ${textColor}`}>f</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`w-14 h-14 ${socialBgColor} rounded-full items-center justify-center`}>
                  <Text className={`text-xl ${textColor}`}>a</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}