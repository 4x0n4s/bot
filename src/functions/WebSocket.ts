import WebSocket from 'ws';

export default class extends WebSocket {
    constructor() {
        super('wss://localhost:1337');
        super.on('open', () => {
            console.log('[WebSocket]: Gateway..')
        }).on('message', async (message: string) => {
            message = message.toString();
            console.log(message);
        }).on('close', (cde) => {
            
        });
    }
}