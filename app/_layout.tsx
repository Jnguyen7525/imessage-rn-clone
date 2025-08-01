// import { colors } from '@/theme/colors';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from 'theme/color';

export default function Layout() {
  return (
    <>
      <StatusBar backgroundColor={colors.zinc['100']} style="dark" />
      <Stack />
    </>
  );
}
