import { Appearance } from 'react-native';

export const colorScheme = Appearance.getColorScheme();
const isDarkMode = colorScheme === 'dark';

export const colors = isDarkMode
  ? {
      zinc: {
        '950': '#fafafa',
        '900': '#f4f4f5',
        '800': '#e4e4e7',
        '700': '#d4d4d8',
        '600': '#a1a1aa',
        '500': '#71717a',
        '400': '#52525b',
        '300': '#3f3f46',
        '200': '#27272a',
        '100': '#18181b',
        '50': '#09090b',
      },
      blue: {
        normal: '#007AFF',
      },
    }
  : {
      grey: {
        100: '#ffffff',
        200: '#F9F9F9',
        300: '#767680',
        400: '#3C3C43',
        500: '#000000',
      },
      zinc: {
        '50': '#fafafa',
        '100': '#f4f4f5',
        '200': '#e4e4e7',
        '300': '#d4d4d8',
        '400': '#a1a1aa',
        '500': '#71717a',
        '600': '#52525b',
        '700': '#3f3f46',
        '800': '#27272a',
        '900': '#18181b',
        '950': '#09090b',
      },
      blue: {
        normal: '#007AFF',
      },
    };
