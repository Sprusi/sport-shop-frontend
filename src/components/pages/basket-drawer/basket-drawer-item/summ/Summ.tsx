import React, { FC } from 'react';

import { Space } from 'antd';

import { InterfaceLabels } from '@/constants';

interface SunnProps {
  quantity: number;
  price: number;
}

export const Summ: FC<SunnProps> = ({ quantity, price }) => {
  return <Space>{`${InterfaceLabels.SUMM}: ${quantity * price} ${InterfaceLabels.ADMIN_HEALTHY_RUB}`}</Space>;
};
