/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { getColorScheme } from '@/util/getColorScheme';

export type ThemeColors = {
  text: string;
  background: string;
  accent: string;
  inputBackground: string;
  inputText: string;
}

export function getThemeColors() {
  const theme = getColorScheme();
  return Colors[theme];
}

type ColorsObj = {
  light: ThemeColors;
  dark: ThemeColors;
}

export const Colors: ColorsObj = {
  light: {
    text: '#212121',
    background: '#fff',
    accent: '#06a53b',
    inputBackground: '#f5f5f5',
    inputText: '#212121',
  },
  dark: {
    text: '#ECEDEE',
    background: '#0c1a25',
    accent: '#06a53b',
    inputBackground: '#f5f5f5',
    inputText: '#0c1a25',
  },
};
