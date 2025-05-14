import { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorText: '#c5c5c5',
    colorTextDescription: '#6c6c6c',
    colorPrimary: '#ba8626',
  },

  components: {
    Descriptions: {
      labelColor: '#6c6c6c',
    },
    Layout: {
      siderBg: '#212121',
      bodyBg: '#515151',
      footerBg: '#515151',
      //   colorText: '#c5c5c5',
    },
    Card: {
      colorBgContainer: '#212121',
      colorBorderSecondary: '#7f7f7f80',
    },
  },
};
