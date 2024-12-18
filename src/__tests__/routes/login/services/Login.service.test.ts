import axios, { AxiosError } from 'axios';
import {
  attemptLogin,
  handleUsernameOrPasswordIncorrect,
  saveTokens,
  userNameAndPasswordAreDefined
} from '../../../../routes/login/services/Login.service';
import { toast } from 'react-hot-toast';
import * as localhostService from '../../../../services/local-host.service';
import { AUTH_TOKEN, REFRESH_TOKEN } from '../../../../services/axios.service';

jest.mock('../../../../services/local-host.service', () => ({
  lssave: jest.fn()
}));

describe('login service', () => {
  describe('user name and password are defined', () => {
    it('should return false if username is not defined', () => {
      expect(userNameAndPasswordAreDefined('', 'password')).toBe(false);
    });
    it('should return false if password is not defined', () => {
      expect(userNameAndPasswordAreDefined('username', '')).toBe(false);
    });
    it('should return false if password and username are not defined', () => {
      expect(userNameAndPasswordAreDefined('', '')).toBe(false);
    });

    it('should dismiss toast and generate error if returning false', () => {
      toast.dismiss = jest.fn();
      toast.error = jest.fn();

      userNameAndPasswordAreDefined('', '');

      expect(toast.dismiss).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith('Username & Password required');
    });

    it('should return true if username and password are defined', () => {
      expect(userNameAndPasswordAreDefined('username', 'password')).toBe(true);
    });
  });

  describe('handle username or password incorrect', () => {
    it('should do nothing if error status is not 401', () => {
      const setPassword = jest.fn();
      const setLoading = jest.fn();
      toast.error = jest.fn();
      const error = { status: 123 } as AxiosError;

      handleUsernameOrPasswordIncorrect(error, setPassword, setLoading);

      expect(setPassword).not.toHaveBeenCalled();
      expect(setLoading).not.toHaveBeenCalled();
      expect(toast.error).not.toHaveBeenCalled();
    });

    it('should reset password, request error toast & set loading to false if error status is 401', () => {
      const setPassword = jest.fn();
      const setLoading = jest.fn();
      toast.error = jest.fn();
      const error = { status: 401 } as AxiosError;

      handleUsernameOrPasswordIncorrect(error, setPassword, setLoading);

      expect(setPassword).toHaveBeenCalled();
      expect(setLoading).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe('save tokens', () => {
    it('should request refresh token & access token are saved to local storage', () => {
      saveTokens('test-auth-token', 'test-refresh-token');

      expect(localhostService.lssave).toHaveBeenCalledTimes(2);
      expect(localhostService.lssave).toHaveBeenNthCalledWith(
        1,
        REFRESH_TOKEN,
        'test-refresh-token'
      );
      expect(localhostService.lssave).toHaveBeenNthCalledWith(
        2,
        AUTH_TOKEN,
        'test-auth-token'
      );
    });
  });

  describe('attempt login', () => {
    it('should make axios request to login endpoint', () => {
      const username = 'username';
      const password = 'password';

      axios.get = jest.fn();
      attemptLogin(username, password);

      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.VITE_SERVER_BASE_URL}/auth/login`,
        {
          headers: { Authorization: `Basic ${btoa(`${username}:${password}`)}` }
        }
      );
    });
  });
});
