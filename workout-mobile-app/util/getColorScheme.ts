import { Appearance } from 'react-native';

export function getColorScheme(): 'light' | 'dark' {
  return Appearance.getColorScheme() ?? 'light';
}