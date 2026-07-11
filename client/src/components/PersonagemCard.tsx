import React from 'react';
import { Heart } from 'lucide-react';
import { useFavoritos } from '@/contexts/FavoritosContext';

interface PersonagemCardProps {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

const STATUS_CONFIG: Record<string, { dot: string; badge: string; label: string }> = {
  Alive: {
    dot: 'bg-green-500',
    badge: 'bg-green-100 text-green-800',
    label: 'Vivo',
  },
  Dead: {
    dot: 'bg-red-500',
    badge: 'bg-red-100 text-red-800',
    label: 'Morto',
  },
  unknown: {
    dot: 'bg-gray-400',
    badge: 'bg-gray-100 text-gray-700',
    label: 'Desconhecido',
  },
};

export const PersonagemCard: React.FC<PersonagemCardProps> = ({
  id,
  name,
  image,
  species,
  status,
}) => {
  const { adicionarFavorito, removerFavorito, isFavorito } = useFavoritos();
  const favorito = isFavorito(id);

  const handleToggleFavorito = () => {
    if (favorito) {
      removerFavorito(id);
    } else {
      adicionarFavorito({ id, name, image, species, status });
    }
  };

  const statusConfig = STATUS_CONFIG[status] ?? STATUS_CONFIG['unknown'];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-56 object-cover" />
        <button
          onClick={handleToggleFavorito}
          aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className={`absolute top-2 right-2 rounded-full p-2 transition-all shadow-md ${
            favorito
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-red-500'
          }`}
        >
          <Heart size={18} fill={favorito ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-base mb-1 truncate text-gray-900 dark:text-white" title={name}>
          {name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{species}</p>

        {/* Indicador colorido de status */}
        <div className="mt-auto flex items-center gap-2">
          <span className={`inline-block w-2.5 h-2.5 rounded-full ${statusConfig.dot}`} />
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusConfig.badge}`}>
            {statusConfig.label}
          </span>
        </div>
      </div>
    </div>
  );
};
