import { Redis } from 'ioredis';

let client = new Redis({
    host: 'localhost',
    port: 1000
});
(async () => {
    await client.connect();
})();
export default client;