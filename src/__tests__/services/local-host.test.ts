import { lsget, lssave } from '../../services/local-host.service';
import { name } from '../../../package.json';

describe('local host service', () => {
  beforeEach(() => {
    global.localStorage = new LocalStorageMock() as unknown as Storage;
  });

  it('should save item to localstorage', () => {
    const key = 'test-key';
    const value = 'test-value';

    lssave('test-key', 'test-value');
    expect(localStorage.getItem(`${name}|${key}`)).toEqual(value);
  });

  it('should fetch item from localstorage', () => {
    const key = `${name}|test-key`;
    const value = `test-value`;

    localStorage.setItem(key, value);
    expect(lsget('test-key')).toEqual(value);
  });
});

// helper class
class LocalStorageMock {
  store: { [key: string]: string };

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }
}
