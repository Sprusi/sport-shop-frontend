import React, { useEffect } from 'react';

import { DeleteFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Drawer, List, Typography } from 'antd';

import { InterfaceLabels } from '@/constants';

import MealCardExtra from '../healthy-eating/user/meal-card/meal-card-extra/MealCardExtra';

import style from './BasketDrawer.module.scss';
import { Quantity } from './Quantity';
import { useBasketDrawerStore } from '@/stores/basket/useBasketDrawerStore';

const { Item } = List;
const { Link } = Typography;

export const BasketDrawer = () => {
  const { open, setOpen, getData, updateNeeded, data, removeItem } = useBasketDrawerStore();

  useEffect(() => {
    updateNeeded && getData();
  }, [updateNeeded]);

  return (
    <Drawer
      destroyOnHidden
      title={InterfaceLabels.BASKET}
      closable={{ 'aria-label': 'Close Button' }}
      onClose={() => setOpen(false)}
      open={open}
      size="large"
    >
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <Item
            key={item.id}
            actions={[
              <MinusOutlined key={4} />,
              <Quantity key={3} quantity={item.quantity} />,
              <PlusOutlined key={2} />,
              <DeleteFilled key={1} className={style.delete} onClick={() => removeItem(item.id)} />,
            ]}
            extra={<Avatar shape="square" size={150} src={item.image} />}
          >
            <Item.Meta
              title={<Link>{item.title}</Link>}
              description={<MealCardExtra total={{ ...item.nutrients, calories: item.calories }} />}
            />
          </Item>
        )}
      />
    </Drawer>
  );
};
