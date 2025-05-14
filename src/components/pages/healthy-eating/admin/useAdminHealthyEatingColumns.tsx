import { useMemo } from 'react';

import { Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { InterfaceLabels } from '@/constants';

import { Actions } from './AdminHealthyEatingRender/Actions';
import { HealthyEatingTable } from '@/dto';

const { Link } = Typography;

export const useAdminHealthyEatingColumns = (): ColumnsType<HealthyEatingTable> =>
  useMemo(
    () => [
      {
        key: 'id',
        dataIndex: 'id',
        title: InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.id,
        align: 'center',
        render: (value) => <Actions id={value} />,
      },
      {
        key: 'title',
        dataIndex: 'title',
        title: InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.title,
      },
      {
        key: 'compound',
        dataIndex: 'compound',
        title: InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.compound,
      },
      {
        key: 'kcal',
        dataIndex: 'kcal',
        align: 'center',
        title: InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.kcal,
        sorter: (a, b) => a.kcal - b.kcal,
      },
      {
        key: 'squirrels',
        dataIndex: 'squirrels',
        align: 'center',
        title: InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.squirrels,
        sorter: (a, b) => a.squirrels - b.squirrels,
      },
      {
        key: 'fats',
        dataIndex: 'fats',
        align: 'center',
        title: InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.fats,
        sorter: (a, b) => a.fats - b.fats,
      },
      {
        key: 'carbohydrates',
        dataIndex: 'carbohydrates',
        align: 'center',
        title: InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.carbohydrates,
        sorter: (a, b) => a.carbohydrates - b.carbohydrates,
      },
      {
        key: 'price',
        dataIndex: 'price',
        align: 'center',
        title: InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.price,
        sorter: (a, b) => a.price - b.price,
      },
      {
        key: 'image',
        dataIndex: 'image',
        title: InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.image,
        render: (value) => <Link href={value}>{value}</Link>,
      },
    ],
    []
  );
