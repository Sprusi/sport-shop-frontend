import { RolesEnum } from '@/enums/RolesEnum';

export const AccessRequiredConfig: Record<RolesEnum, string[]> = {
  MANAGER: ['admin-healthy-eating', 'admin-orders'],
  USER: ['healthy-eating', 'order-history'],
  TRAINER: [],
};
