import React, { useEffect } from 'react';

import { Card, Carousel, Empty, Flex, Typography } from 'antd';

import { BasketDrawer } from '@/components/pages/basket-drawer/BasketDrawer';
import { BasketButton } from '@/components/utils/basket-button/BasketButton';

import { ActionMessages, InterfaceLabels } from '@/constants';

import { Trail } from '../../animation/Trail';

import MealCardExtra from './meal-card/meal-card-extra/MealCardExtra';
import MealCard from './meal-card/MealCard';
import { EatingType } from '@/enums/EatingType';
import { useUserHealthyEatingStore } from '@/stores/user-healthy-eating/useUserHealthyEatingStore';

const { Title, Text } = Typography;

export const UserHealthyEating = () => {
  const { data, loading, getData, updateNeeded } = useUserHealthyEatingStore();
  useEffect(() => {
    updateNeeded && getData();
  }, [updateNeeded]);

  return (
    <Flex vertical>
      <Trail>
        <Card title={<Title level={3}>{InterfaceLabels.HEALTHY_EATING_FOR_YOU}</Title>} loading={loading}>
          {data.length ? (
            <Carousel arrows>
              {data.map(({ meals: { breakfast, lunch, dinner }, totals }, index) => (
                <Card key={index} extra={<MealCardExtra total={totals} />} variant="borderless">
                  <Flex vertical={false} justify="space-around" gap="middle" wrap>
                    <MealCard meal={breakfast} type={EatingType.BREAKFAST} />
                    <MealCard meal={lunch} type={EatingType.LUNCH} />
                    <MealCard meal={dinner} type={EatingType.DINNER} />
                  </Flex>
                </Card>
              ))}
            </Carousel>
          ) : (
            <Empty description={<Text>{ActionMessages.SORRY}</Text>} />
          )}
        </Card>
      </Trail>
      <BasketButton />
      <BasketDrawer />
    </Flex>
  );
};
