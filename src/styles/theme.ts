import { theme, ThemeConfig } from 'antd';

export const customTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorText: '#c5c5c5',
    colorTextDescription: '#6c6c6c',
    colorPrimary: '#ba8626',
    colorLink: '#3672c7',
  },

  components: {
    Layout: {
      siderBg: '#141414',
    },
    Menu: {
      darkItemBg: '#141414',
    },
  },
};
