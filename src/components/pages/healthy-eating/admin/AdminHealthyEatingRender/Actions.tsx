import React, { FC } from 'react';

import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Popconfirm, Space } from 'antd';

import { ActionMessages } from '@/constants';

import { useAdminHealthyEatingStore } from '@/stores/useAdminHealthyEatingStore';

interface ActionsProps {
  id: number;
}

export const Actions: FC<ActionsProps> = ({ id }) => {
  const { deleteItem } = useAdminHealthyEatingStore();
  return (
    <Space>
      <EditFilled />
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
