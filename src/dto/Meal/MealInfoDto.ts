import { MealNutrientsDto } from './MealNutrientsDto';

export interface MealInfoDto {
  id: number;
  title: string;
  calories: number;
  compound: string;
  image?: string;
  price: number;
  nutrients: MealNutrientsDto;
  inBasketQuantity: number;
}
