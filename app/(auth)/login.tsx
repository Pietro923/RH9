import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '~/lib/useColorScheme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu email y contraseña');
      return;
    }

    setLoading(true);
    
    // Simula autenticación - reemplaza esto con tu lógica real
    setTimeout(() => {
      setLoading(false);
      router.replace('/(drawer)');
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
            {/* Logo */}
            <View className="items-center my-8">
              {/* Aquí puedes colocar tu logo */}
              <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center">
                <Text className="text-white text-3xl font-bold">Logo</Text>
              </View>
              <Text className={`text-2xl font-bold mt-4 ${textColor}`}>Bienvenido</Text>
              <Text className={`${textMutedColor} mt-2 text-center`}>Inicia sesión para continuar</Text>
            </View>

            {/* Formulario */}
            <View className="mt-6 space-y-4">
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
                  placeholder="Tu contraseña"
                  placeholderTextColor={isDarkColorScheme ? '#6b7280' : '#9ca3af'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity>
                <Text className="text-blue-500 text-right font-medium">¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
            </View>

            {/* Botón */}
            <TouchableOpacity 
              className={`mt-8 p-4 rounded-lg items-center ${loading ? primaryDisabledBgColor : primaryBgColor}`}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text className="text-white font-bold text-lg">
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Text>
            </TouchableOpacity>

            {/* Registro */}
            <View className="mt-6 flex-row justify-center">
              <Text className={`${textMutedColor}`}>¿No tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text className="text-blue-500 font-medium">Regístrate</Text>
              </TouchableOpacity>
            </View>

            {/* Otros métodos de inicio de sesión */}
            <View className="mt-10">
              <View className="flex-row items-center">
                <View className={`flex-1 h-px ${dividerColor}`} />
                <Text className={`px-4 ${textMutedColor}`}>O continúa con</Text>
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