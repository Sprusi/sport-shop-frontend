import { AxiosResponse } from 'axios';

import instance from './axios';
import { HealthyEating, HealthyEatingTable, MealPlanResponseDto } from '@/dto';

const getHealthyEating = (): Promise<AxiosResponse<HealthyEating[]>> => {
  return instance.get(`/healthyEating`);
};

const getHealthyEatingById = (id: number): Promise<AxiosResponse<HealthyEatingTable>> => {
  return instance.get(`/healthyEating/${id}`);
};

const patchHealthyEatingById = (id: number, data: FormData): Promise<AxiosResponse<HealthyEatingTable[]>> => {
  return instance.patch(`/healthyEating/${id}`, data);
};

const createHealthyEating = (data: FormData): Promise<AxiosResponse> => {
  return instance.post(`/healthyEating`, data);
};

const deleteHealthyEating = (id: number): Promise<AxiosResponse> => {
  return instance.delete(`/healthyEating/${id}`);
};

const getHealthyEatingForUser = (id: number): Promise<AxiosResponse<MealPlanResponseDto[]>> => {
  return instance.get(`/healthyEating/user/${id}`);
};

export const HealthyEatingServices = {
  getHealthyEating,
  getHealthyEatingForUser,
  deleteHealthyEating,
  getHealthyEatingById,
  createHealthyEating,
  patchHealthyEatingById,
};
