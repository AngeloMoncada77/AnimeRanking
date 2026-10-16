import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import type { Anime } from '@/hooks/use-top-anime';

type Props = {
  anime: Anime;
  /** Posición en el ranking: 1, 2, 3... */
  rank: number;
};

// Tarjeta grande del carrusel "Top de la Semana".
// Muestra la imagen, el título, la posición y el rating.
export function AnimeCard({ anime, rank }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: anime.image }} style={styles.image} contentFit="cover" transition={200} />

      {/* Oscurece la parte de abajo para que el texto se lea sobre la imagen */}
      <View style={styles.overlay} />

      {/* Posición: 1, 2, 3... */}
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>{rank}</Text>
      </View>

      {/* Título + rating abajo */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {anime.title}
        </Text>
        <View style={styles.scoreRow}>
          <Ionicons name="star" size={13} color="#FBBF24" />
          <Text style={styles.score}>{anime.score.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 210,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.35)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // Oscurece desde el 45% de la altura hacia abajo, para que el texto se lea
    top: '45%',
    backgroundColor: 'rgba(2,6,23,0.75)',
  },
  rankBadge: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    backgroundColor: '#0EA5E9',
    borderRadius: 8,
    minWidth: 26,
    height: 26,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    color: '#04263a',
    fontWeight: '900',
    fontSize: 15,
  },
  info: {
    position: 'absolute',
    left: 40,
    right: 8,
    bottom: 8,
    gap: 3,
  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  score: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '700',
  },
});
