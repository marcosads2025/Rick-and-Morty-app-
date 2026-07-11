import React, { createContext, useContext, useState, useEffect } from 'react';

interface Personagem {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

interface FavoritosContextType {
  favoritos: Personagem[];
  adicionarFavorito: (personagem: Personagem) => void;
  removerFavorito: (id: number) => void;
  isFavorito: (id: number) => boolean;
}

const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

export const FavoritosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoritos, setFavoritos] = useState<Personagem[]>([]);

  // Carregar favoritos do localStorage ao montar
  useEffect(() => {
    const favoritosSalvos = localStorage.getItem('favoritos');
    if (favoritosSalvos) {
      try {
        setFavoritos(JSON.parse(favoritosSalvos));
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    }
  }, []);

  // Salvar favoritos no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const adicionarFavorito = (personagem: Personagem) => {
    setFavoritos((prev) => {
      const existe = prev.some((fav) => fav.id === personagem.id);
      if (!existe) {
        return [...prev, personagem];
      }
      return prev;
    });
  };

  const removerFavorito = (id: number) => {
    setFavoritos((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorito = (id: number) => {
    return favoritos.some((fav) => fav.id === id);
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, adicionarFavorito, removerFavorito, isFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useFavoritos deve ser usado dentro de FavoritosProvider');
  }
  return context;
};
