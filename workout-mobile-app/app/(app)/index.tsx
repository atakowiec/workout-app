import { View } from 'react-native';
import { router, Stack } from 'expo-router';
import ThemedButton from '@/components/ThemedButton';
import getApi from '@/hooks/api/axios';

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ThemedButton onPress={() => getApi().post('auth/logout').then(() => router.replace('/(login)/login'))}>
          Logout
        </ThemedButton>
      </View>
    </>
  );
}
