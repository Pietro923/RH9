import { useState, useEffect } from 'react';
import '../global.css';
import 'expo-dev-client';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export {
  ErrorBoundary,
} from 'expo-router';

// Clave para el almacenamiento del estado de autenticación
const AUTH_STORAGE_KEY = 'app_auth_status';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme, isLoaded } = useColorScheme();
  
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  // Cargar el estado de autenticación
  useEffect(() => {
    async function loadAuthStatus() {
      try {
        const savedAuthStatus = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        setIsAuthenticated(savedAuthStatus === 'true');
      } catch (error) {
        console.error('Error loading auth status:', error);
      } finally {
        setIsAuthLoaded(true);
      }
    }

    loadAuthStatus();
  }, []);

  // Guardar el estado de autenticación cuando cambie
  useEffect(() => {
    if (isAuthLoaded) {
      AsyncStorage.setItem(AUTH_STORAGE_KEY, isAuthenticated ? 'true' : 'false')
        .catch(error => console.error('Error saving auth status:', error));
    }
  }, [isAuthenticated, isAuthLoaded]);

  // Redirigir basado en el estado de autenticación
  useEffect(() => {
    if (isAuthLoaded && !isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, isAuthLoaded]);

  // Función para cambiar el estado de autenticación (puedes exponerla a través de un contexto)
  const setAuth = (status: boolean) => {
    setIsAuthenticated(status);
  };

  // Esperar a que se carguen ambos estados antes de renderizar
  if (!isLoaded || !isAuthLoaded) {
    return null; // O un indicador de carga
  }

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ActionSheetProvider>
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              </Stack>
            </NavThemeProvider>
          </ActionSheetProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}

// Puedes crear un contexto de autenticación para exponer estas funciones a toda la aplicación
// Ejemplo: export const AuthContext = createContext({ isAuthenticated, setAuth });