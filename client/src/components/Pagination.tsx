import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
      >
        <ChevronLeft size={18} />
        Anterior
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          Página {currentPage} de {totalPages}
        </span>
      </div>

      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
      >
        Próxima
        <ChevronRight size={18} />
      </Button>
    </div>
  );
};
