import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, ConfigProvider, Flex, Space, Typography } from 'antd';
import ru_RU from 'antd/es/locale/ru_RU';

import { ActionMessages, InterfaceLabels } from '@/constants';

import styles from './AnimationPage.module.scss';
import { customTheme } from '@/styles/theme';

const { Title } = Typography;

export const AnimationPage = () => {
  const navigate = useNavigate();
  return (
    <ConfigProvider locale={ru_RU} theme={customTheme}>
      <div className={styles.videoContainer}>
        <video className={styles.video} autoPlay muted loop playsInline>
          <source
            src="https://www.shutterstock.com/shutterstock/videos/3745567955/preview/stock-footage-fitness-food-slimming-vegan-diet-body-care-workout-detox-dieting-weight-loss-sporty-woman-eating.webm"
            type="video/webm"
          />
        </video>

        <div className={styles.radialOverlay}></div>

        <Flex className={styles.content} vertical justify="center" align="center" gap="large">
          <Title level={1} className={styles.contentTitle}>
            {InterfaceLabels.MAIN_PAGE_TITLE}
          </Title>
          <Space>
            <Button
              type="primary"
              className={styles.contentButton}
              size="large"
              onClick={() => navigate('healthy-eating')}
            >
              {InterfaceLabels.MAIN_PAGE_CATALOG}
            </Button>
            <Button type="primary" className={styles.contentButton} size="large">
              {ActionMessages.MAIN_PAGE_ORDER}
            </Button>
          </Space>
        </Flex>
      </div>
    </ConfigProvider>
  );
};
