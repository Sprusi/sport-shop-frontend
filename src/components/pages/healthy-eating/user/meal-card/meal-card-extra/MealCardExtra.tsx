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
      label: InterfaceLabels.ADMIN_HEALTHY_KCAL_SHORT,
      children: calories,
    },
    {
      key: '2',
      label: InterfaceLabels.HEALTHY_EATING_SQUIRRELS,
      children: `${squirrels} ${InterfaceLabels.ADMIN_HEALTHY_GRAM_SHORT}`,
    },
    {
      key: '3',
      label: InterfaceLabels.HEALTHY_EATING_FATS,
      children: `${fats} ${InterfaceLabels.ADMIN_HEALTHY_GRAM_SHORT}`,
    },
    {
      key: '4',
      label: InterfaceLabels.HEALTHY_EATING_CARBOHYDRATES,
      children: `${carbohydrates} ${InterfaceLabels.ADMIN_HEALTHY_GRAM_SHORT}`,
    },
  ];

  return <Descriptions column={4} className={style.descriptions} size={'small'} items={items} />;
};

export default memo(MealCardExtra);
