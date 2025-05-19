import React from 'react';

import { Card, ConfigProvider } from 'antd';
import ru_RU from 'antd/es/locale/ru_RU';

import { Catalog } from '../Catalog';

import { customTheme } from '@/styles/theme';

export const NotAuthCatalog = () => {
  return (
    <ConfigProvider locale={ru_RU} theme={customTheme}>
      <Card>
        <Catalog />
      </Card>
    </ConfigProvider>
  );
};
