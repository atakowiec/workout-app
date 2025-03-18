import { View, type ViewProps } from 'react-native';
import { generateDefaultStyle } from '@/style/Style';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function Container({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const defaultStyle = generateDefaultStyle();

  return <View style={[defaultStyle.container, style]} {...otherProps} />;
}
