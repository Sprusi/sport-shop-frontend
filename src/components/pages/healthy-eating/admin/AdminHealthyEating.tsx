import React, { useEffect } from 'react';

import { Button, Card, Table, Typography } from 'antd';

import { ActionMessages, InterfaceLabels } from '@/constants';

import { useAdminHealthyEatingColumns } from './useAdminHealthyEatingColumns';
import { useAdminHealthyEatingStore } from '@/stores/useAdminHealthyEatingStore';

const { Title } = Typography;
export const AdminHealthyEating = () => {
  const columns = useAdminHealthyEatingColumns();
  const { data, loading, getData, updateNeeded } = useAdminHealthyEatingStore();
  useEffect(() => {
    updateNeeded && getData();
  }, [updateNeeded]);
  return (
    <Card
      title={<Title level={3}>{InterfaceLabels.ADMIN_HEALTHY_EATING_TITLE}</Title>}
      extra={<Button type="primary">{ActionMessages.CREATE}</Button>}
    >
      <Table key="id" columns={columns} loading={loading} dataSource={data} />
    </Card>
  );
};
