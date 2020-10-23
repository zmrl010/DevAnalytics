import { api } from '../../browser';
import { Tabs } from '../compat';

type Tab = Tabs.Tab;
type Tabprop = keyof Tab;
type TabMap = Record<Tabprop, Tab[Tabprop]>;
type TabLike = Partial<TabMap>;

export function getCurrentTab(): Promise<Tab> {
  return api.tabs.getCurrent();
}

export function extractTabData(
  tab: TabLike,
  ...properties: Tabprop[]
): TabLike {
  const obj: TabLike = {};
  if (!properties.length) {
    return { ...tab };
  }
  for (const name in properties) {
    Object.defineProperty(obj, name, {
      value: tab[name as Tabprop],
    });
  }
  return obj;
}
