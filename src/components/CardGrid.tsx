import { motion } from 'framer-motion';
import type { Card as CardType } from '@/types/card';
import { Card } from './Card';
import { useProgressStore } from '@/store/useProgressStore';
import { BookOpen } from 'lucide-react';

interface CardGridProps {
  cards: CardType[];
  compact?: boolean;
}

export function CardGrid({ cards, compact = false }: CardGridProps) {
  const { currentLanguage } = useProgressStore();
  const isArabic = currentLanguage === 'ar';

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookOpen className="w-16 h-16 text-slate-300 mb-4" />
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
          {isArabic ? 'لا توجد كروت' : 'No cards found'}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          {isArabic 
            ? 'حاول تعديل عوامل التصفية أو البحث' 
            : 'Try adjusting your filters or search'}
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${
      compact 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
        : 'grid-cols-1'
    }`}>
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card card={card} compact={compact} />
        </motion.div>
      ))}
    </div>
  );
}
