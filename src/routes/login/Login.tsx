import { FormEvent, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  AUTH_TOKEN,
  REFRESH_TOKEN
} from '../../services/axios-interceptor.service';
import { lssave } from '../../services/local-host.service';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const navigate = useNavigate();

  async function submit(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();

    const response: AxiosResponse = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
      { headers: { Authorization: `Basic ${btoa(`${username}:${password}`)}` } }
    );
    const { access_token, refresh_token } = response.data;

    lssave(REFRESH_TOKEN, refresh_token);
    lssave(AUTH_TOKEN, access_token);

    navigate('/');
  }

  return (
    <form>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <input type="submit" value="submit" onClick={submit} />
    </form>
  );
}
