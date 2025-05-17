import { HealthyEating } from './HealthyEating';

export interface HealthyEatingTable extends HealthyEating {
  id: number;
  title: string;
  compound: string;
  kcal: number;
  squirrels: number;
  fats: number;
  carbohydrates: number;
  price: number;
  image: string;
  calories: number;
}
