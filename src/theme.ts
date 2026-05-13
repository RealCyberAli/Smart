import { useColorScheme } from 'react-native';

export const lightColors = { background: '#F1F5F9', surface: '#FFFFFF', textPrimary: '#020617', textSecondary: '#64748B', accent: '#2563EB', border: '#CBD5E1', exactMatchBg: '#DCFCE7', exactMatchText: '#166534', aiMatchBg: '#FEF3C7', aiMatchText: '#92400E' };
export const darkColors = { background: '#020617', surface: '#0F172A', textPrimary: '#F1F5F9', textSecondary: '#94A3B8', accent: '#3B82F6', border: '#1E293B', exactMatchBg: '#064E3B', exactMatchText: '#4ADE80', aiMatchBg: '#451A03', aiMatchText: '#FBBF24' };

export function useTheme() {
  const isDark = useColorScheme() === 'dark';
  return { colors: isDark ? darkColors : lightColors, mono: 'monospace' };
}

