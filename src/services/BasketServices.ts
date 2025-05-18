import { AxiosResponse } from 'axios';

import instance from './axios';
import { BasketDto } from '@/dto/basket/BasketDto';

const getBasketItems = (): Promise<AxiosResponse<BasketDto[]>> => {
  return instance.get(`/basket`);
};

const removeBasketItems = (id: number): Promise<AxiosResponse> => {
  return instance.delete(`/basket/${id}`);
};

const changeQuantity = (id: number, type: 'inc' | 'dec'): Promise<AxiosResponse<number>> => {
  return instance.patch(`/basket/${type}/${id}`);
};

const getAllQuantity = (): Promise<AxiosResponse<number>> => {
  return instance.get(`/basket/quantity`);
};

const createOrder = (id: number): Promise<AxiosResponse> => {
  return instance.post(`/basket/order/${id}`);
};

export const BasketServices = {
  getBasketItems,
  removeBasketItems,
  changeQuantity,
  getAllQuantity,
  createOrder,
};
