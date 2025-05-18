import React, { useCallback, useEffect, useMemo } from 'react';

import { Button, Divider, Drawer, Flex, List, Typography } from 'antd';

import { InterfaceLabels } from '@/constants';
import { getUserId } from '@/utils/token';

import { BasketDrawerItem } from './basket-drawer-item/BasketDrawerItem';
import style from './BasketDrawer.module.scss';
import { useBasketDrawerStore } from '@/stores/basket/useBasketDrawerStore';
import { useUserHealthyEatingStore } from '@/stores/user-healthy-eating/useUserHealthyEatingStore';

const { Text } = Typography;

export const BasketDrawer = () => {
  const userId = getUserId();
  const { open, setOpen, getData, updateNeeded, data, getAllQuantity, updateQuantity, createOrder } =
    useBasketDrawerStore();
  const { setUpdateNeeded: setUpdateUserData } = useUserHealthyEatingStore();
  useEffect(() => {
    updateNeeded && getData();
  }, [updateNeeded]);

  useEffect(() => {
    updateQuantity && getAllQuantity();
  }, [updateQuantity]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setUpdateUserData(true);
  }, []);

  const summ = useMemo(() => data.reduce((acc, { price, quantity }) => acc + price * quantity, 0), [data]);

  return (
    <Drawer
      destroyOnHidden
      title={InterfaceLabels.BASKET}
      closable={{ 'aria-label': 'Close Button' }}
      onClose={handleClose}
      open={open}
      size="large"
      classNames={{ mask: style.body }}
    >
      <Flex vertical justify="space-between" className={style.wrapper}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) => <BasketDrawerItem item={item} />}
        />
        <Flex vertical align="end">
          <Divider />
          <Flex justify="space-between" className={style.footer} align="center">
            <Text>{`${InterfaceLabels.SUMM}: ${summ} ${InterfaceLabels.ADMIN_HEALTHY_RUB}`}</Text>
            <Button type="primary" onClick={() => createOrder(userId)} disabled={!data.length}>
              {InterfaceLabels.BASKET_ORDER_BUTTON}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Drawer>
  );
};
