import { create } from 'zustand';

import { getUserId } from '@/utils/token';

import { MealPlanResponseDto } from '@/dto';
import { HealthyEatingServices } from '@/services/HealthyEatingServices';
import { MessageService } from '@/services/MessageService';

type Store = {
  data: MealPlanResponseDto[];
  loading: boolean;
  getData: () => void;
  updateNeeded: boolean;
  addItemToBasket: (id: number) => void;
};

export const useUserHealthyEatingStore = create<Store>()((set) => ({
  data: [],
  loading: false,
  updateNeeded: true,
  getData: () => {
    set(() => ({ loading: true }));
    HealthyEatingServices.getHealthyEatingForUser(getUserId())
      .then(({ data }) => set(() => ({ data, updateNeeded: false })))
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ loading: false })));
  },
  addItemToBasket: (id: number) => {
    HealthyEatingServices.getHealthyEatingToBasket(id)
      .then(() => MessageService.success())
      .catch(({ message }) => MessageService.warn(message));
  },
}));
