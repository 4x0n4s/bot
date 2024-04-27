import Bot from '@lib/Bot';
import WebSocket from 'ws';

export default class extends WebSocket {
    constructor() {
        let { Main, databaseClient } = global;
        super('ws://localhost:1337');
        super.on('open', () => {
            console.log('[WebSocket]: Gateway..')
        });
        super.on('message', async (message: string) => {
            message = message.toString();
            console.log(message);
        })
    }
}