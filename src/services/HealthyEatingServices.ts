import { AxiosResponse } from 'axios';

import instance from './axios';
import { HealthyEatingTable, MealPlanResponseDto } from '@/dto';

const getHealthyEating = (): Promise<AxiosResponse<HealthyEatingTable[]>> => {
  return instance.get(`/healthyEating`);
};

const deleteHealthyEating = (id: number): Promise<AxiosResponse<HealthyEatingTable[]>> => {
  return instance.delete(`/healthyEating/${id}`);
};

const getHealthyEatingForUser = (id: number): Promise<AxiosResponse<MealPlanResponseDto[]>> => {
  return instance.get(`/healthyEating/user/${id}`);
};

export const HealthyEatingServices = {
  getHealthyEating,
  getHealthyEatingForUser,
  deleteHealthyEating,
};
