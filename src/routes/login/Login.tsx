import styles from './Login.module.css';
import { MouseEvent, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import anime from 'animejs';
import {
  attemptLogin,
  handleUsernameOrPasswordIncorrect,
  saveTokens,
  userNameAndPasswordAreDefined
} from './services/Login.service';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    anime({
      targets: '#loader',
      opacity: loading ? 1 : 0,
      duration: 800,
      easing: 'easeInOutQuad'
    });
  }, [loading]);

  async function submit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setLoading(true);

    if (!userNameAndPasswordAreDefined(username, password)) {
      setLoading(false);
      return;
    }

    try {
      const response: AxiosResponse = await attemptLogin(username, password);

      const { access_token, refresh_token } = response.data;
      saveTokens(access_token, refresh_token);

      setLoading(false);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleUsernameOrPasswordIncorrect(error, setPassword, setLoading);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-16 w-[90%] md:w-[40%] md:max-w-[500px]">
      <img src="./logo.svg" className="w-[100px] h-[100px]" />
      <form className="grid grid-rows-[45px_45px_40px_20px_40px] gap-3 w-full">
        <label
          htmlFor="username"
          className="relative block overflow-hidden rounded border border-gray-400 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="peer h-8 w-full border-none rounded bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />

          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            Username
          </span>
        </label>

        <label
          htmlFor="password"
          className="relative block overflow-hidden rounded border border-gray-400 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />

          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            Password
          </span>
        </label>

        <button
          type="submit"
          className={`${styles['submit-button']} ${styles['disabled']}`}
          onClick={submit}
        >
          <span className="block rounded-sm text-md font-bold">Login</span>
        </button>

        <BounceLoader
          id="loader"
          size={40}
          color="#d4d4d4"
          className="opacity-0 justify-self-center row-start-5"
        />
      </form>
    </div>
  );
}
