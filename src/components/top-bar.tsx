import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

// Barra superior: buscador + avatar, y debajo el logo con el icono de filtros.
export function TopBar() {
  return (
    <View style={styles.wrap}>
      {/* Fila del buscador */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <Text style={styles.searchPlaceholder}>Buscar anime...</Text>
        </View>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color="#22D3EE" />
        </View>
      </View>

      {/* Fila del logo */}
      <View style={styles.brandRow}>
        <View style={styles.logoMark}>
          <View style={[styles.bar, { backgroundColor: '#22D3EE', height: 16 }]} />
          <View style={[styles.bar, { backgroundColor: '#38BDF8', height: 22 }]} />
          <View style={[styles.bar, { backgroundColor: '#0284C7', height: 12 }]} />
        </View>
        <Text style={styles.brand}>
          Anime<Text style={styles.brandAccent}>Ranking</Text>
        </Text>
        <View style={styles.spacer} />
        <Ionicons name="options-outline" size={22} color="#22D3EE" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 14,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 16,
    height: 44,
  },
  searchPlaceholder: {
    color: '#9CA3AF',
    fontSize: 15,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(34,211,238,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  logoMark: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 22,
  },
  bar: {
    width: 5,
    borderRadius: 3,
  },
  brand: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  brandAccent: {
    color: '#22D3EE',
  },
  spacer: {
    flex: 1,
  },
});
