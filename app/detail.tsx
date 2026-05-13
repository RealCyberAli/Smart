import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getPhoneById, Phone } from '../src/db';
import { useTheme } from '../src/theme';

export default function Detail() {
  const { id } = useLocalSearchParams();
  const { colors, mono } = useTheme();
  const [phone, setPhone] = useState<Phone | null>(null);

  useEffect(() => { getPhoneById(Number(id)).then(setPhone); }, [id]);

  if (!phone) return null;

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Text style={{ color: colors.textSecondary, fontFamily: mono }}>{phone.brand.toUpperCase()}</Text>
      <Text style={{ color: colors.textPrimary, fontSize: 32, fontWeight: '900' }}>{phone.model}</Text>
      <View style={{ marginTop: 20, padding: 20, backgroundColor: colors.surface, borderLeftWidth: 5, borderLeftColor: colors.accent }}>
        <Text style={{ color: colors.textPrimary }}>SIZE: {phone.screen_size}"</Text>
        <Text style={{ color: colors.textPrimary }}>NOTCH: {phone.notch_type}</Text>
        <Text style={{ color: colors.accent, fontWeight: 'bold', marginTop: 10 }}>PID: {phone.pid || 'NONE'}</Text>
      </View>
    </View>
  );
}

