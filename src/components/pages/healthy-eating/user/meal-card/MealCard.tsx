import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import { a, useSpring } from '@react-spring/web';
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

  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <Card
      hoverable
      className={style.card}
      classNames={{ body: style.cardBody }}
      cover={<Avatar size={350} alt={meal.title} src={meal.image} />}
      onClick={() => flipped && setFlipped((prev) => !prev)}
    >
      <a.div style={{ opacity: opacity.to((o) => 1 - o), transform }} className={`${style.c}`}>
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
                rows: 1,
                expandable: 'collapsible',
                expanded: false,
                onExpand: () => setFlipped((prev) => !prev),
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
      </a.div>
      <a.div
        className={`${style.c}`}
        style={{
          opacity,
          transform,
          rotateY: '180deg',
        }}
      >
        <Paragraph>{meal.compound}</Paragraph>
      </a.div>
    </Card>
  );
};

export default memo(MealCard);
