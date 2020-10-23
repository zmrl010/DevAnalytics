export interface MutableRef<T> {
  current: T | null;
}

export function createRef<T = unknown>(value?: T): MutableRef<T> {
  const refObj = {
    current: value ?? null,
  };

  Object.seal(refObj);

  return refObj;
}
