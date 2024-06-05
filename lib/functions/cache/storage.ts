import { APIGuildMember } from 'discord-api-types/v10';
import { BasicCacheFunctions, CacheFunctions } from '@lib/typings';
import { Client, Member } from 'lib/index';

export default class Storage<V> implements CacheFunctions<V> {
    constructor(
        private client: Client, 
        private cacheName: string, 
        private data: any
    ) {}

    async set(key: string, value: string): Promise<void> {
        await this.client.cache.set(this.cacheName, key, value);
    }

    get(...keys: string[]): array<V | null> {
        return this.client.cache.get(this.cacheName, ...keys).map(data => {
            if(typeof data === 'object') return new this.data(data as object as APIGuildMember) ?? null;
        });
    }

    async clear(): Promise<void> {
        await this.client.cache.clear(this.cacheName);
    }

    async delete(...keys: string[]): Promise<void> {
        await this.client.cache.delete(this.cacheName, ...keys);
    }
}