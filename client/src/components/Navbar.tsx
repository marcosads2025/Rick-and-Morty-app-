import React from 'react';
import { Link, useLocation } from 'wouter';
import { Heart, Tv, Users, MapPin, Moon, Sun } from 'lucide-react';
import { useFavoritos } from '@/contexts/FavoritosContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { href: '/personagens', label: 'Personagens', icon: Users },
  { href: '/episodios', label: 'Episódios', icon: Tv },
  { href: '/localizacoes', label: 'Localizações', icon: MapPin },
];

export const Navbar: React.FC = () => {
  const { favoritos } = useFavoritos();
  const { theme, toggleTheme, switchable } = useTheme();
  const [location] = useLocation();

  const isActive = (href: string) => location === href;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity whitespace-nowrap">
            <span>🛸</span>
            <span className="hidden sm:inline">Rick and Morty</span>
          </Link>

          {/* Links de navegação */}
          <div className="flex items-center gap-1 sm:gap-2">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'bg-white/30 text-white'
                    : 'hover:bg-white/20 text-white/90 hover:text-white'
                }`}
              >
                <Icon size={15} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            ))}

            {/* Favoritos com badge contador */}
            <Link href="/favoritos"
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive('/favoritos')
                  ? 'bg-white/30 text-white'
                  : 'hover:bg-white/20 text-white/90 hover:text-white'
              }`}
            >
              <Heart size={15} fill={favoritos.length > 0 ? 'currentColor' : 'none'} />
              <span className="hidden md:inline">Favoritos</span>

              {/* Badge com número de favoritos */}
              {favoritos.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 shadow">
                  {favoritos.length > 99 ? '99+' : favoritos.length}
                </span>
              )}
            </Link>

            {/* Botão de troca de tema */}
            {switchable && toggleTheme && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-white hover:bg-white/20"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
