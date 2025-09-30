import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Flame, Gem, Lightbulb, LucideIcon, MessagesSquare, Rocket } from 'lucide-react';

const categoryStyles: Record<
  Category,
  { gradient: string; icon: LucideIcon }
> = {
  Motivational: {
    gradient: 'from-amber-500 to-orange-500',
    icon: Flame,
  },
  Funny: {
    gradient: 'from-lime-400 to-yellow-400',
    icon: Lightbulb,
  },
  Philosophical: {
    gradient: 'from-indigo-400 to-purple-500',
    icon: MessagesSquare,
  },
  'Market Wisdom': {
    gradient: 'from-emerald-400 to-teal-500',
    icon: Gem,
  },
  Degen: {
    gradient: 'from-pink-500 to-red-500',
    icon: Rocket,
  },
};

interface CategoryTagProps {
  category: Category;
  className?: string;
}

export default function CategoryTag({ category, className }: CategoryTagProps) {
  const { gradient, icon: Icon } = categoryStyles[category] || {
    gradient: 'from-gray-500 to-gray-600',
    icon: () => null,
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-white',
        'bg-gradient-to-r transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-px',
        gradient,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{category}</span>
    </div>
  );
}
