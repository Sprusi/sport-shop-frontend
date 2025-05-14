import React, { FC, memo } from 'react';

import { Descriptions, DescriptionsProps } from 'antd';

import { InterfaceLabels } from '@/constants';

import style from './MealCardExtra.module.scss';
import { MealTotalsDto } from '@/dto';

interface MealCardExtraProps {
  total: MealTotalsDto;
}

const MealCardExtra: FC<MealCardExtraProps> = ({ total }) => {
  const { calories, squirrels, fats, carbohydrates } = total || {};
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: InterfaceLabels.HEALTHY_EATING_CALORIES,
      children: calories,
    },
    {
      key: '1',
      label: InterfaceLabels.HEALTHY_EATING_SQUIRRELS,
      children: squirrels,
    },
    {
      key: '1',
      label: InterfaceLabels.HEALTHY_EATING_FATS,
      children: fats,
    },
    {
      key: '1',
      label: InterfaceLabels.HEALTHY_EATING_CARBOHYDRATES,
      children: carbohydrates,
    },
  ];

  return <Descriptions column={4} className={style.descriptions} size={'small'} items={items} />;
};

export default memo(MealCardExtra);
