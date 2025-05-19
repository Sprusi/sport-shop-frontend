import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AnimationPage } from '@/components/pages/animation/AnimationPage';
import { Catalog } from '@/components/pages/catalog/Catalog';
import { NotAuthCatalog } from '@/components/pages/catalog/not-auth-catalog/NotAuthCatalog';
import { AdminHealthyEating } from '@/components/pages/healthy-eating/admin/AdminHealthyEating';
import { UserHealthyEating } from '@/components/pages/healthy-eating/user/UserHealthyEating';
import { OrderHystory } from '@/components/pages/order-history/OrderHystory';

import '../index.css';

import { AccessRequired } from '@/hocs/AcessRequared/AccessRequired';
import { BaseLayout } from '@/layout/BaseLayout';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<AnimationPage />} />
        <Route path="catalog" element={<NotAuthCatalog />} />

        <Route element={<BaseLayout />}>
          <Route element={<AccessRequired />}>
            <Route path="healthy-eating" element={<UserHealthyEating />} />
            <Route path="admin-healthy-eating" element={<AdminHealthyEating />} />
            <Route path="order-history" element={<OrderHystory />} />
            <Route path="admin-orders" element={<OrderHystory />} />
            <Route path="user-catalog" element={<Catalog />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Navigation;
