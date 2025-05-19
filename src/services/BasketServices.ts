import { AxiosResponse } from 'axios';

import instance from './axios';
import { BasketDto } from '@/dto/basket/BasketDto';
import { OrderHistory } from '@/dto/basket/OrderHistory';
import { QueryForAllData } from '@/dto/basket/QueryForAllData';

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

const getOrderHistory = (params: QueryForAllData): Promise<AxiosResponse<OrderHistory[]>> => {
  return instance.get(`/basket/orderHistory`, { params });
};

const getAllHistory = (params: QueryForAllData): Promise<AxiosResponse<OrderHistory[]>> => {
  return instance.get(`/basket/allOrders`, { params });
};

export const BasketServices = {
  getBasketItems,
  removeBasketItems,
  changeQuantity,
  getAllQuantity,
  createOrder,
  getOrderHistory,
  getAllHistory,
};
