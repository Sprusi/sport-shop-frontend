import { BasketDto } from './BasketDto';

export interface OrderHistory {
  items: BasketDto[];
  id: number;
}
