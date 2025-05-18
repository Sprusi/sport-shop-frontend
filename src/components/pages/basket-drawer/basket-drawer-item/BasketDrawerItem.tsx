import React, { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { DeleteFilled } from '@ant-design/icons';
import { Avatar, List, Typography } from 'antd';

import { InterfaceLabels } from '@/constants';

import MealCardExtra from '../../healthy-eating/user/meal-card/meal-card-extra/MealCardExtra';

import { BasketDrawerCounter } from './basket-drawer-counter/BasketDrawerCounter';
import style from './BasketDrawerItem.module.scss';
import { Summ } from './summ/Summ';
import { BasketDto } from '@/dto/basket/BasketDto';
import { useBasketDrawerStore } from '@/stores/basket/useBasketDrawerStore';

interface BasketDrawerItemProps {
  item: BasketDto;
}

const { Item } = List;
const { Link, Text } = Typography;
export const BasketDrawerItem: FC<BasketDrawerItemProps> = ({ item }) => {
  const { pathname } = useLocation();
  const isOrderHistory = pathname.split('/').includes('order-history');
  const { removeItem } = useBasketDrawerStore();

  const actions = useMemo(
    () =>
      isOrderHistory
        ? [
            <Text key={1}>{`${InterfaceLabels.QUANTITY}: ${item.quantity}`}</Text>,
            <Summ key={3} quantity={item.quantity} price={item.price} />,
          ]
        : [
            <BasketDrawerCounter key={1} id={item.id} quantity={item.quantity} />,
            <DeleteFilled key={2} className={style.delete} onClick={() => removeItem(item.id)} />,
            <Summ key={3} quantity={item.quantity} price={item.price} />,
          ],
    [isOrderHistory, item]
  );

  return (
    <Item key={item.id} actions={actions} extra={<Avatar shape="square" size={150} src={item.image} />}>
      <Item.Meta
        title={<Link>{item.title}</Link>}
        description={<MealCardExtra total={{ ...item.nutrients, calories: item.calories }} />}
      />
    </Item>
  );
};
