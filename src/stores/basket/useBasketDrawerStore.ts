import { create } from 'zustand';

import { BasketDto } from '@/dto/basket/BasketDto';
import { BasketServices } from '@/services/BasketServices';
import { MessageService } from '@/services/MessageService';

type Store = {
  open: boolean;
  setOpen: (key: boolean) => void;
  loading: boolean;
  updateNeeded: boolean;
  setUpdateNeeded: (b: boolean) => void;
  data: BasketDto[];
  getData: () => void;
  removeItem: (id: number) => void;
};

export const useBasketDrawerStore = create<Store>()((set) => ({
  open: false,
  loading: false,
  updateNeeded: true,
  data: [],

  setOpen: (key: boolean) => set(() => ({ open: key })),
  setUpdateNeeded: (b: boolean) => set(() => ({ updateNeeded: b })),

  getData: () => {
    set(() => ({ loading: true, updateNeeded: false }));
    BasketServices.getBasketItems()
      .then(({ data }) => set(() => ({ data })))
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ loading: false })));
  },

  removeItem: (id: number) => {
    set(() => ({ loading: true, updateNeeded: false }));
    BasketServices.removeBasketItems(id)
      .then(() => {
        MessageService.success();
        set(() => ({ updateNeeded: true }));
      })
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ loading: false })));
  },
}));
