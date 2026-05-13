import { Stack } from 'expo-router';
import { View, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { darkColors, lightColors } from '../src/theme';

export default function RootLayout() {
  const colors = useColorScheme() === 'dark' ? darkColors : lightColors;
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textPrimary, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="detail" options={{ title: 'COMPATIBILITY' }} />
        <Stack.Screen name="add" options={{ title: 'NEW ENTRY', presentation: 'modal' }} />
      </Stack>
    </SafeAreaProvider>
  );
}

