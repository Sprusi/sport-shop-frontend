import { HealthyEating } from '../Meal/HealthyEating';

export interface BasketDto extends HealthyEating {
  quantity: number;
}
