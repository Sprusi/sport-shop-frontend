import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Card, ConfigProvider, Layout, Menu } from 'antd';
import ru_RU from 'antd/es/locale/ru_RU';
import dayjs from 'dayjs';

import style from './BaseLayout.module.scss';
import { theme } from '@/styles/theme';

// import { flmsTheme } from '@/styles/theme';

const { Content, Sider, Footer } = Layout;

dayjs.locale('ru');

export const BaseLayout: FC = () => {
  return (
    <ConfigProvider locale={ru_RU} theme={theme}>
      <Layout id="main-view" className={style.layout}>
        <Sider trigger={null}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                // icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                // icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                // icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
          />
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
