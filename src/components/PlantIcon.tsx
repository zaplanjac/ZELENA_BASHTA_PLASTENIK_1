import { LucideIcon, Flower2, CircleOff } from 'lucide-react';
import { 
  Carrot, Apple, Leaf, 
  CircleDot, Sprout, 
  Banana, Cherry
} from 'lucide-react';

interface PlantIconProps {
  name: string;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  tomato: Cherry,
  pepper: Sprout,
  cucumber: Banana,
  cabbage: Leaf,
  kohlrabi: CircleDot,
  lettuce: Leaf,
  spinach: Leaf,
  radish: CircleDot,
  peas: CircleDot,
  carrot: Carrot,
  parsley: Leaf,
  parsnip: Carrot,
  onion: CircleDot,
  garlic: CircleDot,
  potato: CircleDot,
  kale: Leaf,
  cauliflower: Flower2,
  horseradish: Sprout,
  eggplant: Sprout,
  zucchini: Banana,
  beans: Sprout,
  'green-beans': Sprout,
  celery: Leaf,
  leek: Sprout,
  watermelon: CircleDot,
  melon: Apple
};

export function PlantIcon({ name, className }: PlantIconProps) {
  const Icon = iconMap[name] || CircleOff;
  return <Icon className={className} />;
}