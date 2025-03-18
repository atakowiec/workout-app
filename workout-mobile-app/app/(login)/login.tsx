import { Link, Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Image, TextInput, View } from 'react-native';
import ThemedButton from '@/components/ThemedButton';
import createStyleSheet from '@/style/Style';
import { Container } from '@/components/Container';
import { useState } from 'react';
import getApi from '@/hooks/api/axios';
import loginBackground from '@/assets/images/login-background.webp';
import { LinearGradient } from 'expo-linear-gradient';
import { getThemeColors } from '@/style/Colors';
import { AxiosError } from 'axios';

export default function Login() {
  const colors = getThemeColors();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function onButtonPress() {
    if (!username || !password) {
      setError('All fields are required');
      return;
    }

    getApi()
      .post('auth/login', { username, password })
      .then(() => {
        // @ts-ignore
        router.replace('/');
      })
      .catch((err: AxiosError) => {
        if (err.status == 401) {
          setError('Invalid username or password');
          return;
        }

        setError(`Unknown error occurred: ${err.message}`);
      });
  }

  return (
    <>
      <Container>
        <View style={styles.imageContainer}>
          <Image source={loginBackground} style={styles.image} />
          <LinearGradient
            colors={[`${colors.background}00`, colors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.imageOverlay} />
        </View>
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <ThemedText type={'title'} style={styles.title}>
          Login
        </ThemedText>
        <TextInput textContentType={'username'}
                   autoCapitalize={'none'}
                   style={styles.input}
                   onChangeText={e => setUsername(e)}
                   value={username}
                   placeholder={'username'} />
        <TextInput textContentType={'password'}
                   autoCapitalize={'none'}
                   secureTextEntry={true}
                   style={styles.input}
                   onChangeText={e => setPassword(e)}
                   value={password}
                   placeholder={'password'} />
        {error && <ThemedText style={styles.error}>{error}</ThemedText>}
        <ThemedButton onPress={onButtonPress}>
          Login
        </ThemedButton>
        <ThemedText style={styles.bottomText}>
          Don't have an account? <Link style={styles.link} href={'/(login)/register'} dismissTo={true}>Sign up</Link>
        </ThemedText>
      </Container>
    </>
  );
}

export const loginScreenStyle = createStyleSheet(() => ({
  bottomText: {
    marginTop: 20,
    fontSize: 15,
    opacity: 0.8,
  },
  error: {
    color: 'red',
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    background: `linear-gradient(0deg, #ffffff 0%, #ffffff00 100%)`,
  },
}));

const styles = loginScreenStyle;