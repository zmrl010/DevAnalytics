import { browser, Browser } from './packages/compat';
import { createRef } from './packages/ref';

const browserRef = createRef<Browser>();

export function getApi(): Browser {
  if (!browserRef.current) {
    browserRef.current = browser;
  }
  return browserRef.current;
}

export const api = getApi()

export class BrowserStore {

}