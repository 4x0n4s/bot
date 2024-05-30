import { Redis } from 'ioredis';

let client = new Redis();
(async () => {
    await client.connect();
})();
export default client;