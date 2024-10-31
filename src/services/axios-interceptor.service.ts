import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { lsget, lssave } from './local-host.service';

export const REFRESH_TOKEN = 'refresh-token';
export const AUTH_TOKEN = 'auth-token';

const axiosInstance = axios.create({
  baseURL: process.env.VITE_SERVER_BASE_URL
});

axiosInstance.interceptors.request.use(requestInterceptor, (error) => {
  return Promise.reject(error);
});

// redirect user to login if server responds 403
axiosInstance.interceptors.response.use((response) => {
  return response;
}, responseInterceptor);

async function responseInterceptor(error: AxiosError) {
  if (error.response && error.response.status === 403) {
    window.location.href = '/login';
    new AbortController().abort();
    console.log('Request Cancelled: Missing Auth Header');
    return new Promise(() => {});
    // throw new axios.Cancel('Request cancelled due to missing Auth header')
  } else {
    return Promise.reject(error);
  }
}

async function requestInterceptor(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  let token = lsget(AUTH_TOKEN);

  if (tokenHasExpired(token)) {
    const { refresh, auth } = await refreshAuthToken();

    token = null;
    if (refresh && auth) {
      lssave(REFRESH_TOKEN, refresh);
      lssave(AUTH_TOKEN, auth);

      token = lsget(AUTH_TOKEN);
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers.Authorization = undefined;
  }

  return config;
}

function tokenHasExpired(token: string | null): boolean {
  if (!token) return true; // if no token, assume it's expired
  const { exp } = jwtDecode(token); // get expirary from token
  if (!exp) return true;

  return exp < Date.now() / 1000;
}

async function refreshAuthToken(): Promise<{ refresh: string; auth: string }> {
  const refreshToken = lsget(REFRESH_TOKEN);
  if (!refreshToken) {
    return { refresh: '', auth: '' };
  }
  try {
    const response = await axios.post(
      `${process.env.VITE_SERVER_BASE_URL}/auth/refresh`,
      { refreshToken: lsget(REFRESH_TOKEN) }
    );
    const { refresh_token, access_token } = response.data;
    return { refresh: refresh_token, auth: access_token };
  } catch {
    return { refresh: '', auth: '' };
  }
}

export default axiosInstance;
