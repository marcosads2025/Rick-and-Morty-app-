import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-24">
      <div className="text-center">
        <Loader2 className="animate-spin mx-auto mb-3 text-blue-600" size={36} />
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Carregando...</p>
      </div>
    </div>
  );
};
