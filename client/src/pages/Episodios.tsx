import React, { useState, useEffect } from 'react';
import { Pagination } from '@/components/Pagination';
import { Loading } from '@/components/Loading';
import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Calendar, Users } from 'lucide-react';

interface EpisodioResponse {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  characters: string[];
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: EpisodioResponse[];
}

const TEMPORADAS = [
  { value: '', label: 'Todas as temporadas' },
  { value: 'S01', label: 'Temporada 1' },
  { value: 'S02', label: 'Temporada 2' },
  { value: 'S03', label: 'Temporada 3' },
  { value: 'S04', label: 'Temporada 4' },
  { value: 'S05', label: 'Temporada 5' },
  { value: 'S06', label: 'Temporada 6' },
  { value: 'S07', label: 'Temporada 7' },
];

export default function Episodios() {
  // useState — controle de filtro de temporada, paginação, loading e dados
  const [episodios, setEpisodios] = useState<EpisodioResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [seasonFilter, setSeasonFilter] = useState('');

  // useEffect — buscar episódios ao carregar e ao mudar filtro/página
  useEffect(() => {
    const controller = new AbortController();

    const fetchEpisodios = async () => {
      try {
        setLoading(true);
        setErro(false);

        let url = `https://rickandmortyapi.com/api/episode?page=${currentPage}`;
        if (seasonFilter) url += `&episode=${seasonFilter}`;

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          setEpisodios([]);
          setTotalPages(1);
          return;
        }

        const data: ApiResponse = await response.json();
        setEpisodios(data.results ?? []);
        setTotalPages(data.info?.pages ?? 1);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') return;
        console.error('Erro ao buscar episódios:', error);
        setErro(true);
        setEpisodios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodios();
    return () => controller.abort();
  }, [currentPage, seasonFilter]);

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeasonFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Episódios</h1>

        {/* Filtro por temporada */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
          <label
            htmlFor="season-filter"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Filtrar por temporada
          </label>
          <select
            id="season-filter"
            value={seasonFilter}
            onChange={handleSeasonChange}
            className="w-full md:w-64 h-9 px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {TEMPORADAS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Conteúdo principal */}
        {loading ? (
          <Loading />
        ) : erro ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Erro ao carregar episódios. Tente novamente.</p>
          </div>
        ) : episodios.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {episodios.map((episodio) => (
                <Card
                  key={episodio.id}
                  className="p-6 hover:shadow-lg transition-shadow flex flex-col gap-3 dark:bg-gray-900 dark:border-gray-800"
                >
                  {/* Código do episódio (ex: S01E01) */}
                  <span className="inline-block bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full tracking-wide w-fit">
                    {episodio.episode}
                  </span>

                  <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug">
                    {episodio.name}
                  </h3>

                  <div className="flex flex-col gap-1.5 text-sm text-gray-600 dark:text-gray-400 mt-auto">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400 shrink-0" />
                      <span>{episodio.air_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-gray-400 shrink-0" />
                      <span>
                        {episodio.characters.length}{' '}
                        {episodio.characters.length === 1 ? 'personagem' : 'personagens'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Nenhum episódio encontrado.</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Tente selecionar outra temporada.</p>
          </div>
        )}
      </div>
    </div>
  );
}
