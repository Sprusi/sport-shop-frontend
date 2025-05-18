import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import { Avatar, Button, Card, Flex, Typography } from 'antd';

import { BasketDrawerCounter } from '@/components/pages/basket-drawer/basket-drawer-item/basket-drawer-counter/BasketDrawerCounter';

import { InterfaceLabels } from '@/constants';

import style from './MealCard.module.scss';
import { MealInfoDto } from '@/dto';
import { EatingType } from '@/enums/EatingType';
import { useBasketDrawerStore } from '@/stores/basket/useBasketDrawerStore';
import { useUserHealthyEatingStore } from '@/stores/user-healthy-eating/useUserHealthyEatingStore';

const { Meta } = Card;
interface MealCardProps {
  meal: MealInfoDto;
  type: EatingType;
}

const { Text, Paragraph } = Typography;

const MealCard: FC<MealCardProps> = ({ meal, type }) => {
  const { addItemToBasket, isItemAdded } = useUserHealthyEatingStore();
  const { setUpdateNeeded, setUpdateQuantity } = useBasketDrawerStore();
  const [isBasketQuantity, setisBasketQuantity] = useState(!!meal.inBasketQuantity);
  useEffect(() => {
    if (!isItemAdded) return;
    setUpdateNeeded(true);
    setUpdateQuantity(true);
  }, [isItemAdded]);

  const handleAddItemToBasket = useCallback(() => {
    addItemToBasket(meal.id);
    setisBasketQuantity(!meal.inBasketQuantity);
  }, [meal.id]);

  return (
    <Card hoverable className={style.card} cover={<Avatar size={350} alt={meal.title} src={meal.image} />}>
      <Meta title={meal.title} description={type} />
      <Flex vertical gap="small" justify="space-between" style={{ height: '100%' }}>
        <Flex gap="small" align="center">
          <Text underline>{`${InterfaceLabels.HEALTHY_EATING_CALORIES}:`}</Text>
          {meal.calories}
        </Flex>
        <Flex vertical>
          <Text underline>{`${InterfaceLabels.HEALTHY_EATING_COMPOUND}:`}</Text>
          <Paragraph
            ellipsis={{
              rows: 2,
              expandable: 'collapsible',
              expanded: false,
              onExpand: () => console.log('navigate'),
            }}
            style={{ height: 50 }}
          >
            {meal.compound}
          </Paragraph>
        </Flex>

        <Flex justify="end" align="center" gap="small">
          {isBasketQuantity ? (
            <BasketDrawerCounter
              id={meal.id}
              quantity={meal.inBasketQuantity}
              setisBasketQuantity={setisBasketQuantity}
            />
          ) : (
            <Button
              type="primary"
              onClick={() => handleAddItemToBasket()}
            >{`${InterfaceLabels.HEALTHY_EATING_PRICE}: ${meal.price} ₽`}</Button>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

export default memo(MealCard);
