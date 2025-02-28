import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Link, useSegments } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { HeaderButton } from '../../components/HeaderButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
// Color principal de la app
const THEME_COLOR = '#0056b3';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const currentRoute = segments.join('/');

  return (
    <DrawerContentScrollView 
      {...props}
      contentContainerStyle={{ 
        paddingTop: 0,
      }}
    >
      {/* Header del Drawer con info del usuario */}
      <View className={`px-4 py-5`} style={{ paddingTop: insets.top + 20 }}>
      <Image 
  source={{ uri: 'https://placehold.co/150x150' }} 
  className="w-16 h-16 rounded-full border-2 border-white mb-2" 
  resizeMode="cover"
/>
        <View className="mt-2">
          <Text className="text-black text-lg font-bold">María González</Text>
          <Text className="text-black text-sm opacity-80">Analista de Recursos Humanos</Text>
        </View>
      </View>
      
      {/* Separador */}
      <View className="h-px bg-gray-200 my-2" />

      {/* Sección Principal */}
      <View className="mb-2">
        <Text className="text-xs text-gray-500 font-medium uppercase ml-4 mt-2 mb-1">Principal</Text>
        <DrawerItem
          label="Inicio"
          labelStyle={{ 
            fontSize: 15, 
            fontWeight: '500', 
            color: currentRoute === '/(drawer)' ? THEME_COLOR : '#424242'
          }}
          icon={({ size, color }) => (
            <Ionicons 
              name="home-outline" 
              size={size} 
              color={currentRoute === '/(drawer)' ? THEME_COLOR : color} 
            />
          )}
          onPress={() => props.navigation.navigate('index')}
          style={currentRoute === '/(drawer)' ? { backgroundColor: `rgba(0, 86, 179, 0.1)` } : null}
        />
        <DrawerItem
          label="Mi Perfil"
          labelStyle={{ 
            fontSize: 15, 
            fontWeight: '500', 
            color: currentRoute.includes('perfil') ? THEME_COLOR : '#424242'
          }}
          icon={({ size, color }) => (
            <Ionicons 
              name="person-outline" 
              size={size} 
              color={currentRoute.includes('perfil') ? THEME_COLOR : color} 
            />
          )}
          onPress={() => props.navigation.navigate('(perfil)')}
          style={currentRoute.includes('perfil') ? { backgroundColor: `rgba(0, 86, 179, 0.1)` } : null}
        />
      </View>

      {/* Sección Gestión */}
      <View className="mb-2">
        <Text className="text-xs text-gray-500 font-medium uppercase ml-4 mt-2 mb-1">Gestión</Text>
        <DrawerItem
          label="Asistencia"
          labelStyle={{ 
            fontSize: 15, 
            fontWeight: '500', 
            color: currentRoute.includes('asistencia') ? THEME_COLOR : '#424242'
          }}
          icon={({ size, color }) => (
            <Ionicons 
              name="time-outline" 
              size={size} 
              color={currentRoute.includes('asistencia') ? THEME_COLOR : color} 
            />
          )}
          onPress={() => props.navigation.navigate('asistencia')}
          style={currentRoute.includes('asistencia') ? { backgroundColor: `rgba(0, 86, 179, 0.1)` } : null}
        />
        <DrawerItem
          label="Nómina"
          labelStyle={{ 
            fontSize: 15, 
            fontWeight: '500', 
            color: currentRoute.includes('nomina') ? THEME_COLOR : '#424242'
          }}
          icon={({ size, color }) => (
            <FontAwesome5 
              name="money-check-alt" 
              size={size} 
              color={currentRoute.includes('nomina') ? THEME_COLOR : color} 
            />
          )}
          onPress={() => props.navigation.navigate('nomina')}
          style={currentRoute.includes('nomina') ? { backgroundColor: `rgba(0, 86, 179, 0.1)` } : null}
        />
        <DrawerItem
          label="Vacaciones y Ausencias"
          labelStyle={{ 
            fontSize: 15, 
            fontWeight: '500', 
            color: currentRoute.includes('vacaciones') ? THEME_COLOR : '#424242'
          }}
          icon={({ size, color }) => (
            <Ionicons 
              name="umbrella-outline" 
              size={size} 
              color={currentRoute.includes('vacaciones') ? THEME_COLOR : color} 
            />
          )}
          onPress={() => props.navigation.navigate('vacaciones')}
          style={currentRoute.includes('vacaciones') ? { backgroundColor: `rgba(0, 86, 179, 0.1)` } : null}
        />
        <DrawerItem
          label="Desempeño"
          labelStyle={{ 
            fontSize: 15, 
            fontWeight: '500', 
            color: currentRoute.includes('desempeno') ? THEME_COLOR : '#424242'
          }}
          icon={({ size, color }) => (
            <Ionicons 
              name="trending-up-outline" 
              size={size} 
              color={currentRoute.includes('desempeno') ? THEME_COLOR : color} 
            />
          )}
          onPress={() => props.navigation.navigate('desempeño')}
          style={currentRoute.includes('desempeno') ? { backgroundColor: `rgba(0, 86, 179, 0.1)` } : null}
        />
      </View>

      {/* Sección Recursos */}
      <View className="mb-2">
        <Text className="text-xs text-gray-500 font-medium uppercase ml-4 mt-2 mb-1">Recursos</Text>
        <DrawerItem
          label="Beneficios"
          labelStyle={{ 
            fontSize: 15, 
            fontWeight: '500', 
            color: currentRoute.includes('beneficios') ? THEME_COLOR : '#424242'
          }}
          icon={({ size, color }) => (
            <Ionicons 
              name="gift-outline" 
              size={size} 
              color={currentRoute.includes('beneficios') ? THEME_COLOR : color} 
            />
          )}
          onPress={() => props.navigation.navigate('beneficios')}
          style={currentRoute.includes('beneficios') ? { backgroundColor: `rgba(0, 86, 179, 0.1)` } : null}
        />
        <DrawerItem
          label="Formación"
          labelStyle={{ 
            fontSize: 15, 
            fontWeight: '500', 
            color: currentRoute.includes('formacion') ? THEME_COLOR : '#424242'
          }}
          icon={({ size, color }) => (
            <Ionicons 
              name="school-outline" 
              size={size} 
              color={currentRoute.includes('formacion') ? THEME_COLOR : color} 
            />
          )}
          onPress={() => props.navigation.navigate('formacion')}
          style={currentRoute.includes('formacion') ? { backgroundColor: `rgba(0, 86, 179, 0.1)` } : null}
        />
        <DrawerItem
          label="Noticias"
          labelStyle={{ 
            fontSize: 15, 
            fontWeight: '500', 
            color: currentRoute.includes('noticias') ? THEME_COLOR : '#424242'
          }}
          icon={({ size, color }) => (
            <Ionicons 
              name="newspaper-outline" 
              size={size} 
              color={currentRoute.includes('noticias') ? THEME_COLOR : color} 
            />
          )}
          onPress={() => props.navigation.navigate('noticias')}
          style={currentRoute.includes('noticias') ? { backgroundColor: `rgba(0, 86, 179, 0.1)` } : null}
        />
      </View>

      {/* Sección Ayuda */}
      <View className="mb-2">
        <Text className="text-xs text-gray-500 font-medium uppercase ml-4 mt-2 mb-1">Ayuda</Text>
        <DrawerItem
          label="Soporte"
          labelStyle={{ 
            fontSize: 15, 
            fontWeight: '500', 
            color: currentRoute.includes('soporte') ? THEME_COLOR : '#424242'
          }}
          icon={({ size, color }) => (
            <Ionicons 
              name="help-buoy-outline" 
              size={size} 
              color={currentRoute.includes('soporte') ? THEME_COLOR : color} 
            />
          )}
          onPress={() => props.navigation.navigate('soporte')}
          style={currentRoute.includes('soporte') ? { backgroundColor: `rgba(0, 86, 179, 0.1)` } : null}
        />
      </View>
      
      {/* Separador */}
      <View className="h-px bg-gray-200 my-2" />
      
      {/* Cerrar Sesión */}
      <DrawerItem
        label="Cerrar Sesión"
        labelStyle={{ 
          fontSize: 15, 
          fontWeight: 'bold', 
          color: '#d32f2f'
        }}
        icon={({ size }) => <Ionicons name="log-out-outline" size={size} color="#d32f2f" />}
        onPress={() => props.navigation.navigate('salir')}
      />
      
      {/* Versión de la app */}
      <Text className="text-xs text-gray-400 text-center mt-4 mb-2">Versión 1.0.0</Text>
    </DrawerContentScrollView>
  );
};

