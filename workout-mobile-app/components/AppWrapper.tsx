import { ReactNode, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { getColorScheme } from '@/util/getColorScheme';
import { ReloadApiProvider } from '@/hooks/api/ReloadApiContext';
import { View } from 'react-native';
import getApi from '@/hooks/api/axios';
import { AuthResponse } from '@shared/auth';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { userActions } from '@/state/userSlice';
import { useFocusEffect } from 'expo-router';

type AppWrapperProps = {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const colorScheme = getColorScheme();
  const dispatch = useDispatch();
  const [authLoaded, setAuthLoaded] = useState(false);

  useFocusEffect(() => {
    getApi()
      .post('auth/verify')
      .then((res: AxiosResponse<AuthResponse>) => {
        if (!(res.data.id)) {
          return;
        }

        dispatch(userActions.setUser(res.data));
      })
      .catch(e => alert(JSON.stringify(e.message)))
      .finally(() => {
        setAuthLoaded(true);
      });
  });

  if (!authLoaded)
    return null;

  return (
    <ReloadApiProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#0c1a25' : '#fff' }}>
          {children}
        </View>
      </ThemeProvider>
    </ReloadApiProvider>
  );
}