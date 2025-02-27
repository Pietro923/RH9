import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { HeaderButton } from '../../components/HeaderButton';

const DrawerLayout = () => (
  <Drawer>
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
        drawerIcon: ({ size, color }) => <Ionicons name="log-out-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="(tabs)"
      options={{
        headerTitle: 'Tabs',
        drawerLabel: 'Tabs',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="tab" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    />
  </Drawer>
);

export default DrawerLayout;