import React, { useCallback, useEffect } from 'react';

import { Button, Card, Table, Typography } from 'antd';

import { ActionMessages, InterfaceLabels } from '@/constants';

import { Trail } from '../../animation/Trail';

import { AdminHealthyEatingModal } from './admin-healthy-eating-modal/AdminHealthyEatingModal';
import { useAdminHealthyEatingColumns } from './useAdminHealthyEatingColumns';
import { useAdminHealthyEatingModalStore } from '@/stores/admin-healthy-eating/useAdminHealthyEatingModalStore';
import { useAdminHealthyEatingStore } from '@/stores/admin-healthy-eating/useAdminHealthyEatingStore';

const { Title } = Typography;
export const AdminHealthyEating = () => {
  const columns = useAdminHealthyEatingColumns();
  const { data, loading, getData, updateNeeded } = useAdminHealthyEatingStore();
  const { setOpen, setId } = useAdminHealthyEatingModalStore();

  useEffect(() => {
    updateNeeded && getData();
  }, [updateNeeded]);

  const handleCreate = useCallback(() => {
    setId(undefined);
    setOpen(true);
  }, []);

  return (
    <Trail>
      <Card
        title={<Title level={3}>{InterfaceLabels.ADMIN_HEALTHY_EATING_TITLE}</Title>}
        extra={
          <Button type="primary" onClick={handleCreate}>
            {ActionMessages.CREATE}
          </Button>
        }
      >
        <Table key="id" columns={columns} loading={loading} dataSource={data} />

        <AdminHealthyEatingModal />
      </Card>
    </Trail>
  );
};
