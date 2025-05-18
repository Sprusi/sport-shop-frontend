import React, { FC, useEffect, useState } from 'react';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Space } from 'antd';

import { Quantity } from '../../Quantity';

import { useBasketDrawerStore } from '@/stores/basket/useBasketDrawerStore';

interface BasketDrawerCounterProps {
  id: number;
  quantity: number;
  setisBasketQuantity?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BasketDrawerCounter: FC<BasketDrawerCounterProps> = ({ id, quantity, setisBasketQuantity }) => {
  const { changeQuantity } = useBasketDrawerStore();

  const [localQuantity, setLocalQuantity] = useState(quantity || 1);
  const handleQuantityChange = (id: number, type: 'dec' | 'inc') => {
    const delta = type === 'dec' ? -1 : 1;
    changeQuantity(id, type);
    setLocalQuantity((prev) => prev + delta);
  };

  useEffect(() => {
    localQuantity === 0 && setisBasketQuantity?.(false);
  }, [localQuantity]);

  return (
    <Space align="center">
      <MinusOutlined onClick={() => handleQuantityChange(id, 'dec')} />
      <Quantity quantity={localQuantity} />
      <PlusOutlined onClick={() => handleQuantityChange(id, 'inc')} />
    </Space>
  );
};
