import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { lssave } from "../../../services/local-host.service";
import { AUTH_TOKEN, REFRESH_TOKEN } from "../../../services/axios-interceptor.service";

export function userNameAndPasswordAreDefined(username: string, password: string): boolean {
    if (!username || !password) {
        toast.dismiss();
        toast.error('Username & Password required');
        return false;
    }
    return true;
}

export function handleUsernameOrPasswordIncorrect(error: AxiosError, setPassword: (password: string) => void, setLoading: (loading: boolean) => void) {
    if (error.status === 401) {
        setPassword('');
        toast.error('Username or Password incorrect');
        setLoading(false);
    }
}

export function saveTokens(accessToken: string, refreshToken: string): void {
    lssave(REFRESH_TOKEN, refreshToken);
    lssave(AUTH_TOKEN, accessToken);
}

export async function attemptLogin(username: string, password: string): Promise<AxiosResponse> {
    return await axios.get(
        `${process.env.VITE_SERVER_BASE_URL}/auth/login`,
        {
            headers: { Authorization: `Basic ${btoa(`${username}:${password}`)}` }
        }
    );
}