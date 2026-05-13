import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../src/theme';
import { searchPhones, Phone } from '../src/db';
import { useRouter, useFocusEffect } from 'expo-router';

export default function Index() {
  const { colors, mono } = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Phone[]>([]);
  const router = useRouter();

  const handleSearch = async (text: string) => {
    setQuery(text);
    const data = await searchPhones(text);
    setResults(data);
  };

  useFocusEffect(useCallback(() => { handleSearch(query); }, [query]));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>PROTECTOR_MASTER</Text>
      <TextInput style={[styles.search, { backgroundColor: colors.surface, color: colors.textPrimary, borderColor: colors.border }]} placeholder="SEARCH MODEL..." placeholderTextColor={colors.textSecondary} onChangeText={handleSearch} />
      <FlatList data={results} renderItem={({ item }) => (
        <TouchableOpacity style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push({ pathname: "/detail", params: { id: item.id } })}>
          <Text style={{ color: colors.accent, fontFamily: mono, fontSize: 10 }}>{item.brand.toUpperCase()}</Text>
          <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: 'bold' }}>{item.model}</Text>
        </TouchableOpacity>
      )} />
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.accent }]} onPress={() => router.push('/add')}><Text style={{ color: 'white', fontSize: 30 }}>+</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, paddingTop: 60 }, title: { fontSize: 24, fontWeight: '900', marginBottom: 20 }, search: { height: 50, paddingHorizontal: 15, borderWidth: 1, marginBottom: 20, fontFamily: 'monospace' }, card: { padding: 15, marginBottom: 5, borderBottomWidth: 1 }, fab: { position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' } });

