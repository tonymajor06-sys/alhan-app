// expo-sqlite needs extra wasm setup on web, so the browser uses localStorage instead
export const readSetting = (key: string): string | null => globalThis.localStorage?.getItem(key) ?? null;
export const writeSetting = (key: string, value: string) => globalThis.localStorage?.setItem(key, value);
