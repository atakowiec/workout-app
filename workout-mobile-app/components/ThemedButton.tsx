import { Pressable, Text } from 'react-native';
import { ReactNode } from 'react';
import { generateDefaultStyle } from '@/style/Style';

type Props = {
  children: ReactNode | string;
  onPress?: () => void;
  style?: object;
}

export default function ThemedButton(props: Props) {
  return (
    <Pressable style={[styles.button]} onPress={props.onPress}>
      {typeof props.children === 'string' ? <Text style={styles.buttonText}>{props.children}</Text> : props.children}
    </Pressable>
  );
}

const styles = generateDefaultStyle();