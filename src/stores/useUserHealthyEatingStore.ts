import { create } from 'zustand';

import { MealPlanResponseDto } from '@/dto';
import { HealthyEatingServices } from '@/services/HealthyEatingServices';
import { MessageService } from '@/services/MessageService';

type Store = {
  data: MealPlanResponseDto[];
  loading: boolean;
  getData: () => void;
  updateNeeded: boolean;
};

export const useUserHealthyEatingStore = create<Store>()((set) => ({
  data: [],
  loading: false,
  updateNeeded: true,
  getData: () => {
    set(() => ({ loading: true }));
    HealthyEatingServices.getHealthyEatingForUser(1)
      .then(({ data }) => set(() => ({ data, updateNeeded: false })))
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ loading: false })));
  },
}));
