import React, { FC, useCallback, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Card, ConfigProvider, Layout, Menu } from 'antd';
import ru_RU from 'antd/es/locale/ru_RU';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import dayjs from 'dayjs';
import { MenuInfo } from 'rc-menu/lib/interface';

import { InterfaceLabels } from '@/constants';
import { getRoles } from '@/utils/token';

import style from './BaseLayout.module.scss';
import { RolesEnum } from '@/enums/RolesEnum';
import { useMenuKeyStore } from '@/stores/useMenuKeyStore';
import { customTheme } from '@/styles/theme';

// import { flmsTheme } from '@/styles/theme';

const { Content, Sider, Footer } = Layout;

dayjs.locale('ru');

export const BaseLayout: FC = () => {
  const roles: RolesEnum[] = getRoles();
  const currentLocation = useLocation();
  // const clearPathName = currentLocation.pathname.replace(`/${process.env.POSTFIX}/`, '');
  const clearPathName = currentLocation.pathname.replace(`/shop/`, '');

  const navigate = useNavigate();
  const { menuKey, setMenuKey } = useMenuKeyStore();
  const handleMenuKeyChange = useCallback(({ key }: MenuInfo) => {
    navigate(key);
    setMenuKey(key);
  }, []);

  useEffect(() => setMenuKey(clearPathName), [clearPathName]);

  const menuItems: ItemType<MenuItemType>[] = [];

  roles.includes(RolesEnum.MANAGER) &&
    menuItems.push({
      key: 'admin-healthy-eating',
      label: InterfaceLabels.ADMIN_HEALTHY_EATING_TITLE,
    });

  roles.includes(RolesEnum.USER) &&
    menuItems.push({
      key: 'healthy-eating',
      label: InterfaceLabels.HEALTHY_EATING_FOR_YOU,
    });
  roles.includes(RolesEnum.USER) &&
    menuItems.push({
      key: 'order-history',
      label: InterfaceLabels.ORDER_HISTORY,
    });
  roles.includes(RolesEnum.MANAGER) &&
    menuItems.push({
      key: 'admin-orders',
      label: InterfaceLabels.MAIN_PAGE_ORDERS,
    });
  roles.includes(RolesEnum.USER) &&
    menuItems.push({
      key: 'user-catalog',
      label: InterfaceLabels.MAIN_PAGE_CATALOG,
    });

  return (
    <ConfigProvider locale={ru_RU} theme={customTheme}>
      <Layout id="main-view" className={style.layout}>
        <Sider trigger={null}>
          <div className="demo-logo-vertical" />
          <Menu onClick={handleMenuKeyChange} theme="dark" mode="inline" selectedKeys={[menuKey]} items={menuItems} />
        </Sider>
        <Layout>
          <Content className={style.layoutContent}>
            <Card className={style.layoutContentCard}>
              <Outlet />
            </Card>
          </Content>
          <Footer style={{ textAlign: 'center' }}>{`Footer`}</Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
