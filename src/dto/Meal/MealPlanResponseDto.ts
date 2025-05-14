import { MealInfoDto } from './MealInfoDto';
import { MealTotalsDto } from './MealTotalsDto';

export interface MealPlanResponseDto {
  meals: {
    breakfast: MealInfoDto;
    lunch: MealInfoDto;
    dinner: MealInfoDto;
  };
  totals: MealTotalsDto;
  deviationPercentage: number;
}
