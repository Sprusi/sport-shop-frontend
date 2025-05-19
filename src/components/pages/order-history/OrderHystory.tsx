import React, { useCallback, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Flex,
  Form,
  InputNumber,
  List,
  Space,
  Switch,
  Typography,
} from 'antd';
import dayjs from 'dayjs';

import { ActionMessages, InterfaceLabels } from '@/constants';

import { Trail } from '../animation/Trail';
import { BasketDrawerItem } from '../basket-drawer/basket-drawer-item/BasketDrawerItem';

import style from './OrderHystory.module.scss';
import { QueryForAllData } from '@/dto/basket/QueryForAllData';
import { useBasketDrawerStore } from '@/stores/basket/useBasketDrawerStore';

const { Title } = Typography;
const { Item } = Form;
export const OrderHystory = () => {
  const { pathname } = useLocation();
  const isOrderHistory = pathname.split('/').includes('order-history');
  const [form] = Form.useForm<QueryForAllData>();
  const { getHistory, historyData, updateHistoryNeeded, setUpdateHistoryNeeded } = useBasketDrawerStore();
  const [checked, setChecked] = useReducer((value) => !value, false);
  useEffect(() => {
    const formData = form.getFieldsValue();
    const query = {
      ...formData,
      ...(formData.updatedDate && { updatedDate: dayjs(formData.updatedDate).format('YYYY-MM-DD') }),
    };

    updateHistoryNeeded && getHistory(query, isOrderHistory);
  }, [updateHistoryNeeded]);

  useEffect(() => {
    setUpdateHistoryNeeded(true);
  }, [isOrderHistory]);

  const handleFormFinish = useCallback(() => setUpdateHistoryNeeded(true), []);

  return (
    <Card>
      <Flex vertical gap="middle">
        <Form form={form} layout="inline" onFinish={handleFormFinish}>
          {!isOrderHistory && (
            <Item label={InterfaceLabels.ORDER_HISTORY_FILTERS.userId} name={'userId'}>
              <InputNumber min={1} />
            </Item>
          )}
          <Item label={InterfaceLabels.ORDER_HISTORY_FILTERS.basketId} name={'basketId'}>
            <InputNumber min={1} />
          </Item>
          <Item label={InterfaceLabels.ORDER_HISTORY_FILTERS.price} name={'price'}>
            <InputNumber min={0} />
          </Item>
          <Item label={InterfaceLabels.ORDER_HISTORY_FILTERS.updatedDate} name={'updatedDate'}>
            <DatePicker format={'DD.MM.YYYY'} />
          </Item>
          {!isOrderHistory && (
            <Space>
              <Checkbox checked={checked} onChange={setChecked} />
              <Item label={InterfaceLabels.ORDER_HISTORY_FILTERS.isActive} name={'isActive'}>
                <Switch
                  disabled={!checked}
                  checkedChildren={InterfaceLabels.YES}
                  unCheckedChildren={InterfaceLabels.NO}
                />
              </Item>
            </Space>
          )}
          <Item>
            <Button htmlType="submit" type="primary">
              {ActionMessages.FILTER}
            </Button>
          </Item>
        </Form>

        <List
          itemLayout="vertical"
          size="large"
          dataSource={historyData}
          renderItem={({ items, id }) => {
            const summ = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
            return (
              <Card
                title={
                  <Title
                    className={style.cardTitle}
                    level={3}
                  >{`${InterfaceLabels.ORDER_HISTORY_NUMBER}: ${id}`}</Title>
                }
                className={style.card}
                extra={
                  <Space>
                    {`${InterfaceLabels.SUMM}: ${summ}`}
                    <Button>{InterfaceLabels.ORDER_HISTORY_ADD_TO_WORK}</Button>
                  </Space>
                }
              >
                <Trail height={200}>
                  {items.map((item, index) => (
                    <>
                      {index !== 0 ? <Divider /> : <></>}
                      <BasketDrawerItem key={index} item={item} />
                    </>
                  ))}
                </Trail>
              </Card>
            );
          }}
        />
      </Flex>
    </Card>
  );
};
