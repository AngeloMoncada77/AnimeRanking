import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TabBar, type TabName } from '@/components/tab-bar';
import { TopBar } from '@/components/top-bar';
import { AnimeCard } from '@/components/ui/anime-card';
import { AnimeRow } from '@/components/ui/anime-row';
import { useTopAnime } from '@/hooks/use-top-anime';

export default function HomeScreen() {
  const { animes, loading, usingFallback } = useTopAnime(12);
  const [tab, setTab] = useState<TabName>('inicio');

  // Cabecera de la lista: buscador + logo + sección Top de la Semana.
  const Header = (
    <View style={styles.header}>
      <TopBar />

      <Text style={styles.sectionTitle}>Top de la Semana</Text>

      <FlatList
        horizontal
        data={animes.slice(0, 8)}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        renderItem={({ item, index }) => <AnimeCard anime={item} rank={index + 1} />}
      />

      {loading ? (
        <Text style={styles.offlineNote}>Actualizando top...</Text>
      ) : (
        usingFallback && (
          <Text style={styles.offlineNote}>
            Sin conexión — mostrando top guardado
          </Text>
        )
      )}

      {/* Título de la sección de la lista */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Nuevos Rankings</Text>
        <Pressable style={styles.genreLink}>
          <Text style={styles.genreLinkText}>Por Géneros</Text>
          <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        {tab === 'inicio' ? (
          <FlatList
            data={animes}
            keyExtractor={(item) => String(item.id)}
            ListHeaderComponent={Header}
            ListEmptyComponent={
              loading ? null : (
                <Text style={styles.empty}>No se pudieron cargar los animes.</Text>
              )
            }
            renderItem={({ item }) => <AnimeRow anime={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <View style={styles.footerSpace} />
            }
          />
        ) : (
          // Opción B: pestañas sin pantalla propia muestran "Próximamente"
          <View style={styles.placeholder}>
            <Ionicons name="sparkles-outline" size={48} color="#22D3EE" />
            <Text style={styles.placeholderTitle}>Próximamente</Text>
            <Text style={styles.placeholderText}>
              La pestaña "{labelFor(tab)}" estará disponible en la siguiente fase.
            </Text>
            <Pressable style={styles.backHome} onPress={() => setTab('inicio')}>
              <Text style={styles.backHomeText}>Volver al inicio</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>

      <TabBar active={tab} onChange={setTab} />
    </View>
  );
}

// Etiqueta legible de cada pestaña para el texto del placeholder.
function labelFor(tab: TabName): string {
  switch (tab) {
    case 'buscar':
      return 'Buscar';
    case 'rankings':
      return 'Rankings';
    case 'resenas':
      return 'Reseñas';
    case 'perfil':
      return 'Perfil';
    default:
      return 'Inicio';
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A1628',
  },
  safe: {
    flex: 1,
  },
  header: {
    paddingBottom: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 18,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  carousel: {
    paddingHorizontal: 16,
    gap: 12,
  },
  offlineNote: {
    color: '#6B7280',
    fontSize: 11,
    fontStyle: 'italic',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  genreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  genreLinkText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  empty: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
  },
  footerSpace: {
    height: 8,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 32,
  },
  placeholderTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 8,
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  backHome: {
    marginTop: 16,
    backgroundColor: '#0EA5E9',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  backHomeText: {
    color: '#04263a',
    fontWeight: '800',
    fontSize: 14,
  },
});
