import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DB_FILE_NAME, getTotalCount } from '../src/db';
import { mono, useTheme } from '../src/theme';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const [count, setCount] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    getTotalCount().then(setCount).catch(() => setCount(0));
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.section}>
        <Text style={[styles.label, { color: colors.accent }]}>DATABASE_STATS</Text>
        <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>TOTAL_DEVICES_SAVED</Text>
          <Text style={[styles.statVal, { color: colors.textPrimary }]}>{count ?? '0'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: colors.accent }]}>BACKUP_MANAGEMENT</Text>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.accent }]}
          onPress={async () => {
            setExporting(true);
            try {
              const dbPath = `${FileSystem.documentDirectory}SQLite/${DB_FILE_NAME}`;
              await Sharing.shareAsync(dbPath);
            } catch (e) {
              Alert.alert("Error", "Could not export database yet. Add some data first!");
            } finally {
              setExporting(false);
            }
          }}
        >
          <Text style={styles.btnText}>{exporting ? 'PROCESSING...' : 'EXPORT_DATABASE (.DB)'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.version, { color: colors.textSecondary }]}>APP_VERSION: 1.0.0 // OFFLINE_ONLY</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  section: { marginTop: 30 },
  label: { fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold', marginBottom: 10 },
  statBox: { padding: 20, borderLeftWidth: 4, borderLeftColor: '#3B82F6' },
  statLabel: { fontSize: 10, fontFamily: 'monospace' },
  statVal: { fontSize: 32, fontWeight: '900', marginTop: 5 },
  btn: { padding: 20, alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontFamily: 'monospace' },
  version: { marginTop: 50, textAlign: 'center', fontSize: 10, fontFamily: 'monospace', opacity: 0.5 }
});
  
