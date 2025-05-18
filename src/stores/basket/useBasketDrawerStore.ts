import { create } from 'zustand';

import { BasketDto } from '@/dto/basket/BasketDto';
import { OrderHistory } from '@/dto/basket/OrderHistory';
import { BasketServices } from '@/services/BasketServices';
import { MessageService } from '@/services/MessageService';

type Store = {
  open: boolean;
  setOpen: (key: boolean) => void;
  quantity: number;
  updateQuantity: boolean;
  setUpdateQuantity: (b: boolean) => void;
  loading: boolean;
  updateNeeded: boolean;
  setUpdateNeeded: (b: boolean) => void;
  data: BasketDto[];
  historyData: OrderHistory[];
  getData: () => void;
  removeItem: (id: number) => void;
  changeQuantity: (id: number, type: 'inc' | 'dec') => void;
  getAllQuantity: () => void;
  createOrder: (id: number) => void;
  getHistory: () => void;
};

export const useBasketDrawerStore = create<Store>()((set) => ({
  open: false,
  loading: false,
  updateNeeded: true,
  data: [],
  historyData: [],
  updateQuantity: true,
  quantity: 0,
  setOpen: (key: boolean) => set(() => ({ open: key })),
  setUpdateNeeded: (b: boolean) => set(() => ({ updateNeeded: b })),
  setUpdateQuantity: (b: boolean) => set(() => ({ updateQuantity: b })),
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
        set(() => ({ updateNeeded: true, updateQuantity: true }));
      })
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ loading: false })));
  },

  changeQuantity: (id: number, type: 'inc' | 'dec') => {
    BasketServices.changeQuantity(id, type)
      .then(() => set(() => ({ updateNeeded: true, updateQuantity: true })))
      .catch(({ message }) => MessageService.warn(message));
  },

  getAllQuantity: () => {
    set(() => ({ updateQuantity: false }));
    BasketServices.getAllQuantity()
      .then(({ data }) => set(() => ({ quantity: data })))
      .catch(({ message }) => MessageService.warn(message));
  },

  createOrder: (userId: number) => {
    set(() => ({ loading: true }));
    BasketServices.createOrder(userId)
      .then(() => {
        MessageService.success();
        set(() => ({ updateNeeded: true, updateQuantity: true }));
      })
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ loading: false })));
  },

  getHistory: () => {
    set(() => ({ loading: true }));
    BasketServices.getOrderHistory()
      .then(({ data }) => set(() => ({ historyData: data })))
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ loading: false })));
  },
}));
