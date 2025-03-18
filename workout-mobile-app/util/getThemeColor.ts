import { getThemeColors, ThemeColors } from '@/style/Colors';

export function getThemeColor(
  colorName: keyof ThemeColors,
) {
  const colors = getThemeColors();
  return colors[colorName];
}
