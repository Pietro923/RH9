import { Icon } from '@roninoss/icons';
import { Pressable, View, Text } from 'react-native';
import Animated, { LayoutAnimationConfig, ZoomInRotate } from 'react-native-reanimated';
import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';
import { COLORS } from '~/theme/colors';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  
  return (
    <LayoutAnimationConfig skipEntering>
      <Animated.View
        className="items-center justify-center"
        key={`toggle-${colorScheme}`}
        entering={ZoomInRotate}>
        <Pressable 
          onPress={toggleColorScheme} 
          className="opacity-80 flex-row items-center"
          accessibilityLabel={`Cambiar a modo ${colorScheme === 'dark' ? 'claro' : 'oscuro'}`}
          accessibilityRole="button"
        >
          {colorScheme === 'dark'
            ? ({ pressed }) => (
                <View className={cn('flex-row items-center px-0.5', pressed && 'opacity-50')}>
                  <Icon namingScheme="sfSymbol" name="moon.stars" color={COLORS.white} />
                  <Text className="text-white ml-2">Modo claro</Text>
                </View>
              )
            : ({ pressed }) => (
                <View className={cn('flex-row items-center px-0.5', pressed && 'opacity-50')}>
                  <Icon namingScheme="sfSymbol" name="sun.min" color={COLORS.black} />
                  <Text className="text-black ml-2">Modo oscuro</Text>
                </View>
              )}
        </Pressable>
      </Animated.View>
    </LayoutAnimationConfig>
  );
}