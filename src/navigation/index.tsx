import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AnimationPage } from '@/components/pages/animation/AnimationPage';
import { AdminHealthyEating } from '@/components/pages/healthy-eating/admin/AdminHealthyEating';
import { UserHealthyEating } from '@/components/pages/healthy-eating/user/UserHealthyEating';

import '../index.css';

import { AccessRequired } from '@/hocs/AcessRequared/AccessRequired';
import { BaseLayout } from '@/layout/BaseLayout';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<AnimationPage />} />
        <Route element={<BaseLayout />}>
          <Route element={<AccessRequired />}>
            <Route path="healthy-eating" element={<UserHealthyEating />} />
            <Route path="admin-healthy-eating" element={<AdminHealthyEating />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Navigation;
