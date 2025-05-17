import { AxiosResponse } from 'axios';

import instance from './axios';
import { BasketDto } from '@/dto/basket/BasketDto';

const getBasketItems = (): Promise<AxiosResponse<BasketDto[]>> => {
  return instance.get(`/basket`);
};

const removeBasketItems = (id: number): Promise<AxiosResponse> => {
  return instance.delete(`/basket/${id}`);
};

export const BasketServices = {
  getBasketItems,
  removeBasketItems,
};
