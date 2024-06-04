import { } from 'discord-api-types/v10';
import { Endpoints, Intents } from 'lib/Constants';
import { Client, ClientUser, Message } from 'lib/index';
import WebSocket, { OPEN } from 'ws';

export default class extends WebSocket {
    constructor(private client: Client) {
        super(Endpoints.GATEWAY);
    }

    connect(token: string) {
        this.on('open', () => {
            console.log('[WebSocket]: Logged on the Discord Gateway');
        });
          
        this.on('message', async message => {
            const payload = JSON.parse(message.toString('utf-8'))
            const { t, op, d, s } = payload;
            
            if (op === 10) {
                const { heartbeat_interval } = d;
                setInterval(() => {
                    if(this.readyState === OPEN) this.send(JSON.stringify({
                        op: 1,
                        d: null
                    }));
                }, heartbeat_interval);
                this.identify(token);
            }

            if(t === 'READY') {
                this.client.user = new ClientUser(d.user);
                this.client.emit('connected');
                await this.client.fetchGuilds();
            }

            if(t === 'MESSAGE_CREATE') {
                let m = new Message(this.client, d);
                this.client.emit('messageReceived', m);
                this.client.channels.get(m.channelID)?.messages.set(m.ID, m);
                this.client.guilds.get(m.guildID)?.channels.get(m.channelID)?.messages.set(m.ID, m);
            }
        });

        this.on('close', (code: number, reason: string) => {
            console.log(`WebSocket connection closed.\nCode: ${code}, reason: ${reason}`);
        });
    }

    private identify(token: string) {
        if(this.readyState === OPEN) this.send(JSON.stringify({
            op: 2,
            d: {
                token,
                properties: {
                    $os: 'linux',
                    $browser: 'Bot',
                    $device: 'Bot'
                },
                compress: false,
                large_threshold: 250,
                shard: [0, 1],
                presence: {
                    activities: [{
                        name: 'App!',
                        type: 0
                    }],
                    status: 'online',
                    since: 0,
                    afk: false
                },
                intents: this.client.settings?.intents || Intents.All
            }
        }));
    }
}