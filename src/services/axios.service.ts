import axios, { InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { lsget, lssave } from './local-host.service';

export const REFRESH_TOKEN = 'refresh-token';
export const AUTH_TOKEN = 'auth-token';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
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
  },
  (error) => {
    return Promise.reject(error);
  }
);

// redirect user to login if server responds 403
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error) {
      return Promise.reject(error);
    }
    if (error.response.status === 403) {
      window.location.href = '/login';
    } else {
      return Promise.reject(error);
    }
  }
);

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
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh`,
    { refreshToken: lsget(REFRESH_TOKEN) }
  );
  const { refresh_token, access_token } = response.data;
  return { refresh: refresh_token, auth: access_token };
}

export default axiosInstance;
