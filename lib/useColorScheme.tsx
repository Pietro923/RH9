import * as NavigationBar from 'expo-navigation-bar';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import * as React from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '~/theme/colors';

const COLOR_SCHEME_STORAGE_KEY = 'app_color_scheme';

function useColorScheme() {
  const { colorScheme, setColorScheme: setNativeWindColorScheme, toggleColorScheme: toggleNativeWindColorScheme } = useNativewindColorScheme();
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Cargar el tema guardado
  React.useEffect(() => {
    async function loadSavedColorScheme() {
      try {
        const savedColorScheme = await AsyncStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
        if (savedColorScheme === 'light' || savedColorScheme === 'dark') {
          setNativeWindColorScheme(savedColorScheme);
        }
      } catch (error) {
        console.error('Error loading saved color scheme:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadSavedColorScheme();
  }, []);

  async function setColorScheme(newColorScheme: 'light' | 'dark') {
    try {
      setNativeWindColorScheme(newColorScheme);
      
      // Guardar la preferencia del usuario
      await AsyncStorage.setItem(COLOR_SCHEME_STORAGE_KEY, newColorScheme);
      
      if (Platform.OS !== 'android') return;
      await setNavigationBar(newColorScheme);
    } catch (error) {
      console.error('Error in setColorScheme:', error);
    }
  }

  function toggleColorScheme() {
    const newScheme = colorScheme === 'light' ? 'dark' : 'light';
    return setColorScheme(newScheme);
  }

  return {
    colorScheme: colorScheme ?? 'light',
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
    colors: COLORS[colorScheme ?? 'light'],
    isLoaded,
  };
}

/**
 * Set the Android navigation bar color based on the color scheme.
 */
function useInitialAndroidBarSync() {
  const { colorScheme, isLoaded } = useColorScheme();
  
  React.useEffect(() => {
    if (Platform.OS !== 'android' || !isLoaded) return;
    
    setNavigationBar(colorScheme).catch((error) => {
      console.error('useColorScheme.tsx", "useInitialColorScheme', error);
    });
  }, [colorScheme, isLoaded]);
}

function setNavigationBar(colorScheme: 'light' | 'dark') {
  return Promise.all([
    NavigationBar.setButtonStyleAsync(colorScheme === 'dark' ? 'light' : 'dark'),
    NavigationBar.setPositionAsync('absolute'),
    NavigationBar.setBackgroundColorAsync(colorScheme === 'dark' ? '#00000030' : '#ffffff80'),
  ]);
}

export { useColorScheme, useInitialAndroidBarSync };