import { Slot, useFocusEffect, useRouter } from 'expo-router';
import { useUser } from '@/state/userSlice';

export default function AppLayout() {
  const user = useUser();
  const router = useRouter();

  useFocusEffect(() => {
    if (!user.id) {
      router.replace('/(login)/login');
    }
  });

  if (!user.id) {
    return null;
  }

  return (
    <Slot />
  );
}