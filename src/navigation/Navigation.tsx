import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AnimationPage } from '@/components/pages/animation/AnimationPage';
import { UserHealthyEating } from '@/components/pages/healthy-eating/user/UserHealthyEating';

import { BaseLayout } from '@/layout/BaseLayout';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/shop">
        <Route index element={<AnimationPage />} />
        <Route element={<BaseLayout />}>
          <Route path="healthy-eating" element={<UserHealthyEating />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate replace to="/shop" />} />
    </Routes>
  );
};

export default Navigation;
