import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useTheme } from '../src/theme';
import { addPhone } from '../src/db';
import { useRouter } from 'expo-router';

export default function Add() {
  const { colors, mono } = useTheme();
  const router = useRouter();
  const [form, setForm] = useState({ brand: '', model: '', size: '', notch: '', pid: '' });

  const save = async () => {
    await addPhone({ brand: form.brand, model: form.model, screen_size: parseFloat(form.size), notch_type: form.notch, pid: form.pid });
    Alert.alert("SUCCESS", "DATA SAVED");
    router.back();
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ color: colors.textPrimary, fontSize: 24, fontWeight: '900', marginBottom: 20 }}>NEW ENTRY</Text>
      {['brand', 'model', 'size', 'notch', 'pid'].map(key => (
        <TextInput key={key} placeholder={key.toUpperCase()} placeholderTextColor="#666" style={{ backgroundColor: colors.surface, color: colors.textPrimary, padding: 15, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.border }} onChangeText={t => setForm({ ...form, [key]: t })} />
      ))}
      <TouchableOpacity style={{ backgroundColor: colors.accent, padding: 20, alignItems: 'center', marginTop: 20 }} onPress={save}><Text style={{ color: 'white', fontWeight: 'bold' }}>SAVE TO DATABASE</Text></TouchableOpacity>
    </ScrollView>
  );
}

