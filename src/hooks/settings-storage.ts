import Storage from 'expo-sqlite/kv-store';

export const readSetting = (key: string): string | null => Storage.getItemSync(key);
export const writeSetting = (key: string, value: string) => Storage.setItemSync(key, value);
