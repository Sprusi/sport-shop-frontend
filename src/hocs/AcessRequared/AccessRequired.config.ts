import { RolesEnum } from '@/enums/RolesEnum';

export const AccessRequiredConfig: Record<RolesEnum, string[]> = {
  MANAGER: ['admin-healthy-eating'],
  USER: ['healthy-eating'],
  TRAINER: [],
};
