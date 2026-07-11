import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <Navbar />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Rick and Morty Universe</h1>
          <p className="text-xl mb-8 text-blue-100">
            Explore o universo de Rick and Morty. Descubra personagens, episódios e localizações
            incríveis!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Link href="/personagens" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-8 rounded-lg transition-all transform hover:scale-105">
              <div className="text-4xl mb-4">👥</div>
              <h2 className="text-2xl font-bold mb-2">Personagens</h2>
              <p className="text-blue-100">Conheça todos os personagens da série</p>
            </Link>

            <Link href="/episodios" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-8 rounded-lg transition-all transform hover:scale-105">
              <div className="text-4xl mb-4">📺</div>
              <h2 className="text-2xl font-bold mb-2">Episódios</h2>
              <p className="text-blue-100">Explore todos os episódios da série</p>
            </Link>

            <Link href="/localizacoes" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-8 rounded-lg transition-all transform hover:scale-105">
              <div className="text-4xl mb-4">🌍</div>
              <h2 className="text-2xl font-bold mb-2">Localizações</h2>
              <p className="text-blue-100">Descubra os locais do universo</p>
            </Link>
          </div>

          <div className="mt-12">
            <Link href="/personagens" className="inline-block">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-bold">
                Começar a Explorar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
