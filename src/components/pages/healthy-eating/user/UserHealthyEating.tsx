import React, { useEffect, useState } from 'react';

import { Card, Carousel, Flex, Typography } from 'antd';

import { InterfaceLabels } from '@/constants';

import MealCardExtra from './meal-card/meal-card-extra/MealCardExtra';
import MealCard from './meal-card/MealCard';
import { MealPlanResponseDto } from '@/dto';
import { EatingType } from '@/enums/EatingType';
import { HealthyEatingServices } from '@/services/HealthyEatingServices';

const { Title } = Typography;

export const UserHealthyEating = () => {
  const [data, setData] = useState<MealPlanResponseDto[]>([]);
  useEffect(() => {
    HealthyEatingServices.getHealthyEatingForUser(1).then(({ data }) => setData(data));
  }, []);
  return (
    <Flex vertical>
      <Card title={<Title level={3}>{InterfaceLabels.HEALTHY_EATING_FOR_YOU}</Title>}>
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
      </Card>
    </Flex>
  );
};
