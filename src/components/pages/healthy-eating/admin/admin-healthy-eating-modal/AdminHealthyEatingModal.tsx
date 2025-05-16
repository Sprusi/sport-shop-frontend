import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Space, Upload, UploadProps } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { ActionMessages, InterfaceLabels } from '@/constants';

import { HealthyEatingTable } from '@/dto';
import { MessageService } from '@/services/MessageService';
import { useAdminHealthyEatingModalStore } from '@/stores/admin-healthy-eating/useAdminHealthyEatingModalStore';
import { useAdminHealthyEatingStore } from '@/stores/admin-healthy-eating/useAdminHealthyEatingStore';

const { Item } = Form;
const { TextArea } = Input;

export const AdminHealthyEatingModal = () => {
  const [form] = useForm<HealthyEatingTable>();
  const { open, setOpen, onOk, getData, id, setId, data } = useAdminHealthyEatingModalStore();
  const { setUpdateNeeded } = useAdminHealthyEatingStore();
  const [blob, setBlob] = useState<Blob>();

  useEffect(() => {
    if (!id) return;
    getData();
  }, [id]);
  useEffect(() => {
    if (!id || !data) return;
    form.setFieldsValue(data);
  }, [data]);
  const title = useMemo(() => (id ? ActionMessages.EDIT : ActionMessages.CREATE_USER), [id]);

  const handleCancel = useCallback(() => {
    setOpen(false);
    setId(undefined);
    form.resetFields();
  }, []);

  const handleOk = useCallback(
    () =>
      form
        .validateFields()
        .then((values) => {
          const formData = new FormData();
          console.log('values', values);
          Object.entries(values).map(([key, value]) =>
            key === 'image' ? formData.append(key, blob as Blob) : formData.append(key, value)
          );
          onOk(formData);
          form.resetFields();
          setId(undefined);
        })
        .then(() => setUpdateNeeded(true))
        .catch(() => MessageService.error()),
    [blob]
  );

  const props: UploadProps = {
    beforeUpload: (file) => {
      const imageBlob = new Blob([file], { type: 'image/jpeg' });
      setBlob(imageBlob);
      return false;
    },
    onRemove: () => setBlob(undefined),
  };

  return (
    <Modal open={open} onCancel={handleCancel} onOk={handleOk} centered title={title}>
      <Form form={form} layout="vertical">
        <Item name="title" label={InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.title}>
          <Input />
        </Item>
        <Item name="compound" label={InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.compound}>
          <TextArea />
        </Item>
        <Space>
          <Item name="kcal" label={InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.kcal}>
            <InputNumber addonAfter={InterfaceLabels.ADMIN_HEALTHY_KCAL_SHORT} />
          </Item>
          <Item name="squirrels" label={InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.squirrels}>
            <InputNumber addonAfter={InterfaceLabels.ADMIN_HEALTHY_GRAM_SHORT} />
          </Item>
          <Item name="fats" label={InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.fats}>
            <InputNumber addonAfter={InterfaceLabels.ADMIN_HEALTHY_GRAM_SHORT} />
          </Item>
          <Item name="carbohydrates" label={InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.carbohydrates}>
            <InputNumber addonAfter={InterfaceLabels.ADMIN_HEALTHY_GRAM_SHORT} />
          </Item>
        </Space>
        <Item name="price" label={InterfaceLabels.ADMIN_HEALTHY_EATING_TABLE_COLUMNS.price}>
          <InputNumber addonAfter={InterfaceLabels.ADMIN_HEALTHY_RUB} />
        </Item>
        <Item name="image">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>{ActionMessages.UPLOAD_BUTTON}</Button>
          </Upload>
        </Item>
      </Form>
    </Modal>
  );
};
