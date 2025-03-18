import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AppWrapper from '@/components/AppWrapper';
import { store } from '@/state';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Stack>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="(login)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(login)/register" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </AppWrapper>
    </Provider>
  );
}
