import { BasicCacheFunctions } from '@lib/typings';
import { Redis, RedisOptions } from 'ioredis';

export default class RedisCacheClient implements BasicCacheFunctions {
    private _redis: Redis;
    private redis!: Redis;

    constructor(redisOptions: RedisOptions) {
        this._redis = new Redis(redisOptions);        
        void this._redis.connect()
        .then(
            () => this.redis = this._redis,
            () => { } //Error
        );
    }

    async set(
        cacheName: string,
        key: string, 
        value: string | object
    ): Promise<void> {
        await this.redis.hset(key, cacheName, typeof value === 'object' ? JSON.stringify(value) : value);
    }

    get(cacheName: string, ...keys: string[]
    ): Promise<string | null>[] {
        return keys.map(async key => await this.redis.hget(cacheName, key)).filter(Boolean);
    }

    async clear(cacheName: string): Promise<void> {
        for (let key of await this.redis.hkeys(cacheName)) await this.redis.hdel(cacheName, key);
    }

    async delete(cacheName: string, ...keys: string[]): Promise<void> {
        for (let key of keys) await this.redis.hdel(key, cacheName);
    }
}