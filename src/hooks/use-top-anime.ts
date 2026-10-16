import { useEffect, useState } from 'react';

// Tipo de un anime tal como lo usamos en la interfaz.
export type Anime = {
  id: number;
  title: string;
  image: string;
  score: number;
  episodes: number | null;
  studio: string;
  genres: string;
};

// Lista local: se muestra de inmediato (para que nunca se vea vacía)
// y queda como respaldo si la API falla o no hay internet.
const LOCAL: Anime[] = [
  {
    id: 1,
    title: 'Fullmetal Alchemist: Brotherhood',
    image: 'https://cdn.myanimelist.net/images/anime/1208/94745l.jpg',
    score: 9.1,
    episodes: 64,
    studio: 'Bones',
    genres: 'Action, Adventure',
  },
  {
    id: 2,
    title: 'Steins;Gate',
    image: 'https://cdn.myanimelist.net/images/anime/1935/127974l.jpg',
    score: 9.07,
    episodes: 24,
    studio: 'White Fox',
    genres: 'Sci-Fi, Thriller',
  },
  {
    id: 3,
    title: 'Attack on Titan',
    image: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
    score: 9.05,
    episodes: 25,
    studio: 'Wit Studio',
    genres: 'Action, Drama',
  },
  {
    id: 4,
    title: 'Demon Slayer',
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
    score: 8.45,
    episodes: 26,
    studio: 'ufotable',
    genres: 'Action, Supernatural',
  },
  {
    id: 5,
    title: 'Jujutsu Kaisen',
    image: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
    score: 8.5,
    episodes: 24,
    studio: 'MAPPA',
    genres: 'Action, Fantasy',
  },
  {
    id: 6,
    title: 'Hunter x Hunter (2011)',
    image: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
    score: 9.03,
    episodes: 148,
    studio: 'Madhouse',
    genres: 'Action, Adventure',
  },
];

// Convierte el objeto que llega de la API a nuestro tipo Anime.
function mapAnime(raw: any): Anime {
  return {
    id: raw?.mal_id ?? 0,
    title: raw?.title ?? 'Sin título',
    image: raw?.images?.jpg?.large_image_url ?? raw?.images?.jpg?.image_url ?? '',
    score: typeof raw?.score === 'number' ? raw.score : 0,
    episodes: typeof raw.episodes === 'number' ? raw.episodes : null,
    studio: raw?.studios?.[0]?.name ?? 'Desconocido',
    genres:
      (raw?.genres ?? []).map((g: any) => g?.name).filter(Boolean).join(', ') || 'Anime',
  };
}

// Hook que trae el Top de animes desde la API Jikan (MyAnimeList).
// Empieza con la lista local para que SIEMPRE haya contenido visible,
// y la reemplaza por datos reales si la API responde a tiempo.
export function useTopAnime(limit = 12) {
  const [animes, setAnimes] = useState<Anime[]>(LOCAL);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Tiempo máximo de espera: si la API no responde en 8 segundos, seguimos con lo local.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    async function fetchTop() {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/top/anime?sfw=true&limit=${limit}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const list: Anime[] = (json?.data ?? []).map(mapAnime).filter((a: Anime) => a.image);

        if (cancelled) return;
        if (list.length > 0) {
          setAnimes(list);
          setUsingFallback(false);
        }
      } catch {
        // Sin internet, la API falló o tardó demasiado: nos quedamos con lo local.
        if (!cancelled) setUsingFallback(true);
      } finally {
        clearTimeout(timer);
        if (!cancelled) setLoading(false);
      }
    }

    fetchTop();
    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [limit]);

  return { animes, loading, usingFallback };
}
