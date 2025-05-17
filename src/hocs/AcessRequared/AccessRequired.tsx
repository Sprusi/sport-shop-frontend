import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { getRoles } from '@/utils/token';

import { AccessRequiredConfig } from './AccessRequired.config';
import { RolesEnum } from '@/enums/RolesEnum';

export const AccessRequired = () => {
  // const { REACT_APP_BASE_URL, POSTFIX } = process.env;
  // const currentLocation = window.location.href.replace(`${REACT_APP_BASE_URL}/${POSTFIX}/`, '');
  const currentLocation = window.location.href.replace(`http://localhost:3000/shop/`, '');
  const roles: RolesEnum[] = getRoles();
  const rolesPath: string[] = [];
  roles.forEach((el) => rolesPath.push(...AccessRequiredConfig[el]));
  const isAcess = rolesPath.includes(currentLocation);
  return !isAcess ? <Navigate to="/shop" replace /> : <Outlet />;
};
