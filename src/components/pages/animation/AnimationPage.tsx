import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, ConfigProvider, Flex, Typography } from 'antd';
import ru_RU from 'antd/es/locale/ru_RU';

import { InterfaceLabels } from '@/constants';
import { getToken } from '@/utils/token';

import styles from './AnimationPage.module.scss';
import { Trail } from './Trail';
import { customTheme } from '@/styles/theme';

const { Title } = Typography;

export const AnimationPage = () => {
  const navigate = useNavigate();
  const { token } = getToken();
  const navigatePath = token ? 'healthy-eating' : 'catalog';
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
          <Trail>
            <Title level={1} className={styles.contentTitle}>
              {InterfaceLabels.MAIN_PAGE_TITLE_FIRST}
            </Title>
            <Title level={1} className={styles.contentTitle}>
              {InterfaceLabels.MAIN_PAGE_TITLE_SECOND}
            </Title>
            <Title level={1} className={styles.contentTitle}>
              {InterfaceLabels.MAIN_PAGE_TITLE_THERD}
            </Title>
            <Flex justify="end">
              <Button
                type="primary"
                className={styles.contentButton}
                size="large"
                onClick={() => navigate(navigatePath)}
              >
                {InterfaceLabels.MAIN_PAGE_CATALOG}
              </Button>
            </Flex>
          </Trail>
        </Flex>
      </div>
    </ConfigProvider>
  );
};
