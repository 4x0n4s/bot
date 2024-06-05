import { BasicCacheFunctions } from '@lib/typings';

export default class DefaultCacheClient<V> implements BasicCacheFunctions {
    private datas = new Map<string, Map<string, string>>();

    set(
        cacheName: string,
        key: string, 
        value: string
    ): void {
        this.datas.get(cacheName)?.set(key, value);
    }

    get(cacheName: string, ...keys: string[]): array {
        let cache = this.datas.get(cacheName);
        return keys.map(key => cache?.get(key)) as array;
    }

    clear(cacheName: string): void {
        this.datas.get(cacheName)?.clear();
    }

    delete(cacheName: string, ...keys: string[]): void {
        let cache = this.datas.get(cacheName);
        for (let key of keys) cache?.delete(key);
    }
}