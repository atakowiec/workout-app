import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Stack } from 'expo-router';

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
        <ThemedText>Edit app/index.tsx to edit this sc1reen.</ThemedText>
      </View>
    </>
  );
}
