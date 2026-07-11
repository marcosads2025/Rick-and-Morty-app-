import React from 'react';
import { Navbar } from '@/components/Navbar';
import { useFavoritos } from '@/contexts/FavoritosContext';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const STATUS_CONFIG: Record<string, { dot: string; badge: string; label: string }> = {
  Alive: { dot: 'bg-green-500', badge: 'bg-green-100 text-green-800', label: 'Vivo' },
  Dead: { dot: 'bg-red-500', badge: 'bg-red-100 text-red-800', label: 'Morto' },
  unknown: { dot: 'bg-gray-400', badge: 'bg-gray-100 text-gray-700', label: 'Desconhecido' },
};

export default function Favoritos() {
  // useContext — acessa lista de favoritos compartilhada globalmente via FavoritosContext
  const { favoritos, removerFavorito } = useFavoritos();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Título com contador */}
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Meus Favoritos</h1>
          {favoritos.length > 0 && (
            <span className="bg-red-500 text-white text-sm font-bold px-2.5 py-0.5 rounded-full">
              {favoritos.length}
            </span>
          )}
        </div>

        {favoritos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoritos.map((personagem) => {
              const statusConfig =
                STATUS_CONFIG[personagem.status] ?? STATUS_CONFIG['unknown'];

              return (
                <div
                  key={personagem.id}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <img
                    src={personagem.image}
                    alt={personagem.name}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-4 flex flex-col flex-1 gap-3">
                    <div>
                      <h3
                        className="font-bold text-base truncate text-gray-900 dark:text-white"
                        title={personagem.name}
                      >
                        {personagem.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{personagem.species}</p>
                    </div>

                    {/* Indicador colorido de status */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${statusConfig.dot}`}
                      />
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusConfig.badge}`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>

                    {/* Botão para remover dos favoritos */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removerFavorito(personagem.id)}
                      className="mt-auto w-full gap-2 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300 dark:border-red-900 dark:hover:bg-red-950 dark:hover:text-red-400 dark:hover:border-red-800"
                    >
                      <Trash2 size={14} />
                      Remover dos favoritos
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Mensagem exibida quando a lista de favoritos estiver vazia */
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Heart size={64} className="text-gray-200 dark:text-gray-700" />
            <p className="text-gray-600 dark:text-gray-400 text-xl font-medium">
              Você ainda não tem favoritos.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm text-center max-w-xs">
              Navegue até Personagens e clique no ❤️ para adicionar favoritos.
            </p>
            <Link href="/personagens" className="mt-2 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              Ver Personagens
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
