import { getApi } from './browser';
import { Runtime } from './packages/compat';
import { getCurrentTab, extractTabData } from './packages/data/tab';

function load() {
  getCurrentTab()
    .then((tab) => extractTabData(tab))
    .then(console.log);
}

export function onInstalled(
  func: (details: Runtime.OnInstalledDetailsType) => void
): void {
  const apiWrapper = getApi();
  apiWrapper.runtime.onInstalled.addListener(func);
}

onInstalled(load);
