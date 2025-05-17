import React, { FC } from 'react';

import { Tag } from 'antd';

import style from './Quantity.module.scss';

interface QuantityProps {
  quantity: number;
}

export const Quantity: FC<QuantityProps> = ({ quantity }) => {
  return <Tag className={style.tag}>{quantity}</Tag>;
};
