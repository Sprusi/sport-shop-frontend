import axios, { AxiosError } from 'axios';

import { ActionMessages } from '@/constants';

import { MessageService } from './MessageService';

const PREFIX = window.location.origin;
const TOKEN_KEY = `${PREFIX}_tokenUL`;

export function getBaseUrl(): string {
  return process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
}

export const instance = axios.create({ baseURL: getBaseUrl() });

instance.interceptors.request.use((config) => {
  const item = localStorage.getItem(TOKEN_KEY);
  const {
    token: { accessToken },
  } = item ? JSON.parse(item) : null;
  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

const handleError = async (error: AxiosError) => {
  const { config, response } = error;
  const status = response?.status;

  const isRetry = (config as any)._retry;
  console.log('isRetry', isRetry);
  switch (status) {
    case 400:
      MessageService.error(ActionMessages.REQUEST_ERROR + ': ' + JSON.stringify(response?.data, null, 2), error);
      break;
    case 401:
      // if (!isRetry) {
      //   (config as any)._retry = true;
      //   try {
      //     const refreshToken = localStorageAuth.getCurrentToken()?.token?.refreshToken;
      //     const rs = await AuthService.refreshToken(refreshToken);
      //     localStorageAuth.setCurrentToken(rs.data);
      //     return instance(config as AxiosRequestConfig);
      //   } catch (refreshError) {
      //     MessageService.error(ActionMessages.INACTIVE_SESSION, refreshError as Error);
      //     setTimeout(() => AuthService.logout(), 500);
      //   }
      // } else {
      //   MessageService.error(ActionMessages.INACTIVE_SESSION, error);
      //   setTimeout(() => AuthService.logout(), 500);
      // }
      MessageService.error(ActionMessages.ACCESS_DENIED, error);
      break;
    case 403:
      MessageService.error(ActionMessages.ACCESS_DENIED, error);
      // TODO: Навигейт на 403 экран
      // window.location.replace(errorPath(error.response.status));
      window.location.replace('/gym');
      break;
    case 404:
      MessageService.error(ActionMessages.PAGE_NOT_FOUND, error);
      break;
    case 500:
    case 501:
    case 502:
    case 503:
      MessageService.error(ActionMessages.NO_CONNECTION_TO_SERVER, error);
      break;
    default:
      MessageService.error(ActionMessages.ERR_DEFAULT, error);
  }

  return Promise.reject(error);
};

instance.interceptors.response.use((res) => res, handleError);

export default instance;
