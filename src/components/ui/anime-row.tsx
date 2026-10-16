import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import type { Anime } from '@/hooks/use-top-anime';

// Fila de la lista "Nuevos Rankings": miniatura + datos + badge.
export function AnimeRow({ anime }: { anime: Anime }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: anime.image }} style={styles.thumb} contentFit="cover" transition={200} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {anime.title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {anime.episodes ? `${anime.episodes} Episodios` : 'En emisión'}
        </Text>
        <Text style={styles.studio} numberOfLines={1}>
          {anime.studio}
        </Text>
      </View>

      {/* Badge azul "1-10 ★" */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>1-10</Text>
        <Ionicons name="star" size={10} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  thumb: {
    width: 58,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#111827',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  meta: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  studio: {
    color: '#6B7280',
    fontSize: 11,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#0EA5E9',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
