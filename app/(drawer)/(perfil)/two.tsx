import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Personalización' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(perfil)/index.tsx" title="Personalización" />
      </Container>
    </>
  );
}
