import React, { useState, useEffect } from 'react';
import { Pagination } from '@/components/Pagination';
import { Loading } from '@/components/Loading';
import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { MapPin, Layers, Globe } from 'lucide-react';

interface LocalizacaoResponse {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: LocalizacaoResponse[];
}

export default function Localizacoes() {
  // useState — controle de filtro por tipo, paginação, loading e dados
  const [localizacoes, setLocalizacoes] = useState<LocalizacaoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [typeFilter, setTypeFilter] = useState('');
  const [allTypes, setAllTypes] = useState<string[]>([]);

  // useEffect — buscar tipos únicos para popular o select de filtro
  useEffect(() => {
    const fetchAllTypes = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/location?page=1');
        if (!response.ok) return;
        const data: ApiResponse = await response.json();
        const types = Array.from(
          new Set(data.results.map((loc) => loc.type).filter(Boolean))
        ).sort();
        setAllTypes(types);
      } catch (error) {
        console.error('Erro ao buscar tipos:', error);
      }
    };

    fetchAllTypes();
  }, []);

  // useEffect — buscar localizações ao carregar e ao mudar filtro/página
  useEffect(() => {
    const controller = new AbortController();

    const fetchLocalizacoes = async () => {
      try {
        setLoading(true);
        setErro(false);

        let url = `https://rickandmortyapi.com/api/location?page=${currentPage}`;
        if (typeFilter) url += `&type=${encodeURIComponent(typeFilter)}`;

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          setLocalizacoes([]);
          setTotalPages(1);
          return;
        }

        const data: ApiResponse = await response.json();
        setLocalizacoes(data.results ?? []);
        setTotalPages(data.info?.pages ?? 1);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') return;
        console.error('Erro ao buscar localizações:', error);
        setErro(true);
        setLocalizacoes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocalizacoes();
    return () => controller.abort();
  }, [currentPage, typeFilter]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
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
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Localizações</h1>

        {/* Filtro por tipo */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
          <label
            htmlFor="type-filter"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Filtrar por tipo
          </label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={handleTypeChange}
            className="w-full md:w-64 h-9 px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os tipos</option>
            {allTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Conteúdo principal */}
        {loading ? (
          <Loading />
        ) : erro ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Erro ao carregar localizações. Tente novamente.</p>
          </div>
        ) : localizacoes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {localizacoes.map((localizacao) => (
                <Card
                  key={localizacao.id}
                  className="p-6 hover:shadow-lg transition-shadow flex flex-col gap-4 dark:bg-gray-900 dark:border-gray-800"
                >
                  <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug">
                    {localizacao.name}
                  </h3>

                  <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Layers size={14} className="text-gray-400 shrink-0" />
                      <span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Tipo:</span>{' '}
                        {localizacao.type || 'Desconhecido'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe size={14} className="text-gray-400 shrink-0" />
                      <span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Dimensão:</span>{' '}
                        {localizacao.dimension || 'Desconhecida'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400 shrink-0" />
                      <span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Residentes:</span>{' '}
                        {localizacao.residents.length}
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
            <p className="text-gray-600 dark:text-gray-400 text-lg">Nenhuma localização encontrada.</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Tente selecionar outro tipo.</p>
          </div>
        )}
      </div>
    </div>
  );
}
