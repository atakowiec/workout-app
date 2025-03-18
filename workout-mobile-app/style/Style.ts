import { getThemeColors, ThemeColors } from '@/style/Colors';
import { StyleSheet } from 'react-native';
import { getColorScheme } from '@/util/getColorScheme';
import _ from 'lodash';
import NamedStyles = StyleSheet.NamedStyles;

export const generateDefaultStyle = () => {
  const colors = getThemeColors();

  return StyleSheet.create({
    input: {
      backgroundColor: colors.inputBackground,
      color: colors.inputText,
      padding: 10,
      borderRadius: 5,
      width: '90%',
      marginBottom: 20,
      fontSize: 16,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    title: {
      marginBottom: 80,
    },
    button: {
      backgroundColor: colors.accent,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: colors.text,
    },
    link: {
      textDecorationLine: 'underline',
    },
  });
};

type GenerateFunctionType<T extends NamedStyles<T> | NamedStyles<any>> = (colors: ThemeColors, colorScheme: 'light' | 'dark') => T & NamedStyles<any>

export default function createStyleSheet<T extends NamedStyles<T> | NamedStyles<any>>(generateFunction: GenerateFunctionType<T>) {
  const styles = generateFunction(getThemeColors(), getColorScheme());
  const defaultStyle = generateDefaultStyle();

  return StyleSheet.create(_.merge(defaultStyle, styles));
}