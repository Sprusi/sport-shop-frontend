import React, { useEffect } from 'react';

import { Card, Divider, List, Typography } from 'antd';

import { InterfaceLabels } from '@/constants';

import { Trail } from '../animation/Trail';
import { BasketDrawerItem } from '../basket-drawer/basket-drawer-item/BasketDrawerItem';

import style from './OrderHystory.module.scss';
import { useBasketDrawerStore } from '@/stores/basket/useBasketDrawerStore';

const { Title } = Typography;

export const OrderHystory = () => {
  const { getHistory, historyData } = useBasketDrawerStore();

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={historyData}
      renderItem={({ items, id }) => {
        const summ = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
        return (
          <Card
            title={
              <Title className={style.cardTitle} level={3}>{`${InterfaceLabels.ORDER_HISTORY_NUMBER}: ${id}`}</Title>
            }
            className={style.card}
            extra={`${InterfaceLabels.SUMM}: ${summ}`}
          >
            <Trail height={200}>
              {items.map((item, index) => (
                <>
                  {index !== 0 ? <Divider /> : <></>}
                  <BasketDrawerItem key={index} item={item} />
                </>
              ))}
            </Trail>
          </Card>
        );
      }}
    />
  );
};
