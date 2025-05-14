import React, { FC, memo } from 'react';

import { Avatar, Button, Card, Flex, Typography } from 'antd';

import { InterfaceLabels } from '@/constants';

import style from './MealCard.module.scss';
import { MealInfoDto } from '@/dto';
import { EatingType } from '@/enums/EatingType';

const { Meta } = Card;
interface MealCardProps {
  meal: MealInfoDto;
  type: EatingType;
}

const { Text, Paragraph } = Typography;

const MealCard: FC<MealCardProps> = ({ meal, type }) => {
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
          <Button type="primary">{`${InterfaceLabels.HEALTHY_EATING_PRICE}: ${meal.price} ₽`}</Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default memo(MealCard);
