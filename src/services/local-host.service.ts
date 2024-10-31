import { name } from '../../package.json';

// save to local storage
export function lssave(key: string, value: string): void {
  localStorage.setItem(`${name}|${key}`, value);
}

// fetch from local storage
export function lsget(key: string): string | null {
  return localStorage.getItem(`${name}|${key}`);
}
