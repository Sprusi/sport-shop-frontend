import React from 'react';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

import style from './UserHealthyEating.module.scss';
import { useBasketDrawerStore } from '@/stores/basket/useBasketDrawerStore';

export const BasketButton = () => {
  const { setOpen, quantity } = useBasketDrawerStore();
  return (
    <FloatButton
      onClick={() => setOpen(true)}
      className={style.floatButton}
      badge={{ count: quantity }}
      icon={<ShoppingCartOutlined className={style.floatButtonIcon} />}
    />
  );
};
