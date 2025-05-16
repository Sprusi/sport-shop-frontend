import { create } from 'zustand';

import { HealthyEatingTable } from '@/dto';
import { HealthyEatingServices } from '@/services/HealthyEatingServices';
import { MessageService } from '@/services/MessageService';

type Store = {
  open: boolean;
  setOpen: (b: boolean) => void;
  loading: boolean;
  data?: HealthyEatingTable;
  getData: () => void;
  onOk: (data: FormData) => void;
  id?: number;
  setId: (id?: number) => void;
};

export const useAdminHealthyEatingModalStore = create<Store>()((set, get) => ({
  id: undefined,
  open: false,
  loading: false,
  data: undefined,

  setId: (id?: number) => set(() => ({ id })),

  setOpen: (open: boolean) => set(() => ({ open })),

  getData: () => {
    const { id } = get();
    if (!id) return;

    set(() => ({ loading: true }));
    HealthyEatingServices.getHealthyEatingById(id)
      .then(({ data }) => set(() => ({ data })))
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ loading: false })));
  },

  onOk: (data: FormData) => {
    const { id } = get();

    const request = id
      ? HealthyEatingServices.patchHealthyEatingById(id, data)
      : HealthyEatingServices.createHealthyEating(data);

    set(() => ({ loading: true }));
    request
      .then(() => {
        MessageService.success();
        set(() => ({ open: false }));
      })
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => set(() => ({ loading: false })));
  },
}));