const DrawerLayout = () => (
  <Drawer
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerStyle: {
        backgroundColor: THEME_COLOR,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      drawerActiveBackgroundColor: 'rgba(0, 86, 179, 0.1)',
      drawerActiveTintColor: THEME_COLOR,
      drawerInactiveTintColor: '#333',
      drawerStyle: {
        width: 280,
      },
    }}
  >
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'Inicio',
        drawerLabel: 'Inicio',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="(perfil)"
      options={{
        headerTitle: 'Mi Perfil',
        drawerLabel: 'Mi Perfil',
        drawerIcon: ({ size, color }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="asistencia"
      options={{
        headerTitle: 'Asistencia',
        drawerLabel: 'Asistencia',
        drawerIcon: ({ size, color }) => <Ionicons name="time-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="nomina"
      options={{
        headerTitle: 'Nómina',
        drawerLabel: 'Nómina',
        drawerIcon: ({ size, color }) => <FontAwesome5 name="money-check-alt" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="vacaciones"
      options={{
        headerTitle: 'Vacaciones y Ausencias',
        drawerLabel: 'Vacaciones y Ausencias',
        drawerIcon: ({ size, color }) => <Ionicons name="umbrella-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="desempeño"
      options={{
        headerTitle: 'Desempeño',
        drawerLabel: 'Desempeño',
        drawerIcon: ({ size, color }) => <Ionicons name="trending-up-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="beneficios"
      options={{
        headerTitle: 'Beneficios',
        drawerLabel: 'Beneficios',
        drawerIcon: ({ size, color }) => <Ionicons name="gift-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="formacion"
      options={{
        headerTitle: 'Formación',
        drawerLabel: 'Formación',
        drawerIcon: ({ size, color }) => <Ionicons name="school-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="noticias"
      options={{
        headerTitle: 'Noticias',
        drawerLabel: 'Noticias',
        drawerIcon: ({ size, color }) => <Ionicons name="newspaper-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="soporte"
      options={{
        headerTitle: 'Soporte',
        drawerLabel: 'Soporte',
        drawerIcon: ({ size, color }) => <Ionicons name="help-buoy-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="salir"
      options={{
        headerTitle: 'Cerrar Sesión',
        drawerLabel: 'Cerrar Sesión',
        drawerLabelStyle: { color: '#d32f2f', fontWeight: 'bold' },
        drawerIcon: ({ size }) => <Ionicons name="log-out-outline" size={size} color="#d32f2f" />,
      }}
    />
  </Drawer>
);

export default DrawerLayout;