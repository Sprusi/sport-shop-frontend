import { EatingType } from '@/enums/EatingType';

export interface HealthyEating {
  calories: number;
  compound: string;
  eatingType: EatingType;
  id: number;
  image: string;
  nutrients: Nutrients;
  carbohydrates: number;
  fats: number;
  squirrels: number;
  price: number;
  title: string;
}

interface Nutrients {
  squirrels: number;
  fats: number;
  carbohydrates: number;
}
