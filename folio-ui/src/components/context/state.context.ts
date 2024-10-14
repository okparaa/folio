import { Signal, signal } from "@preact/signals";
import { useCallback } from "preact/hooks";

const store: Record<string, Signal> = {};

export const Store = (initialValues: Record<string, unknown>): void => {
  Object.entries(initialValues).forEach(([key, value]) => {
    store[key] = signal(value);
  });
};

export const useGlobalSignal = <T>(
  key: string,
  defaultValue?: T
): Signal<T> => {
  store[key] = store[key] ?? signal(defaultValue);
  return store[key];
};

export const useXState = <T>(key: string, value: T): [T, (k: any) => void] => {
  const signal = useGlobalSignal(key, value);

  const set = useCallback(
    (v: T | ((k: T) => any)) => {
      const newValue = v instanceof Function ? v(signal.value) : (v as T);
      signal.value = newValue;
    },
    [signal]
  );
  return [store[key].value, set];
};
