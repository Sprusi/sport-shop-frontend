import { AxiosResponse } from 'axios';

import instance from './axios';
import { MealPlanResponseDto } from '@/dto';

const getHealthyEating = (): Promise<AxiosResponse> => {
  return instance.get('/healthyEating');
};

const getHealthyEatingForUser = (id: number): Promise<AxiosResponse<MealPlanResponseDto[]>> => {
  return instance.get(`/healthyEating/user/${id}`);
};

export const HealthyEatingServices = {
  getHealthyEating,
  getHealthyEatingForUser,
};
