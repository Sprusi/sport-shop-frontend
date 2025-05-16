import React, { FC, useCallback } from 'react';

import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Popconfirm, Space } from 'antd';

import { ActionMessages } from '@/constants';

import { useAdminHealthyEatingModalStore } from '@/stores/admin-healthy-eating/useAdminHealthyEatingModalStore';
import { useAdminHealthyEatingStore } from '@/stores/admin-healthy-eating/useAdminHealthyEatingStore';

interface ActionsProps {
  id: number;
}

export const Actions: FC<ActionsProps> = ({ id }) => {
  const { deleteItem } = useAdminHealthyEatingStore();
  const { setId, setOpen } = useAdminHealthyEatingModalStore();

  const handleEdit = useCallback(() => {
    setOpen(true);
    setId(id);
  }, [id]);

  return (
    <Space>
      <EditFilled onClick={handleEdit} />
      <Popconfirm
        style={{ backgroundColor: '#000' }}
        title={ActionMessages.DELETE_MESSAGE}
        okText={ActionMessages.DELETE}
        onConfirm={() => deleteItem(id)}
      >
        <DeleteFilled />
      </Popconfirm>
    </Space>
  );
};
