import { create } from 'zustand';

import { getUserId } from '@/utils/token';

import { MealPlanResponseDto } from '@/dto';
import { HealthyEatingServices } from '@/services/HealthyEatingServices';
import { MessageService } from '@/services/MessageService';

type Store = {
  data: MealPlanResponseDto[];
  loading: boolean;
  isItemAdded: boolean;
  getData: () => void;
  updateNeeded: boolean;
  setUpdateNeeded: (b: boolean) => void;
  addItemToBasket: (id: number) => void;
};

export const useUserHealthyEatingStore = create<Store>()((set) => ({
  data: [],
  loading: false,
  updateNeeded: true,
  setUpdateNeeded: (b: boolean) => set(() => ({ updateNeeded: b })),
  isItemAdded: false,
  getData: () => {
    set(() => ({ loading: true }));
    HealthyEatingServices.getHealthyEatingForUser(getUserId())
      .then(({ data }) => set(() => ({ data, updateNeeded: false })))
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ loading: false })));
  },

  addItemToBasket: (id: number) => {
    HealthyEatingServices.getHealthyEatingToBasket(id)
      .then(() => {
        set(() => ({ isItemAdded: true }));
        MessageService.success();
      })
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ isItemAdded: false })));
  },
}));
