import { create } from 'zustand';

import { ActionMessages } from '@/constants';

import { HealthyEatingTable } from '@/dto';
import { HealthyEatingServices } from '@/services/HealthyEatingServices';
import { MessageService } from '@/services/MessageService';

type Store = {
  data: HealthyEatingTable[];
  loading: boolean;
  getData: () => void;
  deleteItem: (id: number) => void;
  updateNeeded: boolean;
};

export const useAdminHealthyEatingStore = create<Store>()((set) => ({
  data: [],
  loading: false,
  updateNeeded: true,
  getData: () => {
    set(() => ({ loading: true }));
    HealthyEatingServices.getHealthyEating()
      .then(({ data }) => set(() => ({ data, updateNeeded: false })))
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ loading: false })));
  },
  deleteItem: (id: number) => {
    if (!id) return MessageService.warn(ActionMessages.ID_NOT_FOUND);
    set(() => ({ loading: true }));
    HealthyEatingServices.deleteHealthyEating(id)
      .then(() => {
        MessageService.success();
        set(() => ({ updateNeeded: true }));
      })
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ loading: false })));
  },
}));
