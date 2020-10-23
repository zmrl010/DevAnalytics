type StorageItem = Record<string, unknown>

interface BrowserStore {
  get: (key: string) => Promise<StorageItem>
  set: (items: StorageItem) => Promise<void>
  clear: () => Promise<void>
}

interface Browser {
  storage: {
    local: BrowserStore
    sync: BrowserStore
  }
}

interface StorageController<T> {
  storageArea: BrowserStore

  get: () => Promise<T>
  set: (item: T) => Promise<void>
  clear: () => Promise<void>
}

export class LocalStorageController<T> implements StorageController<T> {
  #key: string
  storageArea: BrowserStore

  constructor(key: string, browser: Browser) {
    this.#key = key
    this.storageArea = browser.storage.local
  }

  async get(): Promise<T> {
    const result = await this.storageArea.get(this.#key)
    return result[this.#key] as T
  }

  set(item: T): Promise<void> {
    return this.storageArea.set({ [this.#key]: item })
  }

  clear(): Promise<void> {
    return this.storageArea.clear()
  }
}