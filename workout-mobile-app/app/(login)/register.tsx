import { Link, Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Image, TextInput, View } from 'react-native';
import ThemedButton from '@/components/ThemedButton';
import { Container } from '@/components/Container';
import { useState } from 'react';
import { loginScreenStyle as styles } from './login';
import registerBackground from '@/assets/images/register-background.webp';
import { LinearGradient } from 'expo-linear-gradient';
import { getThemeColors } from '@/style/Colors';
import getApi from '@/hooks/api/axios';
import { AxiosError } from 'axios';

export default function Register() {
  const colors = getThemeColors();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function onButtonPress() {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    getApi()
      .post('auth/register', { username, password })
      .then(() => {
        // @ts-ignore
        router.replace('/');
      })
      .catch((err: AxiosError) => {
        if (err.status == 409) {
          setError('Username already exists');
          return;
        }

        setError(`Unknown error occurred: ${err.message}`);
      });
  }

  return (
    <Container>
      <View style={[styles.imageContainer]}>
        <Image source={registerBackground} style={[styles.image]} />
        <LinearGradient
          colors={[`${colors.background}00`, colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.imageOverlay} />
      </View>
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <ThemedText type={'title'} style={styles.title}>
        Register
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
      <TextInput textContentType={'password'}
                 autoCapitalize={'none'}
                 secureTextEntry={true}
                 style={styles.input}
                 onChangeText={e => setConfirmPassword(e)}
                 value={confirmPassword}
                 placeholder={'password confirmation'} />
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
      <ThemedButton onPress={onButtonPress}>
        Register
      </ThemedButton>
      <ThemedText style={styles.bottomText}>
        Already have an account? <Link style={styles.link} href={'/(login)/login'} dismissTo={true}>Log in</Link>
      </ThemedText>
    </Container>
  );
}