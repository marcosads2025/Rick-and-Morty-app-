import React, { useState, useEffect, useRef } from 'react';
import { PersonagemCard } from '@/components/PersonagemCard';
import { Pagination } from '@/components/Pagination';
import { Loading } from '@/components/Loading';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PersonagemResponse {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: PersonagemResponse[];
}

const STATUS_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'alive', label: 'Vivo' },
  { value: 'dead', label: 'Morto' },
  { value: 'unknown', label: 'Desconhecido' },
];

export default function Personagens() {
  // useState — controle de busca, filtros, paginação, loading e dados
  const [personagens, setPersonagens] = useState<PersonagemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchName, setSearchName] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // useRef — foco automático no campo de busca ao carregar a página
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // useEffect — buscar personagens ao mudar página, nome ou status
  useEffect(() => {
    const controller = new AbortController();

    const fetchPersonagens = async () => {
      try {
        setLoading(true);
        setErro(false);

        let url = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
        if (searchName) url += `&name=${encodeURIComponent(searchName)}`;
        if (statusFilter) url += `&status=${statusFilter}`;

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          setPersonagens([]);
          setTotalPages(1);
          return;
        }

        const data: ApiResponse = await response.json();
        setPersonagens(data.results ?? []);
        setTotalPages(data.info?.pages ?? 1);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') return;
        console.error('Erro ao buscar personagens:', error);
        setErro(true);
        setPersonagens([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonagens();
    return () => controller.abort();
  }, [currentPage, searchName, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchName(searchInput);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
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
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Personagens</h1>

        {/* Busca e Filtros */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Campo de busca — useRef aplicado para foco automático */}
              <div>
                <label
                  htmlFor="search-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Buscar por nome
                </label>
                <Input
                  id="search-name"
                  ref={searchInputRef}
                  type="text"
                  placeholder="Digite o nome do personagem..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Filtro por status: Todos / Vivo / Morto / Desconhecido */}
              <div>
                <label
                  htmlFor="status-filter"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Filtrar por status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={handleStatusChange}
                  className="w-full h-9 px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botão pesquisar */}
              <div className="flex items-end">
                <Button type="submit" className="w-full gap-2">
                  <Search size={16} />
                  Pesquisar
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Conteúdo principal */}
        {loading ? (
          <Loading />
        ) : erro ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Erro ao carregar personagens. Tente novamente.</p>
          </div>
        ) : personagens.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {personagens.map((personagem) => (
                <PersonagemCard
                  key={personagem.id}
                  id={personagem.id}
                  name={personagem.name}
                  image={personagem.image}
                  species={personagem.species}
                  status={personagem.status}
                />
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
            <p className="text-gray-600 dark:text-gray-400 text-lg">Nenhum personagem encontrado.</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Tente ajustar os filtros de busca.</p>
          </div>
        )}
      </div>
    </div>
  );
}
