import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type TabName = 'inicio' | 'buscar' | 'rankings' | 'resenas' | 'perfil';

// Definición de cada pestaña: nombre, etiqueta e icono.
const TABS: { name: TabName; label: string; icon: keyof typeof Ionicons.glyphMap; iconActive: keyof typeof Ionicons.glyphMap }[] = [
  { name: 'inicio', label: 'Inicio', icon: 'home-outline', iconActive: 'home' },
  { name: 'buscar', label: 'Buscar', icon: 'search-outline', iconActive: 'search' },
  { name: 'rankings', label: 'Rankings', icon: 'stats-chart-outline', iconActive: 'stats-chart' },
  { name: 'resenas', label: 'Reseñas', icon: 'reader-outline', iconActive: 'reader' },
  { name: 'perfil', label: 'Perfil', icon: 'person-outline', iconActive: 'person' },
];

type Props = {
  active: TabName;
  onChange: (tab: TabName) => void;
};

// Barra de pestañas inferior. Pinta la activa en azul con fondo destacado.
export function TabBar({ active, onChange }: Props) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = tab.name === active;
        return (
          <Pressable key={tab.name} style={styles.item} onPress={() => onChange(tab.name)}>
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <Ionicons
                name={isActive ? tab.iconActive : tab.icon}
                size={20}
                color={isActive ? '#fff' : '#9CA3AF'}
              />
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15,23,42,0.96)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  iconWrap: {
    width: 52,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: '#0EA5E9',
  },
  label: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  labelActive: {
    color: '#22D3EE',
    fontWeight: '700',
  },
});
